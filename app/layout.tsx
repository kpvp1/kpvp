import { Yatra_One } from "next/font/google";
const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["devanagari"],
});
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