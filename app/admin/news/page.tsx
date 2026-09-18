"use client";
import AdminBackButton from "../../../components/AdminBackButton";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function NewsPage() {
  const [title, setTitle] = useState("");
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setNews(data);
    }
  }

  async function addNews() {
    if (!title.trim()) return;

    await supabase.from("news").insert([
      {
        title,
      },
    ]);

    setTitle("");
    loadNews();
  }

  async function deleteNews(id: number) {
    await supabase
      .from("news")
      .delete()
      .eq("id", id);

    loadNews();
  }

  return (
    <main className="min-h-screen p-8">
<AdminBackButton />
      <h1 className="text-4xl font-bold text-yellow-300 mb-8">
        📰 News Management
      </h1>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl">

        <input
          type="text"
          placeholder="नई सूचना लिखें"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl text-black"
        />

        <button
          onClick={addNews}
          className="mt-4 bg-green-600 px-6 py-3 rounded-xl text-white font-bold"
        >
          Add News
        </button>

      </div>

      <div className="mt-8 space-y-4">

        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 p-4 rounded-xl flex justify-between items-center"
          >
            <span className="text-white">
              {item.title}
            </span>

            <button
              onClick={() => deleteNews(item.id)}
              className="bg-red-600 px-4 py-2 rounded text-white"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </main>
  );
}