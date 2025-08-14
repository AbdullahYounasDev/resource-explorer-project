"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/providers";

interface Props {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, hasPrev, hasNext, onPageChange }: Props) {
  const { theme } = useTheme();

  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const bgColor = theme === "dark" ? "bg-gray-800 border-white text-white" : "bg-white border-black text-black";
  const shadowColor = theme === "dark" ? "6px 6px 0px 0px #fff" : "6px 6px 0px 0px #000";
  const buttonHoverBg = theme === "dark" ? "hover:bg-gray-700" : "";

  return (
    <div className="flex flex-col items-center gap-4 my-8 font-comic">
      {/* Page counter with comic burst effect */}
      <motion.div
        className={`relative px-6 py-2 rounded-full shadow-comic-lg mb-2 border-4 ${bgColor}`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ boxShadow: shadowColor }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`page-${currentPage}`}
            className="text-xl font-bold block text-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            PAGE {currentPage} OF {totalPages}
          </motion.span>
        </AnimatePresence>
        <div className="absolute -right-6 -top-6 text-3xl font-bold rotate-12 opacity-80">BOOM!</div>
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex gap-6 items-center">
        <motion.button
          disabled={!hasPrev}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-6 py-3 border-4 rounded-xl font-bold text-lg relative overflow-hidden shadow-comic-lg
                     ${hasPrev ? `bg-red-500 text-white ${buttonHoverBg}` : 'bg-gray-300 text-gray-500'} 
                     border-black`}
          whileHover={hasPrev ? { y: -3, scale: 1.05 } : {}}
          whileTap={hasPrev ? { scale: 0.95 } : {}}
          style={{ boxShadow: "5px 5px 0px 0px #000" }}
        >
          ◄ PREV
        </motion.button>

        {/* Page indicators for smaller ranges */}
        {totalPages <= 10 && (
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <motion.button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 border-4 font-bold rounded-lg shadow-comic-sm
                           ${currentPage === page 
                             ? 'bg-blue-500 text-white border-black' 
                             : theme === "dark" ? 'bg-gray-700 text-white border-white' : 'bg-white text-black border-black'}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  boxShadow: currentPage === page ? "3px 3px 0px 0px #000" : "2px 2px 0px 0px #000"
                }}
              >
                {page}
              </motion.button>
            ))}
          </div>
        )}

        <motion.button
          disabled={!hasNext}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-6 py-3 border-4 rounded-xl font-bold text-lg relative overflow-hidden shadow-comic-lg
                     ${hasNext ? `bg-blue-500 text-white ${buttonHoverBg}` : 'bg-gray-300 text-gray-500'}
                     border-black`}
          whileHover={hasNext ? { y: -3, scale: 1.05 } : {}}
          whileTap={hasNext ? { scale: 0.95 } : {}}
          style={{ boxShadow: "5px 5px 0px 0px #000" }}
        >
          NEXT ►
        </motion.button>
      </div>

      {/* Comic-style page slider for larger ranges */}
      {totalPages > 10 && (
        <div className="w-full max-w-md mt-4">
          <motion.div className={`relative h-4 rounded-full overflow-hidden border-2 ${theme === "dark" ? "border-white bg-gray-700" : "border-black bg-gray-200"}`}>
            <motion.div
              className={`absolute left-0 top-0 h-full ${theme === "dark" ? "bg-yellow-500" : "bg-yellow-400"}`}
              initial={{ width: 0 }}
              animate={{
                width: `${(currentPage / totalPages) * 100}%`,
                transition: { duration: 0.5, type: "spring" }
              }}
            />
            <motion.div
              className="absolute h-6 w-6 -top-1 bg-red-500 border-2 border-black rounded-full shadow-comic-sm"
              animate={{
                left: `${((currentPage - 1) / (totalPages - 1)) * 100}%`,
                transition: { type: "spring", stiffness: 300 }
              }}
              style={{ boxShadow: "2px 2px 0px 0px #000" }}
            />
          </motion.div>
          <div className="flex justify-between mt-2 text-sm font-bold text-black dark:text-white">
            <span>1</span>
            <span>{totalPages}</span>
          </div>
        </div>
      )}
    </div>
  );
}
