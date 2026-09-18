"use client";
import AdminBackButton from "../../../components/AdminBackButton";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [rejectingMember, setRejectingMember] = useState<any | null>(null);
const [rejectionComment, setRejectionComment] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  async function updateStatus(id: number, status: string) {
  const { error } = await supabase
    .from("members")
    .update({
      status,
      rejection_comment: status === "Approved" ? null : undefined,
    })
    .eq("id", id);

  if (error) {
    alert("Status update failed: " + error.message);
    return;
  }

  loadMembers();
}

async function rejectMember() {
  if (!rejectingMember) return;

  if (!rejectionComment.trim()) {
    alert("कृपया rejection का कारण लिखें।");
    return;
  }

  const { error } = await supabase
    .from("members")
    .update({
      status: "Rejected",
      rejection_comment: rejectionComment.trim(),
    })
    .eq("id", rejectingMember.id);

  if (error) {
    alert("Reject failed: " + error.message);
    return;
  }

  setRejectingMember(null);
  setRejectionComment("");

  loadMembers();
}



  async function deleteMember(id: number, memberName: string) {
    const confirmed = window.confirm(
      `क्या आप "${memberName}" की membership application delete करना चाहते हैं?\n\nयह record permanently delete हो जाएगा।`
    );

    if (!confirmed) return;

    setDeletingId(id);

    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id);

    setDeletingId(null);

    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }

    alert("Membership application successfully deleted.");

    loadMembers();
  }

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error loading members:", error);
      return;
    }

    if (data) {
      setMembers(data);
    }
  }

  return (
    <main className="min-h-screen p-6">
<AdminBackButton />
      <h1 className="text-3xl font-bold text-yellow-300 mb-6">
        Registered Members
      </h1>

      <div className="overflow-auto">

        <table className="w-full border border-white/20">

          <thead className="bg-yellow-400 text-black">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">नाम</th>
              <th className="p-3">पिता / पति का नाम</th>
              <th className="p-3">गाँव</th>
              <th className="p-3">मोबाइल</th>
              <th className="p-3">फोटो</th>
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

                <td className="p-3">
                  {m.id}
                </td>

                <td className="p-3">
                  {m.member_name}
                </td>

                <td className="p-3">
                  {m.relation_name}
                </td>

                <td className="p-3">
                  {m.village}
                </td>

                <td className="p-3">{m.mobile}</td>

<td className="p-3">
  
  <img
  src={
    m.photo_url
      ? m.photo_url
      : "/default-user.png"
  }
  alt="Member"
  className="w-14 h-14 rounded-full object-cover mx-auto"
/>

</td>

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

                  {/* Approve */}
                  <button
                    onClick={() =>
                      updateStatus(m.id, "Approved")
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  {/* Reject */}
                  <button
  onClick={() => {
    setRejectingMember(m);
    setRejectionComment(m.rejection_comment || "");
  }}
  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
>
  Reject
  </button>

                  

                  {/* Delete */}
                  <button
                    onClick={() =>
                      deleteMember(m.id, m.member_name)
                    }
                    disabled={deletingId === m.id}
                    className="bg-red-800 hover:bg-red-900 disabled:bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    {deletingId === m.id
                      ? "Deleting..."
                      : "🗑️ Delete"}
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

    </div>

    {/* Reject Comment Popup */}
    {rejectingMember && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6">

          <h2 className="text-2xl font-bold text-red-700 text-center">
            सदस्यता आवेदन अस्वीकृत करें
          </h2>

          <p className="text-gray-600 text-center mt-2">
            {rejectingMember.member_name}
          </p>

          <label className="block mt-6 text-gray-700 font-bold">
            अस्वीकृति का कारण / Comment
          </label>

          <textarea
            value={rejectionComment}
            onChange={(e) => setRejectionComment(e.target.value)}
            placeholder="उदाहरण: आवश्यक दस्तावेज पूर्ण नहीं हैं..."
            rows={5}
            className="w-full mt-2 p-4 border-2 border-gray-200 rounded-xl
            text-gray-900 outline-none focus:border-red-500
            resize-none"
          />

          <div className="flex gap-3 mt-5">

            <button
              onClick={() => {
                setRejectingMember(null);
                setRejectionComment("");
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300
              text-gray-800 font-bold py-3 rounded-xl"
            >
              रद्द करें
            </button>

            <button
              onClick={rejectMember}
              className="flex-1 bg-red-600 hover:bg-red-700
              text-white font-bold py-3 rounded-xl"
            >
              ❌ Reject करें
            </button>

          </div>

        </div>

      </div>
    )}

  </main>
  );
}