"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/app/providers"; 

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onFilterChange: (val: string) => void;
  sortOrder: string;
  onSortChange: (val: string) => void;
}

export default function SearchAndFilter({
  search,
  onSearchChange,
  statusFilter,
  onFilterChange,
  sortOrder,
  onSortChange,
}: Props) {
  const { theme } = useTheme();

  const inputClass = `w-full p-3 pl-10 rounded-lg border-4 font-comic font-bold tracking-wide text-lg
                      shadow-comic focus:outline-none placeholder-opacity-60
                      ${theme === "dark"
      ? "bg-gray-800 border-white text-white placeholder-gray-400 focus:ring-red-500"
      : "bg-white border-black text-black placeholder-black focus:ring-red-500"}`;

  const selectClass = `p-3 pr-8 rounded-lg border-4 font-comic font-bold appearance-none cursor-pointer
                       shadow-comic hover:bg-yellow-100 focus:outline-none focus:ring-4
                       ${theme === "dark"
      ? "bg-gray-800 border-white text-white"
      : "bg-white border-black text-black"}`;

  const containerBg = theme === "dark"
    ? "bg-gray-900"
    : "bg-transparent";

  return (
    <motion.div
      className={`flex flex-col md:flex-row gap-4 md:items-center md:justify-between p-4 relative rounded-xl ${containerBg}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Comic burst background effect */}
      <div className={`absolute inset-0 rounded-xl opacity-20 -z-10
                      ${theme === "dark" ? "bg-gray-700" : "bg-yellow-300"}
                      shadow-[0_0_0_4px_black,0_0_20px_0px_rgba(255,50,50,0.5)]
                      transform rotate-1 scale-95`}></div>

      {/* Search input */}
      <motion.div className="relative flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="SEARCH CHARACTERS..."
          className={inputClass}
          style={{
            boxShadow: theme === "dark"
              ? "5px 5px 0px 0px white, inset 3px 3px 0px 0px rgba(255,255,255,0.1)"
              : "5px 5px 0px 0px black, inset 3px 3px 0px 0px rgba(0,0,0,0.1)"
          }}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl">🔍</div>
      </motion.div>

      {/* Filter controls */}
      <motion.div className="flex gap-3" initial={{ x: 20 }} animate={{ x: 0 }}>
        <motion.select
          value={statusFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className={selectClass}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="" className="font-comic">ALL STATUS</option>
          <option value="alive" className="font-comic text-green-600">ALIVE</option>
          <option value="dead" className="font-comic text-red-600">DEAD</option>
          <option value="unknown" className="font-comic text-gray-600">UNKNOWN</option>
        </motion.select>

        <motion.select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClass}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="asc" className="font-comic">NAME A → Z</option>
          <option value="desc" className="font-comic">NAME Z → A</option>
        </motion.select>
      </motion.div>

      <div className="absolute -right-4 -top-6 text-4xl font-comic font-bold rotate-12 opacity-80">WHOOSH!</div>
    </motion.div>
  );
}
