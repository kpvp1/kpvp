"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MembershipPage() {

  const [loading, setLoading] = useState(false);

  const [photo, setPhoto] = useState<File | null>(null);
  const [relationType, setRelationType] = useState("Father");
  const [relationName, setRelationName] = useState("");

  const [formData, setFormData] = useState({
    member_name: "",
    village: "",
    mobile: "",
    profession: "",
    dob: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    // Mobile Validation

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setMessage("❌ कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें");
      setLoading(false);
      return;
    }

    // Duplicate Check

    const { data: existing } = await supabase
      .from("members")
      .select("id")
      .eq("member_name", formData.member_name)
      .eq("village", formData.village)
      .eq("mobile", formData.mobile);

    if (existing && existing.length > 0) {
      setMessage(
        "❌ यह सदस्य पहले से पंजीकृत है।"
      );
      setLoading(false);
      return;
    }

    let photo_url = "";

    // Photo Upload

    if (photo) {

      const fileName =
        Date.now() + "_" + photo.name;

      const { error: uploadError } =
        await supabase.storage
          .from("member-photos")
          .upload(fileName, photo);

      if (uploadError) {
        setMessage(uploadError.message);
        setLoading(false);
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
      member_name: formData.member_name,
      village: formData.village,
      mobile: formData.mobile,
      profession: formData.profession,
      dob: formData.dob,
      relation_type: relationType,
      relation_name: relationName,

      photo_url,
      registration_no,
      status: "Pending",
    },
  ]);

   if (error) {
  setMessage("❌ Error: " + error.message);
  setLoading(false);
  return;
}

// Telegram Notification
try {
  await fetch("/api/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `🔔 <b>नया सदस्यता आवेदन</b>

👤 <b>नाम:</b> ${formData.member_name}
👨‍👦 <b>${relationType === "Father" ? "पिता" : "पति"}:</b> ${relationName}
🏠 <b>ग्राम:</b> ${formData.village}
📱 <b>मोबाइल:</b> ${formData.mobile}
💼 <b>व्यवसाय:</b> ${formData.profession || "नहीं दिया"}
🆔 <b>Registration No:</b> ${registration_no}

⏳ <b>Status:</b> Pending`,
    }),
  });
} catch (telegramError) {
 
  console.error("Telegram notification error:", telegramError);
}

setMessage(
  `✅ आवेदन सफलतापूर्वक जमा हो गया | Registration No: ${registration_no}`
);
setLoading(false);

    setFormData({
  member_name: "",
  village: "",
  mobile: "",
  profession: "",
  dob: "",
});

setRelationType("Father");
setRelationName("");

    setPhoto(null);
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-blue-100 p-8 md:p-10">

        <div className="text-center mb-8">
  <img
    src="/logo.png"
    alt="KPVP Logo"
    className="h-24 mx-auto mb-4"
  />

  <h1 className="text-4xl font-bold text-blue-700">
    सदस्यता आवेदन फॉर्म
  </h1>

  <p className="text-gray-500 mt-2">
    मीणा जाति सेवा संस्थान (52 गाँव)
  </p>
</div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

         <div className="grid md:grid-cols-2 gap-5">

  <div>
    <label className="block mb-2 font-semibold text-gray-700">
      सदस्य का नाम *
    </label>
    <input
      type="text"
      value={formData.member_name}
      onChange={(e) =>
        setFormData({
          ...formData,
          member_name: e.target.value,
        })
      }
      className="w-full h-14 px-4 border-2 border-blue-200 rounded-xl bg-white text-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
      required
    />
  </div>
<div>
  <label className="block mb-2 font-semibold text-gray-700">
    जन्म तिथि *
  </label>

  <input
    type="date"
    value={formData.dob}
    onChange={(e) =>
      setFormData({
        ...formData,
        dob: e.target.value,
      })
    }
    className="w-full h-14 px-4 border-2 border-blue-200 rounded-xl bg-white text-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
    required
  />
</div>
  <div>
    <label className="block mb-2 font-semibold text-gray-700">
      ग्राम *
    </label>
    <input
      type="text"
      value={formData.village}
      onChange={(e) =>
        setFormData({
          ...formData,
          village: e.target.value,
        })
      }
      className="w-full h-14 px-4 border-2 border-blue-200 rounded-xl bg-white text-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
      required
    />
  </div>

</div>

<div className="grid md:grid-cols-2 gap-5">

  <div>
    <label className="block mb-2 font-semibold">
      सम्बन्ध का प्रकार *
    </label>

    <select
      value={relationType}
      onChange={(e) => setRelationType(e.target.value)}
      className="w-full h-14 px-4 border-2 border-blue-200 rounded-xl bg-white"
    >
      <option value="Father">पिता</option>
      <option value="Husband">पति</option>
    </select>
  </div>

  <div>
    <label className="block mb-2 font-semibold">
      {relationType === "Father"
        ? "पिता का नाम *"
        : "पति का नाम *"}
    </label>

    <input
      type="text"
      value={relationName}
      onChange={(e) => setRelationName(e.target.value)}
      className="w-full h-14 px-4 border-2 border-blue-200 rounded-xl bg-white"
      placeholder={
        relationType === "Father"
          ? "पिता का नाम दर्ज करें"
          : "पति का नाम दर्ज करें"
      }
      required
    />
  </div>

</div>

<div className="grid md:grid-cols-2 gap-5">

  <div>
    <label className="block mb-2 font-semibold text-gray-700">
      मोबाइल नंबर *
    </label>

    <input
      type="tel"
      value={formData.mobile}
      onChange={(e) =>
        setFormData({
          ...formData,
          mobile: e.target.value,
        })
      }
      className="w-full h-14 px-4 border-2 border-blue-200 rounded-xl bg-white text-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
      required
    />
  </div>

  <div>
    <label className="block mb-2 font-semibold text-gray-700">
      व्यवसाय
    </label>

    <input
      type="text"
      value={formData.profession}
      onChange={(e) =>
        setFormData({
          ...formData,
          profession: e.target.value,
        })
      }
      className="w-full h-14 px-4 border-2 border-blue-200 rounded-xl bg-white text-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
    />
  </div>

</div>

<div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 bg-blue-50 text-center">

  <label className="block text-blue-700 font-semibold mb-3">
    सदस्य का फोटो
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setPhoto(e.target.files?.[0] || null)
    }
    className="w-full"
  />

  <p className="text-sm text-gray-500 mt-2">
    JPG, PNG फोटो अपलोड करें
  </p>

</div>

          <button
  type="submit"
  disabled={loading}
  className={`w-full h-14 text-white text-lg font-bold rounded-xl shadow-lg transition ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02]"
  }`}
>
  {loading
    ? "⏳ फॉर्म सबमिट हो रहा है..."
    : "सदस्यता आवेदन करें"}
</button>

        </form>

        {message && (
  <div
    className={`mt-6 p-4 rounded-xl text-center font-semibold ${
      message.includes("❌")
        ? "bg-red-100 border border-red-300 text-red-700"
        : "bg-green-100 border border-green-300 text-green-700"
    }`}
  >
    {message}
  </div>
)}

<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
  <p className="text-blue-700 font-medium">
    कृपया सभी जानकारी सही भरें। पंजीकरण के बाद आपको सदस्यता क्रमांक प्रदान किया जाएगा।
  </p>
</div>

      </div>

    </main>
  );
}