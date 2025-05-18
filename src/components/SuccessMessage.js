import { motion } from "framer-motion";

/**
 * SuccessMessage component displays a celebratory message with confetti animation
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The main congratulatory title
 * @param {string} props.message - The descriptive message
 * @param {Function} props.onContinue - Function to call when continuing
 * @returns {JSX.Element} The SuccessMessage component
 */
const SuccessMessage = ({ 
  title = "Congratulations!", 
  message = "You've successfully completed this task.", 
  onContinue = () => {} 
}) => {
  // Confetti animation elements
  const confettiElements = Array(50).fill().map((_, i) => {
    const size = Math.random() * 10 + 5;
    const x = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;
    const color = [
      '#0ea5e9', // primary-500
      '#0284c7', // primary-600
      '#f97316', // orange-500
      '#84cc16', // lime-500
      '#8b5cf6', // violet-500
    ][Math.floor(Math.random() * 5)];
    
    return (
      <motion.div
        key={i}
        className="absolute top-0 rounded-full"
        style={{ 
          left: `${x}%`, 
          width: size, 
          height: size, 
          backgroundColor: color 
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: ['0%', '100%'],
          opacity: [0, 1, 0],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
    );
  });

  return (
    <motion.div 
      className="relative w-full p-8 overflow-hidden rounded-lg bg-white dark:bg-secondary-800 shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiElements}
      </div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>
      
      <h2 className="text-2xl font-bold text-secondary-800 dark:text-secondary-100 mb-3">
        {title}
      </h2>
      
      <p className="text-secondary-600 dark:text-secondary-300 mb-8 max-w-md mx-auto">
        {message}
      </p>
      
      <motion.button
        className="btn-primary"
        onClick={onContinue}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Continue"
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

export default SuccessMessage;
