"use client";

import QRCode from "react-qr-code";
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
    <main className="min-h-screen bg-slate-200 flex justify-center items-center p-6">

      <div
        className="relative bg-white border-[10px] border-yellow-500 rounded-[30px] shadow-2xl overflow-hidden"
        style={{
          width: "1150px",
          height: "750px",
        }}
      >

        {/* Watermark */}
        <img
          src="/logo.png"
          alt="Watermark"
          className="absolute opacity-10 w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Print + QR */}
        <div className="absolute top-6 right-6 z-50 print:hidden">

          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            🖨️ Print ID Card
          </button>

          <div className="mt-4 bg-white p-3 rounded-xl shadow">

            <QRCode
              value={`https://kpvp.vercel.app/certificate?id=${member.id}`}
              size={120}
            />

            

          </div>

        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-600 h-56 relative">

          <div className="absolute left-8 top-5 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
  <img
    src="/logo.png"
    alt="Logo"
    className="w-full h-full object-cover"
  />
</div>

          <div className="text-center pt-8">

            <h1 className="text-6xl font-bold text-white">
              कांटा परगना विकास परिषद
            </h1>

            <p className="text-2xl text-white mt-3">
              मारवाड़ मीणा समाज कांटा परगना
            </p>

            <h2 className="text-3xl font-bold text-white mt-4">
              MEMBER ID CARD
            </h2>

          </div>

        </div>

        {/* Content */}
        <div className="flex px-10 py-8">

          {/* Left */}
          <div className="w-[35%] text-center">
<div className="absolute top-85 left-22">
  <div className="w-[250px] h-[300px] border-4 border-blue-600 rounded-lg overflow-hidden bg-white shadow-lg flex items-center justify-center">

    <img
      src={
        member.photo_url
          ? member.photo_url
          : "/default-user.png"
      }
      alt="Member"
      className="w-full h-full object-cover object-top"
    />

  </div>
</div>
    
    

            <h2 className="mt-5 text-5xl font-extrabold text-blue-700 tracking-wide">
            {member.member_name}
            </h2>

       

          </div>

          {/* Right */}
          <div className="w-[65%] pl-10">

            <table className="w-full text-3xl">

              <tbody>

                <tr>
                  <td className="font-bold py-4 w-72">
                    पिता / पति
                  </td>
                  <td>
                    :
                  </td>
                  <td>
                    {member.husband_name ||
                      member.father_name}
                  </td>
                </tr>

                <tr>
                  <td className="font-bold py-4">
                    ग्राम
                  </td>
                  <td>
                    :
                  </td>
                  <td>
                    {member.village}
                  </td>
                </tr>

                <tr>
                  <td className="font-bold py-4">
                    मोबाइल
                  </td>
                  <td>
                    :
                  </td>
                  <td>
                    {member.mobile}
                  </td>
                </tr>

                <tr>
                  <td className="font-bold py-4">
                    व्यवसाय
                  </td>
                  <td>
                    :
                  </td>
                  <td>
                    {member.profession || "-"}
                  </td>
                </tr>

                <tr>
  <td className="font-bold py-4">
    Verification
  </td>
  <td>:</td>
  <td>
    <span className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-bold shadow-lg">
      ✓ Digitally Verified
    </span>
  </td>
</tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Footer */}
        <div className="absolute bottom-8 right-12">

          <div className="border-t-2 border-black w-56"></div>

          <p className="mt-2 text-xl font-bold text-center">
            अध्यक्ष
          </p>

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