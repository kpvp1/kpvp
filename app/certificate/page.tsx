"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

function CertificateContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMember();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function loadMember() {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setMember(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl text-red-600 font-bold">
        Member Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 flex justify-center items-center p-6">
      <div
        className="bg-white border-[12px] border-yellow-500 shadow-2xl relative overflow-hidden"
        style={{
          width: "1123px",
          height: "794px",
        }}
      >
        {/* Watermark */}
        <img
          src="/logo.png"
          alt="Watermark"
          className="absolute opacity-10 w-[450px] h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Decorative Border */}
        <div className="absolute inset-4 border-4 border-yellow-400 rounded-2xl"></div>

        {/* Header */}
        <div className="relative z-10 text-center pt-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto w-28 h-28"
          />

          <h1
            className="text-5xl font-bold text-red-700 mt-3"
            style={{ fontFamily: "Georgia, serif" }}
          >
            कांटा परगना विकास परिषद
          </h1>

          <p className="text-2xl text-blue-800 font-semibold mt-2">
            मारवाड़ मीणा समाज कांटा परगना
          </p>

          <div className="inline-block mt-4 px-10 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg">
            <h2 className="text-3xl font-bold text-white">
              सदस्यता प्रमाण पत्र
            </h2>
          </div>
        </div>

        {/* Main Certificate Text */}
        <div className="relative z-10 px-24 mt-10">
          <p
            className="text-center text-gray-800 leading-[60px]"
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              fontSize: "28px",
            }}
          >
            यह प्रमाणित किया जाता है कि

            <span className="text-blue-700 font-bold text-[40px]">
              {" "}
              {member.member_name}
            </span>

            <br />

            पिता / पति

            <span className="text-purple-700 font-bold text-[40px]">
              {" "}
              {member.father_name}
            </span>

            <br />

            ग्राम

            <span className="text-green-700 font-bold text-[40px]">
              {" "}
              {member.village}
            </span>

            <br />

            मारवाड़ मीणा समाज कांटा परगना के प्रतिष्ठित सदस्य हैं तथा
            कांटा परगना विकास परिषद में विधिवत पंजीकृत सदस्य के रूप में
            सम्मानपूर्वक मान्यता प्राप्त है।
          </p>
        </div>

        {/* Certificate Number */}
        <div className="absolute bottom-32 left-0 right-0 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Certificate No :
            <span className="text-blue-700">
              {" "}
              KPVP-CERT-{member.id}
            </span>
          </p>

          <p className="text-lg font-semibold text-gray-700 mt-1">
            Registration No :
            <span className="text-green-700">
              {" "}
              {member.registration_no}
            </span>
          </p>
        </div>

        {/* Signatures */}
        <div className="absolute bottom-10 left-20 right-20 flex justify-between">
          <div className="text-center">
            <div className="border-t-2 border-black w-56"></div>

            <p className="mt-2 text-2xl font-bold text-blue-800">
              सचिव
            </p>
          </div>

          <div className="text-center">
            <div className="border-t-2 border-black w-56"></div>

            <p className="mt-2 text-2xl font-bold text-red-800">
              अध्यक्ष
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CertificatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
          Loading Certificate...
        </div>
      }
    >
      <CertificateContent />
    </Suspense>
  );
}