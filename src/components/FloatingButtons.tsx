"use client";
import { useTheme } from "@/app/providers";
import Link from "next/link";

export default function FloatingButtons() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed h-[150px] right-4 top-4 md:right-6 md:bottom-6 z-50 flex flex-col gap-6">
      <button onClick={toggleTheme} className="w-12 h-12 rounded-full border-4 border-black bg-white shadow-comic-xl flex items-center justify-center cursor-pointer">
        {theme === "light" ? "☀️" : "🌙"}
      </button>

      <Link href="/favorites" className="w-12 h-12 rounded-full border-4 border-black bg-red-500 text-white shadow-comic-xl flex items-center justify-center">
        ❤️
      </Link>
    </div>
  );
}
