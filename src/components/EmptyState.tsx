"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/app/providers";

interface EmptyStateProps {
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "KAPOW! NOTHING HERE!", 
  actionText,
  onAction 
}) => {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const shadowColor = theme === "dark" ? "#fff" : "#000";

  return (
    <div className={`w-screen h-screen flex items-center justify-center p-4 ${bgColor}`}>
      <motion.div
        className={`flex flex-col items-center justify-center text-center relative border-4 rounded-2xl shadow-comic max-w-md w-full p-8`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        style={{
          boxShadow: `8px 8px 0px 0px ${shadowColor}`,
        }}
      >
        {/* Comic burst corner effect */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full border-4 border-black opacity-80 rotate-12"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-red-400 rounded-full border-4 border-black opacity-80 rotate-12"></div>

        {/* Message */}
        <motion.p
          className={`text-2xl font-bold mb-6 relative ${textColor}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            textShadow: "3px 3px 0px rgba(0,0,0,0.2)"
          }}
        >
          {message}
          <span className="absolute -top-3 -right-4 text-3xl">💥</span>
        </motion.p>

        {/* Optional action button */}
        {actionText && onAction && (
          <motion.button
            onClick={onAction}
            className="mt-4 px-6 py-2 bg-yellow-400 border-4 border-black rounded-xl font-bold text-lg shadow-comic hover:bg-yellow-300 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: `5px 5px 0px 0px ${shadowColor}`
            }}
          >
            {actionText.toUpperCase()}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default EmptyState;
