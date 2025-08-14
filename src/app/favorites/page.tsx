"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";
import { motion } from "framer-motion";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useTheme } from "@/app/providers"; // <-- theme hook

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species?: string;
  gender?: string;
}

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const { theme } = useTheme(); // get current theme

  // Fetch favorite characters
  const { data, isLoading, isError, refetch } = useQuery<Character[]>({
    queryKey: ["favorites", favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      const res = await api.get<{ results: Character[] }>(
        `/character/${favorites.join(",")}`
      );
      return Array.isArray(res.data) ? res.data : res.data.results || [res.data];
    },
    enabled: favorites.length > 0,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data || data.length === 0) {
    return (
      <EmptyState 
        message="KAPOW! NO FAVORITES YET!" 
        actionText="Find Characters"
        onAction={() => window.location.href = '/'}
      />
    );
  }

  // Outer container theme
  const outerClass = theme === "dark"
    ? "min-h-screen bg-gray-900 text-white p-4 md:p-8"
    : "min-h-screen bg-yellow-50 text-black p-4 md:p-8";

  return (
    <div className={outerClass}>
      {/* Comic-style header */}
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-3xl md:text-4xl font-comic font-bold uppercase tracking-wide
                       border-4 rounded-xl p-4 inline-block
                       ${theme === "dark" ? "bg-gray-800 border-white" : "bg-yellow-400 border-black"}
                       shadow-comic-xl relative`}>
          YOUR FAVORITE HEROES
          <span className="absolute -top-4 -right-4 text-4xl font-comic font-bold rotate-12">❤️</span>
        </h1>
        <p className="mt-4 font-comic text-lg">
          {data.length} {data.length === 1 ? "CHARACTER" : "CHARACTERS"} SAVED
        </p>
      </motion.div>

      {/* Character grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {data.map((char) => (
          <motion.div
            key={char.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden border-4 rounded-xl shadow-comic-xl hover:shadow-comic-2xl transition-all
                        ${theme === "dark" ? "bg-gray-800 border-white" : "bg-white border-black"}`}
            style={{ boxShadow: "8px 8px 0px 0px #000" }}
          >
            {/* Favorite badge */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white font-comic font-bold text-sm shadow-comic-sm z-10
                            ${theme === "dark" ? "bg-red-600 border-white border-2" : "bg-red-500 border-black border-2"}`}>
              FAVORITE
            </div>

            {/* Character image */}
            <div className="relative overflow-hidden border-b-4 border-black">
              <motion.img
                src={char.image}
                alt={char.name}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              />
              {/* Comic halftone overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,black 1px,transparent 1px)] 
                            bg-[length:10px_10px] opacity-10 pointer-events-none"></div>
            </div>

            {/* Character info */}
            <div className="p-4">
              <motion.h2 
                className={`font-comic font-bold text-xl mb-2 truncate
                            ${theme === "dark" ? "text-white" : "text-black"}`}
                whileHover={{ color: "#FF4136" }}
              >
                {char.name.toUpperCase()}
              </motion.h2>

              <div className="flex gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-comic font-bold 
                                ${char.status.toLowerCase() === 'alive' ? 'bg-green-500' : 
                                  char.status.toLowerCase() === 'dead' ? 'bg-red-500' : 'bg-yellow-500'} 
                                text-white border border-black`}>
                  {char.status}
                </span>
                {char.species && (
                  <span className="px-2 py-1 rounded-full text-xs font-comic font-bold 
                                  bg-blue-500 text-white border border-black">
                    {char.species}
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center mt-4">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Link 
                    href={`/characters/${char.id}`} 
                    className={`px-4 py-2 font-comic font-bold rounded-lg shadow-comic-sm transition-colors
                              ${theme === "dark" ? "bg-blue-700 text-white border-white border-2 hover:bg-blue-800" 
                                                 : "bg-blue-500 text-white border-black border-2 hover:bg-blue-600"}`}
                    style={{ boxShadow: "4px 4px 0px 0px #000" }}
                  >
                    VIEW
                  </Link>
                </motion.div>

                <motion.button
                  onClick={(e) => { e.preventDefault(); toggleFavorite(char.id); }}
                  className="text-3xl focus:outline-none"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    color: "#FF4136",
                    y: [0, -5, 0]
                  }}
                  transition={{ y: { duration: 0.6 }, color: { duration: 0.3 } }}
                >
                  ❤️
                </motion.button>
              </div>
            </div>

            {/* Comic decoration */}
            <div className="absolute -bottom-4 -right-4 text-3xl font-comic font-bold rotate-12 opacity-80">
              POP!
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
