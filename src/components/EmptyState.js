import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * EmptyState component displays a user-friendly message and call-to-action 
 * when there is no content to display
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The main title for the empty state
 * @param {string} props.message - The descriptive message explaining the empty state
 * @param {string} props.actionText - Text for the call-to-action button
 * @param {string} props.actionLink - Link for the call-to-action button
 * @param {string} props.type - Type of empty state ("empty", "error", "success")
 * @returns {JSX.Element} The EmptyState component
 */
const EmptyState = ({ 
  title = "No Content Found", 
  message = "There's nothing to display here at the moment.", 
  actionText = "Go Back", 
  actionLink = "/", 
  type = "empty" 
}) => {
  const icons = {
    empty: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <motion.div 
      className="w-full py-12 px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        {icons[type]}
      </motion.div>
      
      <h2 className="text-2xl font-bold text-secondary-700 dark:text-secondary-200 mb-2">
        {title}
      </h2>
      
      <p className="text-secondary-500 dark:text-secondary-400 max-w-md mb-8">
        {message}
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={actionLink}
          className="btn-primary"
          aria-label={actionText}
        >
          {actionText}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
