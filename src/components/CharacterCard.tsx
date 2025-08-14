"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/app/providers"; // import theme hook

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

interface Props {
  character: Character;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

export default function CharacterCard({ character, isFavorite, toggleFavorite }: Props) {
  const { theme } = useTheme();

  const statusColors = {
    alive: "bg-green-500",
    dead: "bg-red-500",
    unknown: "bg-yellow-500",
  };

  const cardBg = theme === "dark" ? "bg-gray-800 border-white text-white" : "bg-white border-black text-black";
  const cardShadow = theme === "dark" ? "8px 8px 0px 0px #000" : "8px 8px 0px 0px #000";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      whileHover={{ y: -10, scale: 1.03 }}
      className={`relative overflow-hidden rounded-xl shadow-comic-xl border-4 ${cardBg}`}
      style={{ boxShadow: cardShadow }}
    >
      {/* Comic burst effect */}
      <div className={`absolute inset-0 ${theme === "dark" ? "bg-gray-700" : "bg-yellow-200"} opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10`}></div>

      {/* Status badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border-2 border-black ${statusColors[character.status.toLowerCase() as keyof typeof statusColors]} font-comic font-bold text-white text-sm shadow-comic-sm z-10`}>
        {character.status.toUpperCase()}
      </div>

      {/* Character image */}
      <div className="relative overflow-hidden border-b-4 border-black">
        <motion.img
          src={character.image}
          alt={character.name}
          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/comic-dots.png')] opacity-10 pointer-events-none"></div>
      </div>

      {/* Character info */}
      <div className="p-4">
        <motion.h2
          className={`font-comic font-bold text-2xl mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
          whileHover={{ color: "#FF4136" }}
        >
          {character.name.toUpperCase()}
        </motion.h2>

        {/* Action buttons */}
        <div className="flex justify-between items-center mt-4">
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link
              href={`/characters/${character.id}`}
              className={`px-4 py-2 font-comic font-bold rounded-lg border-2 shadow-comic-sm transition-colors ${theme === "dark" ? "bg-gray-700 text-white border-white hover:bg-gray-600" : "bg-blue-500 text-white border-black hover:bg-blue-600"}`}
              style={{ boxShadow: theme === "dark" ? "4px 4px 0px 0px #fff" : "4px 4px 0px 0px #000" }}
            >
              VIEW PROFILE
            </Link>
          </motion.div>

          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(character.id);
            }}
            className="text-3xl focus:outline-none"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            animate={{
              color: isFavorite ? "#FF4136" : theme === "dark" ? "#AAA" : "#555",
              y: isFavorite ? [-5, 0, -2, 0] : 0
            }}
            transition={isFavorite ? {
              y: { duration: 0.6, repeat: 1 },
              color: { duration: 0.3 }
            } : {}}
          >
            {isFavorite ? "❤️" : "🤍"}
          </motion.button>
        </div>
      </div>

      {/* Comic sound effect */}
      <div className="absolute -right-6 -top-6 text-4xl font-comic font-bold rotate-12 opacity-80">POW!</div>
    </motion.div>
  );
}
