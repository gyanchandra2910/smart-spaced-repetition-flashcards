import { motion } from "framer-motion";

/**
 * ReviewButtons component displays buttons for rating flashcards during review
 *
 * @param {Object} props - Component props
 * @param {Function} props.onKnow - Function to call when "Know" button is clicked
 * @param {Function} props.onDontKnow - Function to call when "Don't Know" button is clicked
 * @returns {JSX.Element} The ReviewButtons component
 */
const ReviewButtons = ({ onKnow, onDontKnow }) => {
  return (
    <div className="flex justify-center gap-6 py-4 mt-4 w-full max-w-md mx-auto review-buttons">
      <motion.button
        className="btn-secondary flex-1 flex items-center justify-center"
        onClick={onDontKnow}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Don't know"
        title="Mark as 'Don't Know' (ArrowLeft)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        Don't Know
      </motion.button>

      <motion.button
        className="btn-primary flex-1 flex items-center justify-center"
        onClick={onKnow}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Know"
        title="Mark as 'Know' (ArrowRight)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        Know
      </motion.button>
    </div>
  );
};

export default ReviewButtons;
