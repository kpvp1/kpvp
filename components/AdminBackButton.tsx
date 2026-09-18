
"use client";

export default function AdminBackButton() {
  return (
    <div className="mb-6">

      <a
        href="/admin"
        className="
          inline-flex
          items-center
          gap-2
          bg-white/10
          hover:bg-white/20
          border border-white/20
          text-white
          px-5 py-2.5
          rounded-xl
          font-semibold
          text-sm
          transition
          hover:-translate-y-0.5
          shadow-lg
        "
      >
        ← Admin Dashboard
      </a>

    </div>
  );
}
