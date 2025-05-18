import { useState, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Flashcard component displays an interactive flashcard with question/answer sides
 * and supports flipping, swiping, and keyboard interaction
 *
 * @param {Object} props - Component props
 * @param {Object} props.card - The flashcard object containing question and answer
 * @param {Function} props.onKnow - Function to call when card is marked as known
 * @param {Function} props.onDontKnow - Function to call when card is marked as not known
 * @returns {JSX.Element} The Flashcard component
 */
const Flashcard = ({ card, onKnow, onDontKnow }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const cardRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    // Pass notification up to parent
    if (window.notifyKeyboardShortcut) {
      window.notifyKeyboardShortcut("flip");
    }
  };

  const handleDragStart = (e) => {
    setDragStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragEnd = (e) => {
    if (!dragStartX) return;

    const currentX = e.clientX || e.changedTouches[0].clientX;
    const difference = currentX - dragStartX;

    if (difference > 100) {
      // Swiped right - "Know"
      onKnow();
    } else if (difference < -100) {
      // Swiped left - "Don't Know"
      onDontKnow();
    }

    setDragStartX(null);
  };
  return (
    <div
      className="relative w-full max-w-md mx-auto h-64 select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // Prevent scrolling on space
          handleFlip();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault(); // Prevent scrolling on arrow keys
          if (window.notifyKeyboardShortcut) {
            window.notifyKeyboardShortcut("dontKnow");
          }
          onDontKnow();
        } else if (e.key === "ArrowRight") {
          e.preventDefault(); // Prevent scrolling on arrow keys
          if (window.notifyKeyboardShortcut) {
            window.notifyKeyboardShortcut("know");
          }
          onKnow();
        }
      }}
      aria-label={
        isFlipped
          ? "Card back. Press Enter or Space to flip, left arrow to mark as don't know, right arrow to mark as know"
          : "Card front. Press Enter or Space to flip, left arrow to mark as don't know, right arrow to mark as know"
      }
    >
      <motion.div
        ref={cardRef}
        className="card-glass w-full h-full perspective-1000 cursor-pointer flashcard-component"
        onClick={handleFlip}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        whileTap={{ scale: 0.98 }}
      >
        {" "}
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {/* Front of Card */}
          <div className="absolute w-full h-full backface-hidden p-6 flex flex-col justify-center items-center">
            <motion.h2
              className="text-xl font-semibold text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {card.question}
            </motion.h2>
          </div>

          {/* Back of Card */}
          <div
            className="absolute w-full h-full backface-hidden p-6 flex flex-col justify-center items-center"
            style={{ transform: "rotateY(180deg)" }}
          >
            {" "}
            <motion.p
              className="text-lg text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isFlipped ? 1 : 0,
                scale: isFlipped ? 1 : 0.8,
              }}
              transition={{ delay: 0.1, duration: 0.2 }}
              data-testid="card-answer"
            >
              {card.answer}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>{" "}
      {/* Interaction hint */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-secondary-500 dark:text-secondary-400">
        Tap to flip • Swipe left/right to mark • Use ←→ keys to rate
      </div>
    </div>
  );
};

export default Flashcard;
