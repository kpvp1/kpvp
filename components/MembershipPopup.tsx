"use client";

import { useEffect, useState } from "react";

export default function MembershipPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("kpvp_popup");

    if (!seen) {
      setOpen(true);
      localStorage.setItem("kpvp_popup", "yes");
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">

        <img
          src="/logo.png"
          alt="KPVP"
          className="w-20 h-20 mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-blue-800">
          🎉 मीणा जाति सेवा संस्थान
        </h2>

        <p className="mt-4 text-gray-700">
          सदस्यता हेतु अभी पंजीकरण करें।
        </p>

        <a
          href="/membership"
          className="mt-5 inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          सदस्यता फॉर्म भरें
        </a>

        <button
          onClick={() => setOpen(false)}
          className="block mx-auto mt-4 text-red-600 font-bold"
        >
          ✖ बंद करें
        </button>

      </div>

    </div>
  );
}