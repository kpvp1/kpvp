"use client";

import { useState } from "react";

export default function MembershipPopup() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">

      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 md:p-8 shadow-2xl text-center">

        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 top-3 text-2xl font-bold text-gray-500 hover:text-red-600"
        >
          ×
        </button>

        {/* Logo */}
        <img
          src="/logo.png"
          alt="KPVP Logo"
          className="mx-auto mb-5 h-24 w-24 rounded-full object-contain"
        />

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
          कांटा परगना विकास परिषद
        </h2>

        <p className="mt-3 text-gray-600">
          52 गाँव • एक परिवार
        </p>

        <p className="mt-4 text-lg font-semibold text-gray-800">
          सदस्यता के लिए अपना पंजीकरण करें
        </p>

        {/* Registration Button */}
        <a
          href="/membership"
          className="mt-6 block w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700"
        >
          📝 सदस्यता पंजीकरण करें
        </a>

        <button
          onClick={() => setShow(false)}
          className="mt-4 text-sm font-semibold text-gray-500"
        >
          अभी नहीं
        </button>

      </div>

    </div>
  );
}