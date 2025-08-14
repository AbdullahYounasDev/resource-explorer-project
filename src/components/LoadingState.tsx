"use client";
import { useTheme } from "@/app/providers";
import { motion } from "framer-motion";

export default function LoadingState() {
  const { theme } = useTheme();
  const skeletons = Array.from({ length: 8 });

  const isDark = theme === "dark";

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <div
      className="p-4 space-y-6 min-h-screen"
      style={{ backgroundColor: isDark ? "#111827" : "#ffffff" }}
    >
      {/* Search & Filter Skeletons */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div
          custom={0}
          variants={cardVariants}
          className="h-12 rounded-xl w-full md:w-1/3 animate-pulse border-2"
          style={{
            backgroundColor: isDark ? "#374151" : "#e5e7eb",
            borderColor: isDark ? "#6b7280" : "#000000",
            boxShadow: "4px 4px 0px 0px #000",
          }}
        />
        <motion.div className="flex gap-4">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              className="h-12 rounded-xl w-32 animate-pulse border-2"
              style={{
                backgroundColor: isDark ? "#374151" : "#e5e7eb",
                borderColor: isDark ? "#6b7280" : "#000000",
                boxShadow: "4px 4px 0px 0px #000",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Character Card Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skeletons.map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="border-4 rounded-xl p-4 space-y-4 animate-pulse"
            style={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#6b7280" : "#000000",
              boxShadow: "6px 6px 0px 0px #000",
            }}
          >
            <div
              className="w-full h-48 rounded-lg border-2"
              style={{
                backgroundColor: isDark ? "#374151" : "#e5e7eb",
                borderColor: isDark ? "#6b7280" : "#000000",
              }}
            />
            <div
              className="h-6 rounded-full w-3/4 border-2"
              style={{
                backgroundColor: isDark ? "#374151" : "#e5e7eb",
                borderColor: isDark ? "#6b7280" : "#000000",
              }}
            />
            <div
              className="h-4 rounded-full w-1/2 border-2"
              style={{
                backgroundColor: isDark ? "#374151" : "#e5e7eb",
                borderColor: isDark ? "#6b7280" : "#000000",
              }}
            />
            <div className="flex justify-between mt-4">
              <div
                className="h-8 rounded-lg w-16 border-2"
                style={{
                  backgroundColor: isDark ? "#374151" : "#e5e7eb",
                  borderColor: isDark ? "#6b7280" : "#000000",
                }}
              />
              <div
                className="h-8 w-8 rounded-full border-2"
                style={{
                  backgroundColor: isDark ? "#374151" : "#e5e7eb",
                  borderColor: isDark ? "#6b7280" : "#000000",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <motion.div className="flex justify-center gap-6 mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-10 ${i === 1 ? "w-36" : "w-24"} rounded-xl border-2 animate-pulse`}
            style={{
              backgroundColor: isDark ? "#374151" : "#e5e7eb",
              borderColor: isDark ? "#6b7280" : "#000000",
              boxShadow: "4px 4px 0px 0px #000",
            }}
          />
        ))}
      </motion.div>

      {/* Comic-style loading bar */}
      <div className="flex justify-center mt-8">
        <div className="relative w-32 h-8">
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{
              backgroundColor: isDark ? "#374151" : "#e5e7eb",
              borderColor: isDark ? "#6b7280" : "#000000",
            }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full border-2"
            style={{
              backgroundColor: isDark ? "#facc15" : "#fcd34d",
              borderColor: isDark ? "#6b7280" : "#000000",
              boxShadow: "3px 3px 0px 0px #000",
            }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center font-bold text-sm"
            style={{ color: isDark ? "#fef3c7" : "#000000" }}
          >
            LOADING...
          </div>
        </div>
      </div>
    </div>
  );
}
