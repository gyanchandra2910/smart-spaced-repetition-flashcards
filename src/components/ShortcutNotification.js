import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

/**
 * Component to display temporary notifications for keyboard shortcuts
 *
 * @param {Object} props - Component props
 * @param {string} props.message - Message to display
 * @param {boolean} props.show - Whether to show the notification
 * @param {function} props.onClose - Function to call when notification closes
 * @returns {JSX.Element} The ShortcutNotification component
 */
const ShortcutNotification = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-2 rounded-lg shadow-lg"
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShortcutNotification;
