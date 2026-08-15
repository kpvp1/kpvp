"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MembershipPage() {
  const [photo, setPhoto] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    member_name: "",
    father_name: "",
    husband_name: "",
    village: "",
    mobile: "",
    profession: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
  e.preventDefault();

  // Duplicate Check
  const { data: existing } = await supabase
    .from("members")
    .select("id")
    .eq("member_name", formData.member_name)
    .eq("village", formData.village)
    .or(
      `father_name.eq.${formData.father_name},husband_name.eq.${formData.husband_name},mobile.eq.${formData.mobile}`
    );

  if (existing && existing.length > 0) {
    setMessage(
      "❌ इस नाम, पिता के नाम और मोबाइल नंबर से सदस्यता आवेदन पहले से मौजूद है।"
    );
    return;
  }

  let photo_url = "";

  if (photo) {

  const fileName =
    Date.now() + "_" + photo.name;

  const { error: uploadError } =
    await supabase.storage
      .from("member-photos")
      .upload(fileName, photo);

  if (uploadError) {
    setMessage(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("member-photos")
      .getPublicUrl(fileName);

  photo_url = data.publicUrl;
}

  const registration_no =
    "KPVP" + Date.now();

  const { error } = await supabase
    .from("members")
    .insert([
      {
  ...formData,
  photo_url,
  registration_no,
  status: "Pending",
}
    ]);

  if (error) {
    setMessage("❌ Error: " + error.message);
    return;
  }

  setMessage(
    `✅ आवेदन सफलतापूर्वक जमा हो गया | Registration No: ${registration_no}`
  );

  setFormData({
    member_name: "",
    father_name: "",
    husband_name: "",
    village: "",
    mobile: "",
    profession: "",
  });
}

  return (
    <main className="min-h-screen p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          सदस्यता आवेदन फॉर्म
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="सदस्य का नाम"
            value={formData.member_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                member_name: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="पिता का नाम"
            value={formData.father_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                father_name: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="ग्राम"
            value={formData.village}
            onChange={(e) =>
              setFormData({
                ...formData,
                village: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="मोबाइल नंबर"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({
                ...formData,
                mobile: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <input
            type="text"
            placeholder="व्यवसाय"
            value={formData.profession}
            onChange={(e) =>
              setFormData({
                ...formData,
                profession: e.target.value,
              })
            }
            className="w-full border p-3 rounded-xl"
          />
        <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setPhoto(e.target.files?.[0] || null)
  }
  className="w-full border p-3 rounded-xl"
/>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold"
          >
            सदस्यता आवेदन करें
          </button>

        </form>

        {message && (
          <div className="mt-6 text-center font-bold">
            {message}
          </div>
        )}

      </div>

    </main>
  );
}