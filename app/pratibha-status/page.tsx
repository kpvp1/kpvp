"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PratibhaStatusPage() {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkStatus() {
    if (!search.trim()) {
      setMessage("❌ कृपया Registration Number या Mobile Number दर्ज करें");
      return;
    }

    setMessage("");
    setRecords([]);

    setLoading(true);

    const value = search.trim();

    const { data, error } = await supabase
  .from("pratibha")
  .select("*")
  .or(`registration_no.eq.${value},mobile.eq.${value}`);

    setLoading(false);

    if (error || !data || data.length === 0) {
  setMessage("❌ रिकॉर्ड नहीं मिला");
  return;
}



    setRecords(data);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-950 py-8 px-4">

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-[180px]">
          ✦
        </div>

        <div className="absolute bottom-10 right-10 text-[180px]">
          ✦
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto">

        {/* SEARCH SECTION */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 mb-8">

          <div className="text-center">

            <img
              src="/logo.png"
              alt="KPVP Logo"
              className="w-20 h-20 object-contain mx-auto mb-3"
            />

            <h1 className="text-2xl md:text-4xl font-extrabold text-blue-900">
              कांटा परगना विकास परिषद
            </h1>

            <p className="text-gray-600 font-semibold mt-1">
              Kanta Pargana Vikas Parishad • 52 Villages
            </p>

            <div className="w-24 h-1 bg-yellow-500 mx-auto my-4 rounded-full" />

            <h2 className="text-xl md:text-2xl font-bold text-blue-800">
              🏆 प्रतिभा सम्मान स्थिति जांच
            </h2>

            <p className="text-gray-500 mt-2">
              Registration Number या Mobile Number दर्ज करें
            </p>

          </div>

          {/* Search */}
          <div className="mt-6 flex flex-col md:flex-row gap-3">

            <input
              type="text"
              placeholder="Registration No / Mobile Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  checkStatus();
                }
              }}
              className="flex-1 p-4 border-2 border-blue-200 rounded-xl
              text-gray-900 outline-none
              focus:border-blue-600
              focus:ring-2 focus:ring-blue-200"
            />

            <button
              onClick={checkStatus}
              disabled={loading}
              className="md:w-48 bg-blue-700 hover:bg-blue-800
              text-white font-bold px-6 py-4 rounded-xl
              transition shadow-lg disabled:opacity-60"
            >
              {loading ? "Searching..." : "🔍 स्थिति जांचें"}
            </button>

          </div>

          {message && (
            <div className="mt-5 bg-red-50 border border-red-200
              text-red-600 text-center font-semibold p-3 rounded-xl">
              {message}
            </div>
          )}

        </div>


        {/* RESULT CARD */}
        {records.map((record) => (
  <div
    key={record.id}
    id={`pratibha-status-card-${record.id}`}
    className="bg-white rounded-[30px] shadow-2xl overflow-hidden"
  >

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800
              text-white text-center px-6 py-8 relative">

              <div className="absolute top-3 left-4 text-yellow-300 text-3xl">
                ✦
              </div>

              <div className="absolute top-3 right-4 text-yellow-300 text-3xl">
                ✦
              </div>

              <img
                src="/logo.png"
                alt="KPVP"
                className="w-20 h-20 object-contain mx-auto mb-3"
              />

              <h1 className="text-2xl md:text-4xl font-extrabold">
                कांटा परगना विकास परिषद
              </h1>

              <p className="text-blue-100 mt-1">
                Kanta Pargana Vikas Parishad • 52 Villages
              </p>

              <div className="mt-5 inline-block border-2 border-yellow-400
                rounded-full px-7 py-2">

                <span className="text-yellow-300 font-bold tracking-wider">
                  🏆 PRATIBHA SAMMAN
                </span>

              </div>

            </div>


            {/* REGISTRATION NUMBER */}
            <div className="px-6 md:px-10 pt-7">

              <div className="border-2 border-blue-100 rounded-2xl
                bg-blue-50 p-4 text-center">

                <p className="text-gray-500 text-sm font-semibold">
                  REGISTRATION NUMBER
                </p>

                <p className="text-xl md:text-2xl font-extrabold
                  text-blue-800 tracking-wider mt-1">
                  {record.registration_no}
                </p>

              </div>

            </div>


            {/* STUDENT DETAILS */}
            <div className="p-6 md:p-10">

              <h3 className="text-xl font-bold text-blue-900 mb-5
                flex items-center gap-2">
                🎓 प्रतिभागी विवरण
              </h3>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Detail
                  label="Student Name"
                  hindi="विद्यार्थी का नाम"
                  value={record.student_name}
                />

                <Detail
                  label="Father Name"
                  hindi="पिता का नाम"
                  value={record.father_name}
                />

                <Detail
                  label="Village"
                  hindi="ग्राम"
                  value={record.village}
                />

                <Detail
                  label="Mobile"
                  hindi="मोबाइल"
                  value={record.mobile}
                />

                <Detail
                  label="Category"
                  hindi="श्रेणी"
                  value={record.category}
                />

                <Detail
                  label="Percentage"
                  hindi="प्रतिशत"
                  value={
                    record.percentage !== null &&
                    record.percentage !== undefined
                      ? `${record.percentage}%`
                      : "-"
                  }
                />

              </div>


              {/* STATUS */}
              <div className="mt-7">

                <div className="text-center border-t-2 border-dashed
                  border-gray-200 pt-6">

                  <p className="text-gray-500 font-semibold mb-3">
                    APPLICATION STATUS
                  </p>

                  <StatusBadge status={record.status} />

                </div>

              </div>


              {/* APPROVED */}
              {record.status === "Approved" && (
                <div className="mt-7 bg-green-50 border-2
                  border-green-200 rounded-2xl p-5 text-center">

                  <div className="text-4xl mb-2">
                    🎉
                  </div>

                  <h3 className="text-xl font-bold text-green-700">
                    प्रतिभा सम्मान हेतु चयनित
                  </h3>

                  <p className="text-green-600 mt-1">
                    आपका आवेदन सफलतापूर्वक Approved हो चुका है।
                  </p>

                  <a
                    href={`/pratibha-certificate?id=${record.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-5 bg-green-600
                    hover:bg-green-700 text-white font-bold
                    px-7 py-3 rounded-xl shadow-lg transition"
                  >
                    🎓 Certificate Download
                  </a>

                </div>
              )}


              {/* PENDING */}
              {record.status !== "Approved" &&
                record.status !== "Rejected" && (
                  <div className="mt-7 bg-yellow-50 border-2
                    border-yellow-200 rounded-2xl p-5 text-center">

                    <div className="text-3xl mb-2">
                      ⏳
                    </div>

                    <h3 className="text-xl font-bold text-yellow-700">
                      आवेदन प्रक्रिया में है
                    </h3>

                    <p className="text-yellow-700 mt-1">
                      आपका आवेदन अभी Verification/Approval के लिए
                      लंबित है।
                    </p>

                  </div>
                )}


              {/* REJECTED */}
              {record.status === "Rejected" && (
                <div className="mt-7 bg-red-50 border-2
                  border-red-200 rounded-2xl p-5 text-center">

                  <div className="text-3xl mb-2">
                    ❌
                  </div>

                  <h3 className="text-xl font-bold text-red-700">
                    आवेदन अस्वीकृत
                  </h3>

                  <p className="text-red-600 mt-1">
                    अधिक जानकारी के लिए KPVP समिति से संपर्क करें।
                  </p>

                </div>
              )}

            </div>


            {/* FOOTER */}
            <div className="bg-gray-50 border-t px-6 py-5 text-center">

              <p className="text-gray-500 text-sm">
                कांटा परगना विकास परिषद • 52 गाँव
              </p>

              <p className="text-gray-400 text-xs mt-1">
                प्रतिभा • शिक्षा • सम्मान • विकास
              </p>

            </div>

                    </div>

        ))}

      </div>

    </main>
  );
}



/* DETAIL COMPONENT */

function Detail({
  label,
  hindi,
  value,
}: {
  label: string;
  hindi: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-200
      rounded-xl p-4">

      <p className="text-xs text-gray-400 uppercase font-semibold">
        {label}
      </p>

      <p className="text-xs text-gray-500 mb-1">
        {hindi}
      </p>

      <p className="text-lg font-bold text-gray-800">
        {value || "-"}
      </p>

    </div>
  );
}


/* STATUS BADGE */

function StatusBadge({ status }: { status: string }) {

  if (status === "Approved") {
    return (
      <span className="inline-flex items-center gap-2
        bg-green-100 text-green-700 border-2
        border-green-300 px-8 py-3 rounded-full
        text-lg font-extrabold">

        🟢 APPROVED

      </span>
    );
  }


  if (status === "Rejected") {
    return (
      <span className="inline-flex items-center gap-2
        bg-red-100 text-red-700 border-2
        border-red-300 px-8 py-3 rounded-full
        text-lg font-extrabold">

        🔴 REJECTED

      </span>
    );
  }


  return (
    <span className="inline-flex items-center gap-2
      bg-yellow-100 text-yellow-700 border-2
      border-yellow-300 px-8 py-3 rounded-full
      text-lg font-extrabold">

      🟡 PENDING

    </span>
  );
}
