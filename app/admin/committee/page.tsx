"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function CommitteePage() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadCommittee();
  }, []);

  async function loadCommittee() {
    const { data } = await supabase
      .from("committee")
      .select("*")
      .order("id");

    if (data) {
      setMembers(data);
    }
  }

  async function updateMember(id: number, name: string) {
    await supabase
      .from("committee")
      .update({ name })
      .eq("id", id);

    loadCommittee();
  }

  return (
    <main className="min-h-screen p-8">

      <h1 className="text-4xl font-bold text-yellow-300 mb-8">
        👨‍💼 Committee Management
      </h1>

      <div className="space-y-6">

        {members.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 backdrop-blur-md p-6 rounded-3xl"
          >
            <h2 className="text-xl font-bold text-yellow-300 mb-3">
              {item.post}
            </h2>

            <input
              type="text"
              defaultValue={item.name}
              className="w-full p-3 rounded-xl text-black"
              onBlur={(e) =>
                updateMember(item.id, e.target.value)
              }
            />
          </div>
        ))}

      </div>

    </main>
  );
}