"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RecentMembers() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
  const { data } = await supabase
    .from("members")
    .select("*")
    .eq("status", "Approved")
    .order("id", { ascending: false })
    .limit(10); // केवल Latest 10

  if (data) {
    setMembers(data);
  }
}

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
        🎉 🌟 नवीन सदस्य
      </h2>
    <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
  🎉 मीणा जाति सेवा संस्थान परिवार में आपका स्वागत है
</h2>
     <div
  className={
    members.length > 5
      ? "h-[450px] overflow-hidden"
      : ""
  }
>

        <div
  className={
    members.length > 5
      ? "animate-members space-y-4"
      : "space-y-4"
  }
>
  {(members.length > 5
    ? [...members, ...members]
    : members
  ).map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded-2xl p-3 bg-gray-50"
            >

              <img
                src={member.photo_url || "/logo.png"}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg">
                  {member.member_name}
                </h3>

                <p className="text-gray-600">
                  📍 {member.village}
                </p>

                <p className="text-blue-700 text-sm">
                  💼 {member.profession}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}