
"use client";
import AdminBackButton from "../../../components/AdminBackButton";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function GalleryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setImages(data);
    }
  }

  async function uploadImage() {
    if (!file) {
      setMessage("❌ कृपया पहले फोटो चुनें");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (uploadError) {
        setMessage(`❌ Upload Failed: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      const { error: dbError } = await supabase
        .from("gallery")
        .insert([
          {
            image_url: imageUrl,
          },
        ]);

      if (dbError) {
        setMessage(`❌ Database Save Failed: ${dbError.message}`);
      } else {
        setMessage("✅ Photo Uploaded Successfully");
        setFile(null);

        loadImages();
      }
    } catch (err) {
      console.log(err);
      setMessage("❌ कुछ गलत हो गया");
    }

    setLoading(false);
  }

  async function deleteImage(id: number) {
    const confirmDelete = confirm(
      "क्या आप यह फोटो Delete करना चाहते हैं?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    loadImages();
  }

  return (
    <main className="min-h-screen p-8">
<AdminBackButton />
      <h1 className="text-4xl font-bold text-yellow-300 mb-2">
        📸 Gallery Management
      </h1>

      <p className="text-white mb-8">
        Admin Gallery Upload Panel
      </p>

      {/* Upload Panel */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl mb-10 shadow-2xl">

        <label className="cursor-pointer">

          <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl text-center font-bold transition">
            📁 Photo Select करें
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />

        </label>

        {file && (
          <div className="mt-4 p-4 bg-black/20 rounded-xl">

            <p className="text-green-300 font-semibold">
              Selected File:
            </p>

            <p className="text-white break-all">
              {file.name}
            </p>

          </div>
        )}

        <button
          onClick={uploadImage}
          disabled={loading}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition"
        >
          {loading ? "Uploading..." : "🚀 Upload Photo"}
        </button>

        {message && (
          <div className="mt-6 p-4 bg-black/20 rounded-xl">

            <p className="text-white font-semibold">
              {message}
            </p>

          </div>
        )}

      </div>

      {/* Gallery Images */}
      <div>

        <h2 className="text-3xl font-bold text-white mb-6">
          Gallery Photos ({images.length})
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((item) => (

            <div
              key={item.id}
              className="bg-white/10 rounded-3xl overflow-hidden shadow-xl"
            >

              <img
                src={item.image_url}
                alt="Gallery"
                className="w-full h-56 object-cover"
              />

              <div className="p-4 text-center">

                <button
                  onClick={() => deleteImage(item.id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}