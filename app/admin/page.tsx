
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);

  async function loadStats() {
    const { data, error } = await supabase
      .from("members")
      .select("status");

    if (error) {
      console.error("Error loading stats:", error);
      return;
    }

    if (!data) return;

    setTotal(data.length);
    setPending(data.filter((m) => m.status === "Pending").length);
    setApproved(data.filter((m) => m.status === "Approved").length);
    setRejected(data.filter((m) => m.status === "Rejected").length);
  }

  useEffect(() => {
  const adminLogin = localStorage.getItem("kpvp_admin_login");

  if (adminLogin === "true") {
    setLoggedIn(true);
  }

  loadStats();
}, []);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "nk@413697") {
  localStorage.setItem("kpvp_admin_login", "true");
  setLoggedIn(true);
  setError("");
  loadStats();
}
 else {
      setError("गलत Username या Password");
    }
  };

  /* ================================
     ADMIN DASHBOARD
  ================================= */


if (loggedIn) {
  return (
    <main className="min-h-screen px-4 py-6 md:px-8 md:py-8">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div className="flex items-center gap-4">

            <img
              src="/logo.png"
              alt="KPVP Logo"
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />

            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                KPVP Admin Dashboard
              </h1>

              <p className="text-white/50 text-sm mt-1">
              मीणा जाति सेवा संस्थान
              </p>
            </div>

          </div>


          {/* Header Buttons */}

          <div className="flex items-center gap-2 flex-wrap">

            <a
              href="/"
              className="
                bg-yellow-400
                hover:bg-yellow-300
                text-black
                px-4 py-2
                rounded-xl
                font-bold
                text-sm
                transition
              "
            >
              🏠 Website Home
            </a>

            
            <div
              className="
                flex items-center gap-2
                bg-white/10
                border border-white/10
                px-4 py-2
                rounded-xl
              "
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />

              <span className="text-white/80 text-sm">
                Admin Online
              </span>
            </div>

          </div>

        </header>


       
{/* ================= MEMBER SUMMARY ================= */}

<section className="mb-8">

  <div className="mb-4">
    <h2 className="text-xl font-bold text-white">
      सदस्य स्थिति
    </h2>

    <p className="text-white/40 text-sm mt-1">
      Membership का संक्षिप्त विवरण
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

    {/* Total Members */}
    <div className="bg-white/10 backdrop-blur-md
      border border-white/10 rounded-xl
      px-4 py-4 text-center shadow-lg">

      <p className="text-white/60 text-sm font-medium">
        कुल सदस्य
      </p>

      <p className="text-2xl md:text-3xl font-bold text-white mt-1">
        {total}
      </p>

    </div>


    {/* Pending */}
    <div className="bg-white/10 backdrop-blur-md
      border border-yellow-400/20 rounded-xl
      px-4 py-4 text-center shadow-lg">

      <p className="text-yellow-300/80 text-sm font-medium">
        लंबित
      </p>

      <p className="text-2xl md:text-3xl font-bold text-yellow-300 mt-1">
        {pending}
      </p>

    </div>


    {/* Approved */}
    <div className="bg-white/10 backdrop-blur-md
      border border-green-400/20 rounded-xl
      px-4 py-4 text-center shadow-lg">

      <p className="text-green-300/80 text-sm font-medium">
        स्वीकृत
      </p>

      <p className="text-2xl md:text-3xl font-bold text-green-400 mt-1">
        {approved}
      </p>

    </div>


    {/* Rejected */}
    <div className="bg-white/10 backdrop-blur-md
      border border-red-400/20 rounded-xl
      px-4 py-4 text-center shadow-lg">

      <p className="text-red-300/80 text-sm font-medium">
        अस्वीकृत
      </p>

      <p className="text-2xl md:text-3xl font-bold text-red-400 mt-1">
        {rejected}
      </p>

    </div>

  </div>

</section>


        {/* ================= MANAGEMENT ================= */}

        <section>

          <div className="mb-5">

            <h2 className="text-2xl font-bold text-white">
              Management
            </h2>

            <p className="text-white/40 text-sm mt-1">
              वेबसाइट के विभिन्न sections को manage करें
            </p>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">


            <AdminCard
              href="/admin/members"
              icon="👥"
              title="Members"
              subtitle="सदस्य प्रबंधन"
              iconBg="bg-blue-500/15"
            />

            <AdminCard
              href="/admin/gallery"
              icon="📸"
              title="Gallery"
              subtitle="फोटो प्रबंधन"
              iconBg="bg-pink-500/15"
            />

            <AdminCard
              href="/admin/news"
              icon="📰"
              title="News"
              subtitle="सूचना प्रबंधन"
              iconBg="bg-yellow-500/15"
            />

            <AdminCard
              href="/admin/committee"
              icon="👨‍💼"
              title="Committee"
              subtitle="समिति प्रबंधन"
              iconBg="bg-indigo-500/15"
            />

            <AdminCard
              href="/admin/pratibha"
              icon="🏆"
              title="Pratibha Samman"
              subtitle="प्रतिभा सम्मान"
              iconBg="bg-amber-500/15"
            />

            <AdminCard
              href="/admin/slider"
              icon="🖼️"
              title="Slider Images"
              subtitle="स्लाइडर प्रबंधन"
              iconBg="bg-violet-500/15"
            />

            <AdminCard
              href="/admin/contact"
              icon="📞"
              title="Contact"
              subtitle="संपर्क प्रबंधन"
              iconBg="bg-emerald-500/15"
            />

          </div>

        </section>


        {/* ================= CONTROL PANEL ================= */}

        <section
          className="
            mt-8
            bg-white/5
            border border-white/10
            rounded-2xl
            p-5 md:p-6
          "
        >

          <h2 className="text-lg font-bold text-yellow-300 mb-5">
            ⚙️ Admin Control Panel
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

            <ControlItem text="Member Management" />
            <ControlItem text="Gallery Management" />
            <ControlItem text="News Management" />
            <ControlItem text="Committee Management" />
            <ControlItem text="Slider Management" />
            <ControlItem text="Certificate Management" />

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer className="text-center py-8">

          <p className="text-white/40 text-sm">
            मीणा जाति सेवा संस्थान
          </p>

          <p className="text-white/25 text-xs mt-1">
            © 2026 All Rights Reserved
          </p>

        </footer>

      </div>

    </main>
  );
}


  /* =================================
     LOGIN PAGE
  ================================= */

  return (
    <main
      className="
        min-h-screen
        flex items-center
        justify-center
        px-4
      "
    >

      <div
        className="
          w-full max-w-md
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-7 md:p-8
          shadow-2xl
        "
      >

        {/* Logo */}

        <div
          className="
            w-24 h-24
            mx-auto
            rounded-2xl
            bg-white/10
            border border-white/10
            flex items-center
            justify-center
            mb-5
          "
        >

          <img
            src="/logo.png"
            alt="KPVP Logo"
            className="w-20 h-20 object-contain"
          />

        </div>


        <h1
          className="
            text-3xl
            font-extrabold
            text-center
            text-yellow-300
          "
        >
          Admin Login
        </h1>

        <p className="text-center text-white/50 text-sm mt-2 mb-7">
          मीणा जाति सेवा संस्थान
        </p>


        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Username */}

          <div>

            <label className="block text-white/70 text-sm font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="
                w-full
                p-3.5
                rounded-xl
                bg-white
                text-black
                outline-none
                border-2
                border-transparent
                focus:border-yellow-400
                transition
              "
            />

          </div>


          {/* Password */}

          <div>

            <label className="block text-white/70 text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                p-3.5
                rounded-xl
                bg-white
                text-black
                outline-none
                border-2
                border-transparent
                focus:border-yellow-400
                transition
              "
            />

          </div>


          {/* Login */}

          <button
            type="submit"
            className="
              w-full
              bg-yellow-400
              hover:bg-yellow-300
              text-black
              font-bold
              p-3.5
              rounded-xl
              transition
              hover:scale-[1.02]
              shadow-lg
            "
          >
            🔐 Login
          </button>

        </form>


        {/* Error */}

        {error && (
          <div
            className="
              mt-5
              bg-red-500/10
              border border-red-400/30
              text-red-300
              text-center
              p-3
              rounded-xl
              text-sm
              font-semibold
            "
          >
            ❌ {error}
          </div>
        )}

      </div>

    </main>
  );
}


/* =================================
   ADMIN CARD COMPONENT
================================= */

function AdminCard({
  href,
  icon,
  title,
  subtitle,
  iconBg,
}: {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  iconBg: string;
}) {
  return (
    <a
      href={href}
      className="
        group
        bg-white/10
        backdrop-blur-md
        border border-white/10
        rounded-2xl
        p-4 
        shadow-lg
        hover:bg-white/15
        hover:border-white/20
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      <div
        className={`
          ${iconBg}
          w-11 h-11
          md:w-12 md:h-12
          rounded-xl
          flex items-center
          justify-center
          text-xl md:text-2xl
          mb-4
          group-hover:scale-110
          transition
        `}
      >
        {icon}
      </div>


      <h3 className="text-white font-bold text-base md:text-lg">
        {title}
      </h3>

      <p className="text-white/40 text-xs md:text-sm mt-1">
        {subtitle}
      </p>


      <div
        className="
          mt-4
          text-white/30
          group-hover:text-yellow-300
          text-sm
          transition
        "
      >
        Manage →
      </div>

    </a>
  );
}


/* =================================
   CONTROL ITEM
================================= */

function ControlItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-white/60 text-sm">

      <span
        className="
          w-6 h-6
          rounded-full
          bg-green-500/10
          border border-green-400/20
          flex items-center
          justify-center
          text-green-400
          text-xs
        "
      >
        ✓
      </span>

      {text}

    </div>
  );
}

