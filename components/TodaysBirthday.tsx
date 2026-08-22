"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function TodaysBirthday() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadBirthdayMembers();
  }, []);

  async function loadBirthdayMembers() {
    const today = new Date();

    const month = today.getMonth() + 1;
    const day = today.getDate();

    const { data, error } = await supabase
      .from("members")
      .select("id, member_name, village, profession, photo_url, dob")
      .eq("status", "Approved");

    if (error) {
      console.error("Birthday loading error:", error);
      return;
    }

    if (data) {
      const birthdayMembers = data.filter((member) => {
        if (!member.dob) return false;

        const dob = new Date(member.dob);

        return (
          dob.getMonth() + 1 === month &&
          dob.getDate() === day
        );
      });

      setMembers(birthdayMembers);
    }
  }

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
            🎂 आज का जन्मदिन
          </h2>

          <p className="text-white mt-2">
            हमारे परिवार के सदस्य को जन्मदिन की हार्दिक शुभकामनाएँ
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 flex items-center gap-5 shadow-xl"
            >

              <img
                src={member.photo_url || "/logo.png"}
                alt={member.member_name}
                className="w-20 h-20 rounded-full object-cover border-4 border-yellow-300"
              />

              <div>
                <h3 className="text-xl font-bold text-yellow-300">
                  {member.member_name}
                </h3>

                <p className="text-white">
                  🏠 {member.village}
                </p>

                <p className="text-white/80">
                  💼 {member.profession || "व्यवसाय नहीं दिया"}
                </p>

                <p className="text-green-300 font-bold mt-1">
                  🎉 जन्मदिन की हार्दिक शुभकामनाएँ!
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}