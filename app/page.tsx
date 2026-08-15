"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import { supabase } from "../lib/supabase";
export default function Home() {
  const [students, setStudents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [committee, setCommittee] = useState<any[]>([]);

  useEffect(() => {
  loadGallery();
  loadNews();
  loadCommittee();
  loadStudents();
}, []);

  async function loadGallery() {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setGallery(data);
    }
  }

  async function loadNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setNews(data);
    }
  }
async function loadCommittee() {
  const { data } = await supabase
    .from("committee")
    .select("*")
    .order("id");

  if (data) {
    setCommittee(data);
  }
}
async function loadStudents() {
  const { data } = await supabase
  .from("pratibha")
  .select("*")
  .eq("status", "Approved")
  .eq("show_home", true)
  .order("percentage", { ascending: false });

  if (data) {
    setStudents(data);
  }
}

  return (
    
    <main className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Top News Ticker */}
      <section className="mt-1 flex justify-center px-4">

  <div className="w-full max-w-3xl bg-red-600 text-white rounded-2xl shadow-lg overflow-hidden">

    <div className="flex items-center">

      <div className="bg-yellow-400 text-black font-bold px-4 py-3 whitespace-nowrap">
        📢 नवीनतम सूचनाएँ
      </div>

      <div className="overflow-hidden flex-1 bg-white text-black">
        <div className="whitespace-nowrap py-3 animate-news px-4">
  {news.length === 0
    ? "कांटा परगना विकास परिषद में आपका स्वागत है"
    : news.map((item) => item.title).join(" | ")}
</div>
      </div>

    </div>

  </div>

</section>

      {/* Hero Section */}
      <section className="pt-10 px-4">

        <div className="max-w-6xl mx-auto text-center">

          {/* Logo */}
          <Image
            src="/logo.png"
            alt="KPVP Logo"
            width={160}
            height={160}
            className="mx-auto mb-6 rounded-full shadow-2xl"
            priority
          />

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            MARWAR MEENA SAMAJ KANTA PARGANA
          </h1>

          <h2 className="mt-3 text-2xl md:text-4xl font-bold text-yellow-300">
            मारवाड़ मीणा समाज कांटा परगना
          </h2>

          {/* Slider Title */}
          <h3 className="mt-8 mb-4 text-xl md:text-2xl font-bold text-white">
            समाज की झलकियाँ
          </h3>

          {/* Image Slider */}
          <div className="max-w-5xl mx-auto">
            <HeroSlider />
          </div>

          {/* Tagline */}
          <p className="mt-8 text-lg md:text-2xl text-white">
            शिक्षा • जागृति • शक्ति • समाज उत्थान
          </p>

          {/* Button */}
          <a
  href="/membership"
  className="inline-block mt-6 px-8 py-3 rounded-full bg-yellow-400 text-black font-bold hover:scale-105 transition"
>
  सदस्य बनें
</a>

        </div>

      <section
  id="about"
  className="max-w-6xl mx-auto px-6 py-16"
></section>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center">
            जानुंदा बागेची
          </h2>

          <p className="mt-6 text-white text-lg leading-8 text-center">
            जानुंदा बागेची – आस्था, भक्ति एवं आध्यात्मिक साधना का पावन धाम 
 
जानुंदा बागेची सम्पूर्ण मीणा समाज एवं जनमानस की आस्था, श्रद्धा और भक्ति का प्रमुख केंद्र है। यह पावन स्थल वर्षों से आध्यात्मिक साधना, संत परंपरा और लोक कल्याण की दिव्य धारा को प्रवाहित करता आ रहा है। इस तपोभूमि पर अनेक महान संतों एवं महापुरुषों ने तपस्या कर समाज को धर्म, सेवा और सदाचार का मार्ग दिखाया है। 
 
जानुंदा बागेची की गौरवशाली संत परंपरा में परम पूज्य भूरदास जी महाराज, भाखरदास जी महाराज तथा रामदास जी महाराज का विशेष योगदान रहा है। वर्तमान में परम पूज्य बाल योगी भक्तिदास जी महाराज इस पवित्र गद्दी के गद्दीपति हैं, जिनके सान्निध्य में यह धाम निरंतर धार्मिक एवं सामाजिक गतिविधियों का केंद्र बना हुआ है। 
 
यहाँ प्रतिवर्ष भादवी बीज एवं माही बीज के अवसर पर लोकदेवता बाबा रामदेव जी का ब्यावला अत्यंत श्रद्धा, भक्ति और धूमधाम के साथ आयोजित किया जाता है। इस अवसर पर विशाल मेले का आयोजन भी होता है, जिसमें दूर-दूर से हजारों श्रद्धालु दर्शन एवं पूजा-अर्चना के लिए पहुँचते हैं। 
 
मारवाड़ एवं मेवाड़ क्षेत्र सहित राजस्थान के विभिन्न भागों से आने वाले श्रद्धालुओं के लिए जानुंदा बागेची एक महत्वपूर्ण आस्था केंद्र है। यह स्थान केवल धार्मिक महत्व ही नहीं रखता, बल्कि समाज की एकता, संस्कृति, परंपरा एवं आध्यात्मिक विरासत का भी प्रतीक है। जानुंदा बागेची आज भी श्रद्धा, सेवा, समर्पण और सनातन मूल्यों की ज्योति को प्रज्वलित किए हुए है। 

          </p>

        </div>

      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center">
            <h3 className="text-5xl font-bold text-yellow-300">52</h3>
            <p className="text-white mt-2">गाँव</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center">
            <h3 className="text-5xl font-bold text-yellow-300">5000+</h3>
            <p className="text-white mt-2">सदस्य</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center">
            <h3 className="text-5xl font-bold text-yellow-300">100+</h3>
            <p className="text-white mt-2">प्रतिभा सम्मान</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center">
            <h3 className="text-5xl font-bold text-yellow-300">25+</h3>
            <p className="text-white mt-2">सामाजिक कार्यक्रम</p>
          </div>

        </div>

      </section>

      {/* Quick Links */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
{/* Gallery Section */}
<section
  id="/gallery"
  className="max-w-6xl mx-auto px-6 pb-16"
>
  <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">
    📸 फोटो गैलरी
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {gallery.length === 0 ? (
      <div className="col-span-3 text-center text-white">
        अभी कोई फोटो उपलब्ध नहीं है
      </div>
    ) : (
      gallery.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-3xl shadow-xl"
        >
          <img
  src={item.image_url}
  alt="Gallery"
  className="w-full h-64 object-contain bg-white"
/>
        </div>
      ))
    )}

  </div>
</section>
{/* Students Section */}
<section
  id="students"
  className="max-w-6xl mx-auto px-6 pb-16"
>
  <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">
    🏆 प्रतिभावान छात्र
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {students.length === 0 ? (
      <div className="col-span-3 text-center text-white">
        अभी कोई प्रतिभा सम्मान आवेदन स्वीकृत नहीं है
      </div>
    ) : (
      students.map((item) => (
        <div
          key={item.id}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center"
        >

          {item.photo_url && (
            <img
              src={item.photo_url}
              alt={item.student_name}
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-yellow-400"
            />
          )}

          <h3 className="text-yellow-300 font-bold text-xl mt-4">
            {item.student_name}
          </h3>

          <p className="text-white">
            {item.category}
          </p>

          <p className="text-white">
            {item.percentage}%
          </p>

          <p className="text-white/70">
            {item.village}
          </p>

        </div>
      ))
    )}

  </div>
</section>
{/* Committee Section */}
<section
  id="committee"
  className="max-w-6xl mx-auto px-6 pb-16"
>
  <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">
    👥 कार्यकारिणी
  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    {committee.map((item) => (
      <div
        key={item.id}
        className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center"
      >
        <h3 className="text-yellow-300 font-bold text-lg">
          {item.post}
        </h3>

        <p className="text-white mt-2">
          {item.name}
        </p>
      </div>
    ))}

  </div>

</section>
        <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">
          त्वरित सेवाएँ
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

  <a
    href="/membership"
    className="bg-yellow-500 text-black p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
  >
    <div className="text-5xl mb-3">👥</div>
    <div>सदस्य बनें</div>
  </a>

  <a
    href="/pratibha"
    className="bg-purple-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
  >
    <div className="text-5xl mb-3">🏆</div>
    <div>प्रतिभा सम्मान आवेदन</div>
  </a>
<a
  href="/status"
  className="bg-blue-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
>
  <div className="text-5xl mb-3">👥</div>
  <div>Membership Status</div>
</a>

<a
  href="/pratibha-status"
  className="bg-purple-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
>
  <div className="text-5xl mb-3">🏆</div>
  <div>Pratibha Samman Samaroh Application Status</div>
</a>
  

  <a
    href="contact"
    className="bg-red-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
  >
    <div className="text-5xl mb-3">📞</div>
    <div>संपर्क करें</div>
  </a>

</div>
      </section>
<footer
  id="contact"
  className="text-center py-6 border-t border-white/20"
>
        <h3 className="text-white text-xl font-bold">
          कांटा परगना विकास परिषद
        </h3>

        <p className="text-white/80 text-sm mt-2">
          © 2026 All Rights Reserved
        </p>

      </footer>

    </main>
  );
}