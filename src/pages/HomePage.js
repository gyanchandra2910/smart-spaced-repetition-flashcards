import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useSpacedRepetition from "../hooks/useSpacedRepetition";

const HomePage = () => {
  const navigate = useNavigate();
  const { getDueCounts } = useSpacedRepetition();
  const [dueCounts, setDueCounts] = useState({ dueNow: 0, total: 0 });
  
  useEffect(() => {
    setDueCounts(getDueCounts());
  }, [getDueCounts]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-800 dark:text-secondary-100">
          Smart Flashcards
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-md mx-auto">
          Boost your memory with spaced repetition
        </p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card-glass p-6 flex flex-col items-center text-center"
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Learn Efficiently</h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            Our algorithm optimizes when to show you cards, so you study less
            but remember more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-glass p-6 flex flex-col items-center text-center"
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Track Your Progress</h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            Visual analytics show your learning patterns and help you stay
            motivated.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-glass p-6 flex flex-col items-center text-center"
          whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Simple & Beautiful</h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">
            A carefully designed interface makes learning enjoyable and
            distraction-free.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full max-w-xl card-glass p-8 text-center mb-8"
      >        <h2 className="text-2xl font-bold mb-6">Ready to start learning?</h2>

        {dueCounts.total > 0 ? (
          <div>
            <p className="mb-4 text-lg">
              You have{" "}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                {dueCounts.dueNow} cards
              </span>{" "}
              due for review right now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary text-lg py-3 px-8"
                onClick={() => navigate("/study")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Reviewing
              </motion.button>
              <motion.button
                className="btn-secondary text-lg py-3 px-8"
                onClick={() => navigate("/dashboard")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Dashboard
              </motion.button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-lg">
              Get started by adding your first flashcards to the deck.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="btn-primary text-lg py-3 px-8"
                onClick={() => navigate("/dashboard")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Flashcards
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center text-secondary-500 dark:text-secondary-400 text-sm"
      >
        <p>Your progress is saved locally in your browser.</p>
        <p>Export your data regularly to avoid accidental data loss.</p>
      </motion.div>
    </div>
  );
};

export default HomePage;
