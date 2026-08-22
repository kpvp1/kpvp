"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RecentMembers() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("id, member_name, village, profession, photo_url")
      .eq("status", "Approved")
      .order("id", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Members loading error:", error);
      return;
    }

    if (data) {
      setMembers(data);
    }
  }

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            🎉 नवीन स्वीकृत सदस्य
          </h2>

          <p className="text-gray-600 mt-2">
            कांटा परगना विकास परिषद परिवार में आपका स्वागत है
          </p>
        </div>

        {/* Scrolling List */}
        <div className="relative h-[420px] overflow-hidden rounded-3xl bg-white shadow-xl border border-blue-100">

          <div className="animate-member-scroll">

            {members.map((member) => (
              <div
                key={member.id}
                className="mx-4 my-3 flex items-center gap-4 p-4 rounded-2xl border border-blue-100 bg-white shadow-sm"
              >

                {/* Photo */}
                <img
                  src={member.photo_url || "/logo.png"}
                  alt={member.member_name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-blue-100 shrink-0"
                />

                {/* Details */}
                <div className="min-w-0">

                  <h3 className="text-lg md:text-xl font-bold text-blue-900 truncate">
                    {member.member_name}
                  </h3>

                  <p className="text-gray-700">
                    🏠 {member.village}
                  </p>

                  <p className="text-sm text-blue-600">
                    💼 {member.profession || "व्यवसाय नहीं दिया"}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}