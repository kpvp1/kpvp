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
    
    <main className="min-h-screen flex flex-col">
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
className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full shadow-2xl"
            priority
          />

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-tight px-2">
  MARWAR MEENA SAMAJ KANTA PARGANA
</h1>

          <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-300 px-2">
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
        🙏 जानुंदा बगेची — संतों की तपोभूमि, आस्था और भक्ति का पावन धाम

**जानुंदा बगेची** केवल एक धार्मिक स्थल नहीं, बल्कि सम्पूर्ण मीणा समाज की **आस्था, श्रद्धा, भक्ति और आध्यात्मिक चेतना का पावन धाम** है। अरावली की पावन धरती और राजस्थान की समृद्ध संत परंपरा से जुड़ा यह स्थल सदियों से श्रद्धालुओं के लिए विश्वास, भक्ति और आत्मिक शांति का केंद्र रहा है। यहाँ की पावन माटी में संतों की तपस्या, भक्तों की श्रद्धा और सनातन संस्कृति की सुगंध आज भी अनुभव की जा सकती है।

मान्यता है कि **जिस धरती पर संतों के चरण पड़ते हैं और जहाँ साधु-संत तपस्या करते हैं, वह भूमि स्वयं तीर्थ स्वरूप हो जाती है।** जानुंदा बगेची भी ऐसी ही पावन तपोभूमि है, जहाँ अनेक संतों एवं महापुरुषों ने साधना और तपस्या कर समाज को धर्म, सत्य, सेवा, सदाचार एवं मानव कल्याण का मार्ग दिखाया।

इस पवित्र धाम की **गौरवशाली संत परंपरा** में परम पूज्य **भूरदास जी महाराज, भाखरदास जी महाराज एवं रामदास जी महाराज** का विशेष स्थान रहा है। इन संत महापुरुषों की तपस्या, त्याग और आध्यात्मिक साधना ने जानुंदा बगेची की महिमा को और अधिक गौरवान्वित किया है। वर्तमान में **परम पूज्य बाल योगी भक्तिदास जी महाराज** इस पावन गद्दी के गद्दीपति हैं। उनके सान्निध्य और आशीर्वाद से यह धाम आज भी धर्म, भक्ति, सेवा और समाज कल्याण की प्रेरणा प्रदान कर रहा है।

 🕉️ बाबा रामदेव जी की भक्ति का पावन केंद्र

जानुंदा बगेची की धार्मिक परंपरा **लोकदेवता बाबा रामदेव जी** की लोक आस्था से भी गहराई से जुड़ी हुई है। यहाँ प्रतिवर्ष **भादवी बीज एवं माही बीज** के पावन अवसर पर बाबा रामदेव जी का **ब्यावला** अत्यंत श्रद्धा, भक्ति और हर्षोल्लास के साथ आयोजित किया जाता है।

इन पावन अवसरों पर जानुंदा बगेची का वातावरण **भक्ति, भजन, जयकारों और श्रद्धा** से गूंज उठता है। विशाल मेले का आयोजन होता है और राजस्थान के विभिन्न क्षेत्रों सहित दूर-दराज से हजारों श्रद्धालु इस पवित्र धाम में पहुँचकर दर्शन, पूजा-अर्चना एवं आशीर्वाद प्राप्त करते हैं।

यह दृश्य राजस्थान की **लोक संस्कृति, भक्ति परंपरा और सामाजिक एकता** का अद्भुत संगम प्रस्तुत करता है।

🌺 समाज की आस्था और एकता का प्रतीक

जानुंदा बगेची केवल पूजा-अर्चना का स्थान नहीं, बल्कि **समाज की एकता, भाईचारे, संस्कार और संस्कृति की पहचान** भी है। यहाँ आने वाला प्रत्येक श्रद्धालु अपने साथ श्रद्धा और विश्वास लेकर आता है तथा मन में शांति, भक्ति और सेवा की भावना लेकर लौटता है।

यह पावन धाम हमें हमारी **संत परंपरा, सनातन संस्कृति, पूर्वजों के संस्कार और सामाजिक मूल्यों** से जोड़ता है। नई पीढ़ी के लिए भी यह स्थल हमारी धार्मिक एवं सांस्कृतिक विरासत को समझने और उसे आगे बढ़ाने की प्रेरणा देता है।

🙏 हमारी विरासत, हमारा गौरव

**संतों की तपस्या, महापुरुषों का आशीर्वाद, भक्तों की अटूट श्रद्धा और बाबा रामदेव जी की लोक आस्था से सिंचित जानुंदा बगेची हमारी अमूल्य धार्मिक एवं सांस्कृतिक धरोहर है।**

आइए, हम सभी इस पावन धाम की **परंपरा, मर्यादा और पवित्रता को बनाए रखें**, अपनी आने वाली पीढ़ियों को अपनी संस्कृति और संस्कारों से जोड़ें तथा **धर्म, सेवा, सद्भाव और समाज की एकता** के मार्ग पर आगे बढ़ें।

🪔 **“जहाँ संतों की तपस्या की पावन छाया हो,
जहाँ भक्तों की श्रद्धा की अविरल धारा हो,
जहाँ बाबा रामदेव जी के जयकारों से गूंजे धरा—
वही हमारी आस्था का पावन धाम, जानुंदा बगेची है।”**

        </p>

        </div>

      </section>

      {/* Today's Birthday */}
<TodaysBirthday />



{/* New Approved Members */}
<RecentMembers />


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