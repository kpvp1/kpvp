"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    loadMembers();
  }, []);

  async function updateStatus(id: number, status: string) {
    await supabase
      .from("members")
      .update({ status })
      .eq("id", id);

    loadMembers();
  }

  async function loadMembers() {
    const { data } = await supabase
      .from("members")
      .select("*")
      .order("id", { ascending: false });

    if (data) setMembers(data);
  }

  return (
    <main className="min-h-screen p-6">

      <h1 className="text-3xl font-bold text-yellow-300 mb-6">
        Registered Members
      </h1>

      <div className="overflow-auto">

        <table className="w-full border border-white/20">

          <thead className="bg-yellow-400 text-black">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">नाम</th>
              <th className="p-3">पिता का नाम</th>
              <th className="p-3">गाँव</th>
              <th className="p-3">मोबाइल</th>
              <th className="p-3">व्यवसाय</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>

            {members.map((m) => (
              <tr
                key={m.id}
                className="border-b border-white/10 text-center"
              >
                <td className="p-3">{m.id}</td>
                <td className="p-3">{m.member_name}</td>
                <td className="p-3">{m.father_name}</td>
                <td className="p-3">{m.village}</td>
                <td className="p-3">{m.mobile}</td>
                <td className="p-3">{m.profession}</td>

                <td className="p-3">

                  {m.status === "Approved" ? (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full">
                      Approved
                    </span>
                  ) : m.status === "Rejected" ? (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full">
                      Rejected
                    </span>
                  ) : (
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full">
                      Pending
                    </span>
                  )}

                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() =>
                      updateStatus(m.id, "Approved")
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(m.id, "Rejected")
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <a
                    href={`/certificate?id=${m.id}`}
                    target="_blank"
                    className="bg-blue-600 text-white px-3 py-1 rounded inline-block"
                  >
                    Certificate
                  </a>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}