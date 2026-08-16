"use client";

import QRCode from "react-qr-code";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

function IdCardContent() {
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
      console.log("MEMBER DATA:", data);

    if (data) setMember(data);

    setLoading(false);
  }

 

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

if (!member) {
  return (
    <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
      Member Not Found
    </div>
  );
}
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6">

      

      <div
        id="id-card"
        className="relative bg-white border-[8px] border-yellow-500 rounded-[25px] shadow-2xl overflow-hidden"
        style={{
          width: "400px",
          height: "650px",
        }}
      >
        {/* Watermark */}
        <img
          src="/logo.png"
          alt="watermark"
          className="absolute opacity-10 w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 h-28 relative">

  <div className="flex items-center justify-center gap-3 pt-3">

    <img
      src="/logo.png"
      alt="Logo"
      className="w-20 h-20 rounded-full bg-white p-1"
    />

    <div className="text-center">
      <h1 className="text-white font-bold text-lg leading-tight">
        कांटा परगना विकास परिषद
      </h1>

      <p className="text-white text-[10px]">
        मारवाड़ मीणा समाज कांटा परगना
      </p>
    </div>

  </div>

  <div className="flex justify-center mt-2">
    <span className="bg-white text-red-600 text-xs font-bold px-4 py-1 rounded-full shadow">
      सदस्यता प्रमाण पत्र
    </span>
  </div>

</div>
        {/* Photo */}
        <div className="flex justify-center mt-6">
          <div className="w-30 h-40 border-2 border-blue-600 rounded-lg overflow-hidden shadow-lg">
            
            <img
  src={
    member.photo_url
      ? member.photo_url
      : "/default-user.png"
  }
  alt="Member"
  className="w-full h-full object-cover"
/>

          </div>
        </div>

        {/* Name */}
        <h2 className="text-center text-xl font-bold text-blue-700 mt-5">
          {member.member_name}
        </h2>

        <p className="text-center text-xs text-gray-600 mb-3">
          Reg No : {member.registration_no}
        </p>

        {/* Details */}
        <div className="px-7">
          <table className="w-full text-sm">
            <tbody>

              <tr>
                <td className="font-bold py-3 w-25">
                  {member.relation_type === "Father"
                    ? "पिता"
                    : "पति"}
                </td>
                <td>:</td>
                <td>{member.relation_name}</td>
              </tr>

              <tr>
                <td className="font-bold py-3">
                  ग्राम
                </td>
                <td>:</td>
                <td>{member.village}</td>
              </tr>

              <tr>
                <td className="font-bold py-3">
                  मोबाइल
                </td>
                <td>:</td>
                <td>{member.mobile}</td>
              </tr>

              <tr>
                <td className="font-bold py-3">
                  व्यवसाय
                </td>
                <td>:</td>
                <td>{member.profession || "-"}</td>
              </tr>

            </tbody>
          </table>
        </div>

        

        {/* QR */}
        <div className="absolute bottom-1 right-1 text-center">

  <div id="qr-area">
  <QRCode value={`https://kpvp.vercel.app/certificate?id=${member.id}`} size={65} />
</div>


  <p className="text-[8px] text-green-700 font-bold mt-1">
    ✓ Digitally Verified
  </p>

</div>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <div className="border-t border-black w-24 mx-auto"></div>

          <p className="text-xs font-bold mt-1">
            अध्यक्ष
          </p>
        </div>

      </div>

    </main>
  );
}

export default function IdCardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <IdCardContent />
    </Suspense>
  );
}