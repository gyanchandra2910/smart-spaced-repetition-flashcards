import { useState, useRef } from "react";
import { motion } from "framer-motion";

const Flashcard = ({ card, onKnow, onDontKnow }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const cardRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
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
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleFlip();
        }
      }}
      aria-label={
        isFlipped ? "Card back" : "Card front. Press Enter or Space to flip"
      }
    >
      <motion.div
        ref={cardRef}
        className="card-glass w-full h-full perspective-1000 cursor-pointer"
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
            <h2 className="text-xl font-semibold text-center">
              {card.question}
            </h2>
          </div>

          {/* Back of Card */}
          <div
            className="absolute w-full h-full backface-hidden p-6 flex flex-col justify-center items-center"
            style={{ transform: "rotateY(180deg)" }}
          >
            <p className="text-lg text-center">{card.answer}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Interaction hint */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-secondary-500 dark:text-secondary-400">
        Tap to flip • Swipe left/right to mark
      </div>
    </div>
  );
};

export default Flashcard;
