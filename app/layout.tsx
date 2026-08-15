import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body>

        <Navbar />

        <div className="pt-24">
          {children}
        </div>

      </body>
    </html>
  );
}