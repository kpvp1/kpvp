"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setGallery(data);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-300">
            📸 फोटो गैलरी
          </h1>

          <p className="text-white/80 mt-3">
           मीणा जाति सेवा संस्थान की यादगार झलकियाँ
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-white text-lg">
            फोटो लोड हो रही हैं...
          </p>
        )}

        {/* No Photos */}
        {!loading && gallery.length === 0 && (
          <p className="text-center text-white text-lg">
            अभी कोई फोटो उपलब्ध नहीं है
          </p>
        )}

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-xl"
            >

              {/* Photo */}
              <img
                src={item.image_url}
                alt="KPVP Gallery"
                className="w-full h-56 object-contain bg-white rounded-xl"
              />

              {/* Download */}
              <a
                href={item.image_url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full text-center bg-yellow-400 text-black font-bold py-2 rounded-xl hover:scale-105 transition"
              >
                ⬇️ फोटो डाउनलोड करें
              </a>

            </div>
          ))}

        </div>

        {/* Back Home */}
        <div className="text-center mt-10">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            🏠 होम पेज पर जाएँ
          </a>
        </div>

      </section>
    </main>
  );
}