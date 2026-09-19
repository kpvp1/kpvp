"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { supabase } from "../../lib/supabase";

export default function CommitteePage() {
  const [committee, setCommittee] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommittee();
  }, []);

  async function loadCommittee() {
    const { data, error } = await supabase
      .from("committee")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setCommittee(data);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-300">
            👥 कार्यकारिणी
          </h1>

          <p className="text-white/80 mt-3">
            मीणा जाति सेवा संस्थान की कार्यकारिणी
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-white text-lg">
            जानकारी लोड हो रही है...
          </p>
        )}

        {/* No Data */}
        {!loading && committee.length === 0 && (
          <p className="text-center text-white text-lg">
            अभी कोई कार्यकारिणी सदस्य उपलब्ध नहीं है
          </p>
        )}

        {/* Committee */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {committee.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-md border border-yellow-300/30 rounded-3xl p-5 text-center shadow-xl hover:scale-105 transition-all duration-300"
            >

              <div className="text-4xl mb-3">
                👤
              </div>

              <h3 className="text-yellow-300 font-bold text-lg">
                {item.post}
              </h3>

              <p className="text-white text-base mt-2">
                {item.name}
              </p>

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