import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <div>
          <a href="/">
            <h1 className="text-yellow-300 font-extrabold text-2xl">
              KPVP
            </h1>

            <p className="text-white text-xs">
              

              मीणा जाति सेवा संस्थान
            </p>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8 text-white font-medium">

          <a href="/" className="hover:text-yellow-300">
            होम
          </a>

          <a href="/#about" className="hover:text-yellow-300">
            हमारे बारे में
          </a>

          <a href="/gallery" className="hover:text-yellow-300">
            गैलरी
          </a>

          <a href="/#students" className="hover:text-yellow-300">
            प्रतिभा सम्मान
          </a>

          <a href="/committee" className="hover:text-yellow-300">
            कार्यकारिणी
          </a>

          <a href="/membership" className="hover:text-yellow-300">
            सदस्यता
          </a>

          

          <Link href="/contact">संपर्क </Link>

        </div>

        <a
          href="/membership"
          className="hidden md:block bg-yellow-400 text-black px-5 py-2 rounded-full font-bold hover:scale-105 transition"
        >
          सदस्य बनें
        </a>

      </div>

    </nav>
  );
}