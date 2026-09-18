"use client";
import AdminBackButton from "../../../components/AdminBackButton";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function SliderPage() {
 
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const { data } = await supabase
      .from("slider_images")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setImages(data);
    }
  }

  async function uploadImage() {
    if (!file) {
      setMessage("❌ पहले फोटो चुनें");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("slider")
      .upload(fileName, file);

    if (uploadError) {
      setMessage(`❌ Upload Failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage
      .from("slider")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const { error: dbError } = await supabase
      .from("slider_images")
      .insert([
        {
          image_url: imageUrl,
        },
      ]);

    if (dbError) {
      setMessage(`❌ Database Error: ${dbError.message}`);
      return;
    }

    setMessage("✅ Slider Image Uploaded Successfully");
    setFile(null);

    loadImages();
  }

  async function deleteImage(id: number) {
    await supabase
      .from("slider_images")
      .delete()
      .eq("id", id);

    loadImages();
  }

  return (
    
    <main className="min-h-screen p-8">
       <AdminBackButton />

      <h1 className="text-4xl font-bold text-yellow-300 mb-8">
        🖼️ Slider Management
      </h1>

      <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl mb-10">

        <label className="bg-blue-600 text-white px-6 py-3 rounded-xl cursor-pointer inline-block">
          📁 Photo Select करें

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
          <p className="mt-4 text-white">
            Selected File: {file.name}
          </p>
        )}

        <button
          onClick={uploadImage}
          className="mt-4 block bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Upload Slider Image
        </button>

        {message && (
          <p className="mt-4 text-white font-bold">
            {message}
          </p>
        )}

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {images.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={item.image_url}
              alt="Slider"
              className="w-full h-56 object-cover"
            />

            <div className="p-4 text-center">

              <button
                onClick={() => deleteImage(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}