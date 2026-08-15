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
    const { data } = await supabase
      .from("members")
      .select("*");

    if (!data) return;

    setTotal(data.length);
    setPending(
      data.filter((m) => m.status === "Pending").length
    );
    setApproved(
      data.filter((m) => m.status === "Approved").length
    );
    setRejected(
      data.filter((m) => m.status === "Rejected").length
    );
  }

  useEffect(() => {
    loadStats();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "nk@413697"
    ) {
      setLoggedIn(true);
      setError("");
      loadStats();
    } else {
      setError("गलत Username या Password");
    }
  };

  if (loggedIn) {
    return (
      <main className="min-h-screen p-8">

        <h1 className="text-4xl font-bold text-yellow-300 text-center mb-2">
          KPVP Admin Dashboard
        </h1>

        <p className="text-center text-white mb-8">
          कांटा परगना विकास परिषद
        </p>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">

          <div className="bg-blue-600 p-6 rounded-3xl text-center text-white shadow-xl">
            <div className="text-4xl font-bold">{total}</div>
            <div>Total Members</div>
          </div>

          <div className="bg-yellow-400 p-6 rounded-3xl text-center text-black shadow-xl">
            <div className="text-4xl font-bold">{pending}</div>
            <div>Pending</div>
          </div>

          <div className="bg-green-600 p-6 rounded-3xl text-center text-white shadow-xl">
            <div className="text-4xl font-bold">{approved}</div>
            <div>Approved</div>
          </div>

          <div className="bg-red-600 p-6 rounded-3xl text-center text-white shadow-xl">
            <div className="text-4xl font-bold">{rejected}</div>
            <div>Rejected</div>
          </div>

        </div>

        {/* Dashboard Menu */}
        <div className="grid md:grid-cols-4 gap-6">

          <a
            href="/admin/members"
            className="bg-blue-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
          >
            <div className="text-5xl mb-3">👥</div>
            <div>Members</div>
          </a>

          <a
            href="/admin/gallery"
            className="bg-green-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
          >
            <div className="text-5xl mb-3">📸</div>
            <div>Gallery</div>
          </a>

          <a
            href="/admin/news"
            className="bg-red-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
          >
            <div className="text-5xl mb-3">📰</div>
            <div>News</div>
          </a>
<a
  href="/admin/committee"
  className="bg-purple-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
>
  <div className="text-5xl mb-3">👨‍💼</div>
  <div>Committee</div>
</a>
<a
  href="/admin/pratibha"
  className="bg-purple-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
>
  <div className="text-5xl mb-3">🏆</div>
  <div>Pratibha Samman</div>
</a>
    <a
  href="/admin/slider"
  className="bg-indigo-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
>
  <div className="text-5xl mb-3">🖼️</div>
  <div>Slider Images</div>
</a>      
<a
  href="/admin/contact"
  className="bg-orange-600 text-white p-8 rounded-3xl text-center font-bold hover:scale-105 transition shadow-xl"
>
  <div className="text-5xl mb-3">📞</div>
  <div>Contact</div>
</a>
        </div>

        

        {/* Control Panel */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-yellow-300 mb-4">
            Admin Control Panel
          </h2>

          <ul className="space-y-3 text-white">
            <li>✅ Member Management</li>
            <li>✅ Gallery Management</li>
            <li>✅ News Management</li>
            <li>✅ Committee Management</li>
            <li>✅ Slider Image Management</li>
            <li>✅ Certificate Management</li>
          </ul>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-yellow-300 mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl text-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl text-black"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold p-3 rounded-xl hover:scale-105 transition"
          >
            Login
          </button>

        </form>

        {error && (
          <p className="text-red-400 mt-4 text-center">
            {error}
          </p>
        )}

      </div>

    </main>
  );
}