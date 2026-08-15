"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminContactPage() {
  const [personName, setPersonName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContact();
  }, []);

  async function loadContact() {
    const { data } = await supabase
      .from("contact_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setPersonName(data.person_name || "");
      setMobile(data.mobile || "");
      setEmail(data.email || "");
      setWhatsapp(data.whatsapp_link || "");
      setInstagram(data.instagram_link || "");
      setFacebook(data.facebook_link || "");
      setYoutube(data.youtube_link || "");
      setAddress(data.address || "");
    }
  }

  async function saveContact() {
    setLoading(true);

    const { data } = await supabase
      .from("contact_settings")
      .select("id")
      .limit(1)
      .single();

    if (data) {
      await supabase
        .from("contact_settings")
        .update({
          person_name: personName,
          mobile,
          email,
          whatsapp_link: whatsapp,
          instagram_link: instagram,
          facebook_link: facebook,
          youtube_link: youtube,
          address,
        })
        .eq("id", data.id);
    } else {
      await supabase.from("contact_settings").insert([
        {
          person_name: personName,
          mobile,
          email,
          whatsapp_link: whatsapp,
          instagram_link: instagram,
          facebook_link: facebook,
          youtube_link: youtube,
          address,
        },
      ]);
    }

    setLoading(false);
    alert("✅ Contact Settings Saved Successfully");
  }

  const inputClass =
    "w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-blue-800 mb-8">
          📞 Contact Settings
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Contact Person Name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={inputClass}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="WhatsApp Group Link"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Instagram Link"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Facebook Link"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            placeholder="YouTube Link"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            className={inputClass}
          />

        </div>

        <div className="mt-5">
          <textarea
            rows={4}
            placeholder="Office Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          onClick={saveContact}
          disabled={loading}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold"
        >
          {loading ? "Saving..." : "💾 Save Contact Settings"}
        </button>

      </div>
    </main>
  );
}