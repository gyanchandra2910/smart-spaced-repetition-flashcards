import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Flashcard from "../components/Flashcard";
import ReviewButtons from "../components/ReviewButtons";
import useSpacedRepetition from "../hooks/useSpacedRepetition";

const motivationalQuotes = [
  "The more you study, the more you know. The more you know, the more you forget. The more you forget, the less you know. So why study?",
  "The best way to predict your future is to create it.",
  "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
  "The expert in anything was once a beginner.",
  "What you learn becomes a part of who you are.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Education is not the filling of a pail, but the lighting of a fire.",
  "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "The goal of education is not to increase the amount of knowledge but to create the possibilities for a child to invent and discover.",
];

const StudyPage = () => {
  const { currentCard, markAsKnown, markAsNotKnown, getDueCounts } =
    useSpacedRepetition(
      // Example initial cards if none exist in storage
      [
        {
          id: "1",
          question: "What is spaced repetition?",
          answer:
            "A learning technique that incorporates increasing intervals of time between reviews of previously learned material.",
        },
        {
          id: "2",
          question: "What is the forgetting curve?",
          answer:
            "A hypothesis about the decline of memory retention over time, formulated by Hermann Ebbinghaus.",
        },
        {
          id: "3",
          question: "Who developed the first spaced repetition system?",
          answer:
            "Piotr Woźniak developed SuperMemo, one of the first spaced repetition software programs, in the 1980s.",
        },
      ]
    );

  const [dueCounts, setDueCounts] = useState({ dueNow: 0, total: 0 });
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setDueCounts(getDueCounts());
    setQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    );
  }, [currentCard]);

  const handleKnow = () => {
    markAsKnown();
  };

  const handleDontKnow = () => {
    markAsNotKnown();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-800 dark:text-secondary-100 mb-2">
            Flashcard Review
          </h1>

          <p className="text-secondary-600 dark:text-secondary-300">
            {currentCard
              ? `Card ${dueCounts.dueNow} of ${dueCounts.total} due now`
              : `No cards due for review! Total cards: ${dueCounts.total}`}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {currentCard ? (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Flashcard
                card={currentCard}
                onKnow={handleKnow}
                onDontKnow={handleDontKnow}
              />

              <ReviewButtons onKnow={handleKnow} onDontKnow={handleDontKnow} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full card-glass p-6 text-center"
            >
              <h2 className="text-xl font-semibold mb-4">All caught up!</h2>
              <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                You've completed all your reviews for now.
              </p>

              <div className="my-6 p-4 bg-primary-50 dark:bg-primary-900 rounded-lg italic text-secondary-700 dark:text-secondary-300">
                "{quote}"
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
                <div className="card-neu p-4">
                  <h3 className="font-medium mb-2">Upcoming Reviews</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Later today:</span>
                      <span className="font-semibold">
                        {dueCounts.dueToday || 0}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tomorrow:</span>
                      <span className="font-semibold">
                        {dueCounts.dueTomorrow || 0}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>This week:</span>
                      <span className="font-semibold">
                        {dueCounts.dueThisWeek || 0}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="card-neu p-4">
                  <h3 className="font-medium mb-2">Study Tips</h3>
                  <ul className="space-y-2 text-left">
                    <li>• Review cards at the same time each day</li>
                    <li>• Keep sessions short but frequent</li>
                    <li>• Try to create mental connections</li>
                    <li>• Add new cards regularly</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudyPage;
