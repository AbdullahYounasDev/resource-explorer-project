"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useFavorites } from "@/hooks/useFavorites";
import { motion } from "framer-motion";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useTheme } from "@/app/providers";

export default function CharacterDetail() {
  const { theme } = useTheme(); // get current theme
  const { id } = useParams<{ id: string }>();
  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: async () => (await api.get(`/character/${id}`)).data,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={() => window.location.reload()} />;

  const statusColor = {
    alive: "bg-green-500",
    dead: "bg-red-500",
    unknown: "bg-yellow-500",
  }[data.status.toLowerCase()];

  // Theme-based classes
  const containerClass = theme === "dark"
    ? "p-4 md:p-8 max-w-4xl mx-auto text-white"
    : "p-4 md:p-8 max-w-4xl mx-auto text-black";

  const cardClass = theme === "dark"
    ? "border-4 border-black rounded-xl bg-gray-900 shadow-comic-xl overflow-hidden"
    : "border-4 border-black rounded-xl bg-white shadow-comic-xl overflow-hidden";

  const headerClass = theme === "dark"
    ? "bg-gray-800 p-4 border-b-4 border-black relative"
    : "bg-gradient-to-r from-yellow-400 to-orange-400 p-4 border-b-4 border-black relative";

  const textGrayClass = theme === "dark" ? "text-gray-300" : "text-gray-700";

  // ----------- Outer Full-Screen Container ---------
  const outerClass = theme === "dark"
    ? "w-full min-h-screen bg-gray-900 flex items-center justify-center"
    : "w-full min-h-screen bg-yellow-50 flex items-center justify-center";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={outerClass} // <-- full-screen themed div
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={containerClass}
      >
        <div className={cardClass}>
          {/* Header */}
          <div className={headerClass}>
            <h1 className="text-3xl md:text-4xl font-comic font-bold text-center uppercase tracking-wide">
              {data.name}
            </h1>
            <div className="absolute -top-4 -right-4 text-4xl font-comic font-bold rotate-12 opacity-80">
              POW!
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Character Image */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={data.image}
                alt={data.name}
                className="w-full rounded-lg border-4 border-black shadow-comic-lg"
              />
              <div
                className={`absolute top-4 right-4 px-4 py-1 rounded-full border-2 border-black ${statusColor} font-comic font-bold text-white text-sm shadow-comic-sm`}
              >
                {data.status.toUpperCase()}
              </div>
            </motion.div>

            {/* Character Details */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className={`text-2xl font-comic font-bold border-b-4 border-black pb-2`}>
                  CHARACTER DOSSIER
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`font-comic font-bold ${textGrayClass}`}>SPECIES</p>
                    <p className="text-lg font-semibold">{data.species}</p>
                  </div>
                  <div>
                    <p className={`font-comic font-bold ${textGrayClass}`}>GENDER</p>
                    <p className="text-lg font-semibold">{data.gender}</p>
                  </div>
                  {data.type && (
                    <div>
                      <p className={`font-comic font-bold ${textGrayClass}`}>TYPE</p>
                      <p className="text-lg font-semibold">{data.type}</p>
                    </div>
                  )}
                  <div>
                    <p className={`font-comic font-bold ${textGrayClass}`}>ORIGIN</p>
                    <p className="text-lg font-semibold">{data.origin.name}</p>
                  </div>
                  <div>
                    <p className={`font-comic font-bold ${textGrayClass}`}>LOCATION</p>
                    <p className="text-lg font-semibold">{data.location.name}</p>
                  </div>
                  {data.episode && (
                    <div>
                      <p className={`font-comic font-bold ${textGrayClass}`}>EPISODES</p>
                      <p className="text-lg font-semibold">{data.episode.length}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Favorite Button */}
              <motion.button
                onClick={() => toggleFavorite(data.id)}
                className={`w-full py-3 px-6 rounded-lg border-4 border-black font-comic font-bold text-xl flex items-center justify-center gap-2 ${
                  favorites.includes(data.id)
                    ? "bg-red-500 text-white"
                    : theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                } shadow-comic-lg hover:shadow-comic-xl transition-all`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl">
                  {favorites.includes(data.id) ? "❤️" : "♡"}
                </span>
                {favorites.includes(data.id) ? "FAVORITED!" : "FAVORITE"}
              </motion.button>
            </div>
          </div>

          {/* Optional: Episode list */}
          {data.episode && data.episode.length > 0 && (
            <div className={`border-t-4 border-black p-6 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <h2 className="text-2xl font-comic font-bold mb-4">EPISODE APPEARANCES</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.episode.slice(0, 8).map((episode: string) => (
                  <div
                    key={episode}
                    className={`border-2 rounded-lg p-2 text-center font-comic font-bold ${
                      theme === "dark" ? "bg-gray-700 border-white text-white" : "bg-gray-100 border-black"
                    }`}
                  >
                    {episode.split("/").pop()}
                  </div>
                ))}
                {data.episode.length > 8 && (
                  <div
                    className={`border-2 rounded-lg p-2 text-center font-comic font-bold ${
                      theme === "dark" ? "bg-gray-700 border-white text-white" : "bg-gray-200 border-black"
                    }`}
                  >
                    +{data.episode.length - 8} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
