"use client";

import MembershipPopup from "../components/MembershipPopup";
import RecentMembers from "../components/RecentMembers";
import TodaysBirthday from "../components/TodaysBirthday";
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
    
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-blue-950 via-indigo-950 to-slate-950">
	{/* 🌸🔔 Devotional Background */}
<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

  {/* Soft Divine Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,193,7,0.15),transparent_45%)]" />

  {/* Falling Flowers */}
  <div className="devotional-petals">
    <span>🌸</span>
    <span>🌼</span>
    <span>🌺</span>
    <span>🌸</span>
    <span>🌼</span>
    <span>🌺</span>
    <span>🌸</span>
    <span>🌼</span>
    <span>🌺</span>
    <span>🌸</span>
  </div>

  {/* Temple Bells */}
  {/* 🔔 Hanging Temple Bells */}

<div className="temple-bells">

  {/* Left Bell */}
  <div className="temple-bell bell-left">
    <div className="bell-chain"></div>
    <div className="bell-top"></div>
    <div className="bell-body">
      <div className="bell-inner"></div>
    </div>
  </div>

  {/* Center Bell */}
  <div className="temple-bell bell-center">
    <div className="bell-chain"></div>
    <div className="bell-top"></div>
    <div className="bell-body">
      <div className="bell-inner"></div>
    </div>
  </div>

  {/* Right Bell */}
  <div className="temple-bell bell-right">
    <div className="bell-chain"></div>
    <div className="bell-top"></div>
    <div className="bell-body">
      <div className="bell-inner"></div>
    </div>
  </div>

</div>
</div>
  
  <MembershipPopup />
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
    ? "मीणा जाति सेवा संस्थान में आपका स्वागत है"
    : news.map((item) => item.title).join(" | ")}
</div>
      </div>

    </div>

  </div>

</section>

{/* Hero Section */}
<section className="pt-8 px-4">
  <div className="max-w-6xl mx-auto">

    <div className="flex items-center justify-center gap-6 md:gap-12">

      {/* बड़ा Logo - Left Side */}
      <div className="shrink-0">
        <Image
          src="/logo.png"
          alt="मारवाड़ मीणा समाज कांटा परगना"
          width={300}
          height={300}
          className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full shadow-2xl"
          priority
        />
      </div>

      {/* Hindi Heading */}
      <div className="flex-1 text-center">

        {/* Royal Hindi Calligraphy Heading */}
<div className="flex-1 text-center">

  <div className="relative inline-block px-3">

    {/* Royal Top Decoration */}
    <div className="flex items-center justify-center gap-3 mb-2">
      <span className="text-yellow-400 text-xl">❈</span>

      <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-yellow-400 to-orange-500"></span>

      <span className="text-orange-400 text-2xl">✦</span>

      <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-yellow-400 to-orange-500"></span>

      <span className="text-yellow-400 text-xl">❈</span>
    </div>

    {/* Calligraphy Heading */}
    <h1
      className="
        text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        leading-[1.25]
        font-normal
      "
      style={{
        fontFamily: "'Yatra One', cursive",
        background:
          "linear-gradient(180deg, #FFF700 0%, #FFD700 35%, #FF8C00 70%, #FF4500 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",

        filter:
          "drop-shadow(0 3px 2px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(255,193,7,0.6))",

        letterSpacing: "1px",
      }}
    >
      मीणा जाति सेवा संस्थान
      <br />

      <span
        style={{
          background:
            "linear-gradient(180deg, #FFE600, #FFB300, #FF6D00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        मुख्यालय : मारवाड़ जंक्शन 
      </span>
    </h1>

    {/* Royal Bottom Decoration */}
    <div className="flex items-center justify-center gap-3 mt-3">

      <span className="h-[2px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-orange-400 to-yellow-300"></span>

      <span className="text-yellow-300 text-3xl">
        ❖
      </span>

      <span className="h-[2px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-orange-400 to-yellow-300"></span>

    </div>

  </div>

</div>

      </div>

    </div>

  

          {/* Slider Title */}
<h3 className="mt-8 mb-4 text-xl md:text-2xl font-bold text-white text-center">
  समाज की झलकियाँ
</h3>
          {/* Image Slider */}
          <div className="max-w-6xl mx-auto">
            <HeroSlider />
          </div>

          {/* Tagline */}
<p className="mt-8 text-lg md:text-2xl text-white text-center">
  शिक्षा • जागृति • शक्ति • समाज उत्थान
</p>


        </div>
      </section>

      <section
        id="about"
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="max-w-6xl mx-auto mt-[-100px]">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 text-center">
              मीणा जाति सेवा संस्थान
            </h2>

            <p className="mt-6 text-white text-lg leading-8 text-center">
              मीणा जाति सेवा संस्थान समाज की एकता, शिक्षा, संस्कार एवं सर्वांगीण विकास के लिए समर्पित एक सामाजिक संस्था है। संस्थान का उद्देश्य समाज के प्रत्येक वर्ग को साथ लेकर शिक्षा को बढ़ावा देना, युवाओं को प्रेरित करना, प्रतिभाओं को प्रोत्साहित करना तथा सामाजिक जागरूकता और सेवा की भावना को मजबूत करना है।

हमारी यह पहल समाज की गौरवशाली परंपराओं और मूल्यों को आगे बढ़ाते हुए संगठन, सहयोग और समाज उत्थान की दिशा में निरंतर कार्य करने के लिए प्रतिबद्ध है। </p>
          </div>
        </div>
      </section>

{/* Religious Gurus Section */}
<section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
  <div className="text-center mb-8">
    <h2 className="text-3xl md:text-4xl font-bold text-yellow-300">
      🙏पूज्य संत-महापुरुष🙏
    </h2>

    <p className="text-white/80 mt-3 text-base md:text-lg">
      ॥ जानुन्दा बगेची के संत ॥
      <br />
      जानुन्दा बगेची की पावन संत परंपरा श्रद्धा, भक्ति, तप और आध्यात्मिक चेतना की अमूल्य धरोहर है। यहाँ के संतों ने समाज को धर्म, सेवा, सदाचार और एकता का मार्ग दिखाया है।
    </p>
  </div>

  <div className="overflow-hidden">
    <div className="flex gap-5 min-w-max pb-4 animate-guru-scroll">
      <div className="w-64 md:w-60 shrink-0 h-[430px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 text-center shadow-2xl">
        <img
          src="/gurus/bhakar-das.jpg"
          alt="परम पूज्य भाखरदास जी महाराज"
          className="w-full h-72 object-cover rounded-2xl"
        />

        <h3 className="mt-4 text-xl font-bold text-yellow-300">
          परम पूज्य भाखरदास जी महाराज
        </h3>

        <p className="text-white/80 mt-2">
          महान संत एवं आध्यात्मिक मार्गदर्शक
        </p>
      </div>

      <div className="w-64 md:w-60 shrink-0 h-[430px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 text-center shadow-2xl">
        <img
          src="/gurus/bhur-das.jpg"
          alt="परम पूज्य भूरदास जी महाराज"
          className="w-full h-72 object-cover rounded-2xl"
        />

        <h3 className="mt-4 text-xl font-bold text-yellow-300">
          परम पूज्य भूरदास जी महाराज
        </h3>

        <p className="text-white/80 mt-2">
          महान संत एवं आध्यात्मिक मार्गदर्शक
        </p>
      </div>

      <div className="w-64 md:w-60 shrink-0 h-[430px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 text-center shadow-2xl">
        <img
          src="/gurus/ram-das.jpg"
          alt="परम पूज्य रामदास जी महाराज"
          className="w-full h-72 object-cover rounded-2xl"
        />

        <h3 className="mt-4 text-xl font-bold text-yellow-300">
          परम पूज्य रामदास जी महाराज
        </h3>

        <p className="text-white/80 mt-2">
          महान संत एवं आध्यात्मिक मार्गदर्शक
        </p>
      </div>

      <div className="w-64 md:w-60 shrink-0 relative pt-0 text-center">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
          <div className="bg-yellow-400 text-black text-sm font-bold py-2 px-5 rounded-full shadow-lg">
            वर्तमान गद्दीपति
          </div>
        </div>

        <div className="h-[430px] bg-white/10 backdrop-blur-md border border-yellow-300/40 rounded-3xl p-4 text-center shadow-2xl">
          <img
            src="/gurus/bhakti-das.jpg"
            alt="परम पूज्य बाल योगी भक्तिदास जी महाराज"
            className="w-full h-72 object-cover rounded-2xl"
          />

          <h3 className="mt-4 text-xl font-bold text-yellow-300">
            परम पूज्य बाल योगी भक्तिदास जी महाराज
          </h3>

          <div className="mt-3 inline-block">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg border border-yellow-300/50">
              👑 वर्तमान गद्दीपति
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p className="text-center text-white/50 text-sm mt-2 md:hidden">
    ← दाएँ-बाएँ स्वाइप करें →
  </p>
</section>

      {/* Today's Birthday */}
      <div className="max-w-6xl mx-auto mt-10">
<TodaysBirthday />
</div>


{/* New Approved Members */}
<div className="max-w-6xl mx-auto mt-[-100px]">
  <RecentMembers />
</div>
      

      {/* Quick Links */}
     <section className="max-w-6xl mx-auto px-6 pb-16 mt-10">
        <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">
          त्वरित सेवाएँ
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          <a
            href="/membership"
            className="group bg-yellow-400 text-black px-4 py-5 rounded-2xl text-center font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              👥
            </div>
            <div className="text-sm md:text-base">
              सदस्य बनें
            </div>
          </a>

          <a
            href="/pratibha"
            className="group bg-purple-600 text-white px-4 py-5 rounded-2xl text-center font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              🏆
            </div>
            <div className="text-sm md:text-base">
              प्रतिभा सम्मान आवेदन
            </div>
          </a>

          <a
            href="/status"
            className="group bg-blue-600 text-white px-4 py-5 rounded-2xl text-center font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              👥
            </div>
            <div className="text-sm md:text-base">
              सदस्य स्थिति
            </div>
          </a>

          <a
            href="/pratibha-status"
            className="group bg-indigo-600 text-white px-4 py-5 rounded-2xl text-center font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              🏆
            </div>
            <div className="text-sm md:text-base">
              प्रतिभा सम्मान स्थिति
            </div>
          </a>

          <a
            href="/contact"
            className="group bg-red-600 text-white px-4 py-5 rounded-2xl text-center font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition">
              📞
            </div>
            <div className="text-sm md:text-base">
              संपर्क करें
            </div>
          </a>
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

                <p className="text-white">{item.category}</p>
                <p className="text-white">{item.percentage}%</p>
                <p className="text-white/70">{item.village}</p>
              </div>
            ))
          )}
        </div>
      </section>

<footer
  id="contact"
  className="text-center py-6 border-t border-white/20"
>
  <h3 className="text-white text-xl font-bold">
    मीणा जाति सेवा संस्थान
  </h3>

  <p className="text-white/80 text-sm mt-2">
    52 गाँव • 5000+ सदस्य • 100+ प्रतिभा सम्मान • 25+ सामाजिक कार्यक्रम
  </p>

  <p className="text-white/80 text-sm mt-2">
    © 2026 All Rights Reserved
  </p>
</footer>
</main>
  );
}