"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ContactPage() {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    loadContact();
  }, []);

  async function loadContact() {
    const { data } = await supabase
      .from("contact_settings")
      .select("*")
      .limit(1)
      .single();

    if (data) setContact(data);
  }

  if (!contact) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center">
          <img
            src="/logo.png"
            alt="KPVP"
            className="w-24 h-24 mx-auto"
          />

          <h1 className="text-4xl font-bold text-blue-800 mt-4">
            संपर्क करें
          </h1>

          <p className="text-gray-500 mt-2">
            मीणा जाति सेवा संस्थान से संपर्क करने के लिए नीचे दिए गए विवरण का उपयोग करें।
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">

          <div className="bg-blue-50 p-5 rounded-2xl">
            <h3 className="font-bold text-blue-700">
              👤 संपर्क व्यक्ति
            </h3>
            <p>{contact.person_name}</p>
          </div>

          <div className="bg-green-50 p-5 rounded-2xl">
            <h3 className="font-bold text-green-700">
              📱 मोबाइल नंबर
            </h3>

            <a
              href={`tel:${contact.mobile}`}
              className="text-blue-700 font-bold"
            >
              {contact.mobile}
            </a>
          </div>

          <div className="bg-yellow-50 p-5 rounded-2xl">
            <h3 className="font-bold text-yellow-700">
              📧 Email
            </h3>

            <a
              href={`mailto:${contact.email}`}
              className="text-blue-700"
            >
              {contact.email}
            </a>
          </div>

          <div className="bg-purple-50 p-5 rounded-2xl">
            <h3 className="font-bold text-purple-700">
              📍 पता
            </h3>

            <p>{contact.address}</p>
          </div>

        </div>

        {/* Social Buttons */}

        <div className="mt-10 grid md:grid-cols-2 gap-4">

          <a
            href={contact.whatsapp_link}
            target="_blank"
            className="bg-green-600 text-white text-center py-4 rounded-xl font-bold"
          >
            WhatsApp Group Join
          </a>

          <a
            href={contact.instagram_link}
            target="_blank"
            className="bg-pink-600 text-white text-center py-4 rounded-xl font-bold"
          >
            Instagram Follow
          </a>

          <a
            href={contact.facebook_link}
            target="_blank"
            className="bg-blue-700 text-white text-center py-4 rounded-xl font-bold"
          >
            Facebook Page
          </a>

          <a
            href={contact.youtube_link}
            target="_blank"
            className="bg-red-600 text-white text-center py-4 rounded-xl font-bold"
          >
            YouTube Channel
          </a>

        </div>

      </div>

    </main>
  );
}
