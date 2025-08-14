"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/app/providers";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = "KABOOM! SOMETHING WENT WRONG!",
  onRetry
}) => {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-red-700";
  const shadowColor = theme === "dark" ? "#fff" : "#000";

  return (
    <div className={`w-screen h-screen flex items-center justify-center p-4 ${bgColor}`}>
      <motion.div
        className="relative p-8 border-4 rounded-xl shadow-comic max-w-md w-full flex flex-col items-center justify-center text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          boxShadow: `8px 8px 0px 0px ${shadowColor}`,
          backgroundImage: theme === "dark"
            ? "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 100%)"
            : "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.8) 0%, rgba(255,200,200,0.9) 100%)"
        }}
      >
        {/* Comic burst background */}
        <div className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/comic-explosion.png')] bg-contain bg-center bg-no-repeat opacity-20 pointer-events-none"></div>

        {/* Danger icon with animation */}
        <motion.div
          className="text-6xl mb-6 flex justify-center"
          animate={{
            rotate: [0, -15, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          ☠️
        </motion.div>

        {/* Zap animation elements */}
        <div className="absolute top-4 left-4 text-yellow-400 text-2xl">⚡</div>
        <div className="absolute bottom-4 right-4 text-yellow-400 text-2xl">⚡</div>

        {/* Error message */}
        <motion.p
          className={`text-2xl font-bold mb-6 relative ${textColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
          <span className="absolute -top-4 -right-6 text-4xl">💥</span>
        </motion.p>

        {/* Retry button */}
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="px-8 py-3 bg-red-600 border-4 border-black rounded-xl font-bold text-lg shadow-comic-lg hover:bg-red-700 transition-colors relative overflow-hidden group"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: `5px 5px 0px 0px ${shadowColor}`
            }}
          >
            <span className="relative z-10">RETRY</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
              initial={{ x: -100 }}
              whileHover={{ x: 100 }}
              transition={{ duration: 0.7 }}
            />
          </motion.button>
        )}

        {/* Comic sound effect decorations */}
        <div className="absolute -top-6 left-1/4 text-3xl font-bold rotate-12 opacity-80 text-red-600 dark:text-red-400">
          CRASH!
        </div>
        <div className="absolute -bottom-6 right-1/4 text-3xl font-bold rotate-12 opacity-80 text-yellow-500 dark:text-yellow-300">
          BANG!
        </div>

      </motion.div>
    </div>
  );
};

export default ErrorState;
