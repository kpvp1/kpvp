"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function PratibhaCertificatePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadStudent();
  }, [id]);

  async function loadStudent() {
    const { data } = await supabase
      .from("pratibha")
      .select("*")
      .eq("id", id)
      .single();

    if (data) setStudent(data);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl text-red-600 font-bold">
        Record Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 flex justify-center items-center p-4">

      <div
        className="bg-white relative overflow-hidden border-[12px] border-yellow-500 shadow-2xl"
        style={{
          width: "1123px",
          height: "794px",
        }}
      >

        {/* Watermark */}
        <img
          src="/logo.png"
          alt="Watermark"
          className="absolute opacity-10 w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Border */}
        <div className="absolute inset-4 border-4 border-yellow-400 rounded-2xl"></div>

        {/* Print Button */}
        <div className="absolute top-5 right-5 z-50 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            🖨️ Print Certificate
          </button>
        </div>

        {/* Student Photo */}
<div className="absolute top-24 left-12 z-20">
  <img
    src={student.photo_url}
    alt="Student"
    className="w-44 h-52 object-cover border-4 border-yellow-500 rounded-xl shadow-lg"
  />
</div>

        

        {/* Header */}
        <div className="relative z-10 text-center pt-12">

          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto w-24 h-24"
          />

          <h1 className="text-5xl font-bold text-red-700 mt-2">
            कांटा परगना विकास परिषद
          </h1>

          <p className="text-2xl text-blue-700 font-semibold mt-2">
            मारवाड़ मीणा समाज कांटा परगना
          </p>

          <div className="inline-block mt-4 px-10 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg">
            <h2 className="text-3xl font-bold text-white">
              🏆 प्रतिभा सम्मान प्रमाण पत्र
            </h2>
          </div>

        </div>

        {/* Main Text */}
        <div className="relative z-10 px-24 mt-[-10px]">

          <p
            className="text-center text-gray-800"
            style={{
  fontFamily: "'Tiro Devanagari Hindi', serif",
  fontSize: "30px",
  lineHeight: "52px",
}}
          >

            यह प्रमाणित किया जाता है कि

            <br />

            <span className="text-blue-700 font-bold text-[52px]">
              {student.student_name}
            </span>

            <br />

            पिता / पति

            <span className="text-purple-700 font-bold text-[40px]">
              {" "}
              {student.father_name}
            </span>

            <br />

            ग्राम

            <span className="text-green-700 font-bold text-[40px]">
              {" "}
              {student.village}
            </span>

            <br />

            ने

            <span className="text-red-700 font-bold">
              {" "}
              {student.category}
            </span>

            श्रेणी में

            <span className="text-blue-700 font-bold">
              {" "}
              {student.percentage}%
            </span>

            अंक / उत्कृष्ट उपलब्धि प्राप्त कर

            <br />

            समाज एवं कांटा परगना का गौरव बढ़ाया है।

          </p>

        </div>

        

        {/* Footer */}
        

        {/* Signatures */}
        <div className="absolute bottom-12 left-24 right-24 flex justify-between">

          <div className="text-center">
            <div className="border-t-2 border-black w-56"></div>
            <p className="mt-2 text-2xl font-bold text-blue-700">
              सचिव
            </p>
          </div>

          <div className="text-center">
            <div className="border-t-2 border-black w-56"></div>
            <p className="mt-2 text-2xl font-bold text-red-700">
              अध्यक्ष
            </p>
          </div>

        </div>

      </div>
<div className="absolute bottom-28 left-0 right-0 text-center">

          <p className="text-xl font-bold text-gray-700">
            प्रतिभा सम्मान समारोह 2026
          </p>

          <p className="text-gray-500 mt-1">
            Approval Date :
            {" "}
            {student.approval_date
              ? new Date(student.approval_date).toLocaleDateString("hi-IN")
              : ""}
          </p>

        </div>
    </main>
  );
}