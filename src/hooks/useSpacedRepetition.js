import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to manage spaced repetition flashcards
 *
 * @param {Array} initialCards - Initial array of flashcard objects
 * @returns {Object} - Methods and state for managing flashcard reviews
 */
export const useSpacedRepetition = (initialCards = []) => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [reviewData, setReviewData] = useState({
    cards: [],
    reviews: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Initialize new cards with SRS metadata
   */
  const initializeNewCards = useCallback(() => {
    // Initialize new cards with SRS metadata
    const initializedCards = initialCards.map((card) => ({
      ...card,
      interval: 0, // Time interval in days
      easeFactor: 2.5, // Ease factor (multiplier for intervals)
      reviewCount: 0, // Number of times reviewed
      lastReviewedAt: null, // Timestamp of last review
      nextReviewAt: Date.now(), // Timestamp for next review
      created: Date.now(), // Creation timestamp
    }));

    setCards(initializedCards);
    setReviewData({
      cards: initializedCards,
      reviews: [],
    });
  }, [initialCards]);

  /**
   * Select the next card for review based on scheduling
   */  const selectNextCard = useCallback(() => {
    const now = Date.now();

    // Sort cards by their nextReviewAt time
    const sortedCards = [...cards].sort((a, b) => {
      // If a card is due for review, prioritize it
      if (a.nextReviewAt <= now && b.nextReviewAt > now) {
        return -1;
      }
      if (b.nextReviewAt <= now && a.nextReviewAt > now) {
        return 1;
      }
      // Otherwise sort by nextReviewAt time
      return a.nextReviewAt - b.nextReviewAt;
    });

    // Select the card with the earliest review time
    setCurrentCard(sortedCards[0] || null);
  }, [cards]);

  /**
   * Update a card in the cards array
   */
  const updateCard = useCallback((updatedCard) => {
    setCards((currentCards) => {
      const updatedCards = currentCards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );

      // Update reviewData after updating cards
      setReviewData((prev) => ({
        ...prev,
        cards: updatedCards,
      }));

      return updatedCards;
    });
  }, []);

  /**
   * Add a review record
   */
  const addReview = useCallback((cardId, known) => {
    const review = {
      id: Math.random().toString(36).substring(2, 9),
      cardId,
      known,
      timestamp: Date.now(),
    };

    setReviewData((prev) => ({
      ...prev,
      reviews: [...(prev.reviews || []), review],
    }));
  }, []);
  
  /**
   * Mark the current card as known and reschedule it
   */
  const markAsKnown = useCallback(() => {
    if (!currentCard) return;

    const now = Date.now();

    // Update card scheduling using spaced repetition algorithm
    const updatedCard = { ...currentCard };

    // If this is the first review or it was forgotten last time
    if (updatedCard.interval === 0) {
      updatedCard.interval = 1; // First interval: 1 day
    } else {
      // Increase interval using the SM-2 algorithm formula
      updatedCard.interval = Math.round(
        updatedCard.interval * updatedCard.easeFactor
      );
    }

    // Increase ease factor slightly since the card was remembered
    updatedCard.easeFactor = Math.min(updatedCard.easeFactor + 0.1, 2.5);

    // Update review metadata
    updatedCard.reviewCount += 1;
    updatedCard.lastReviewedAt = now;
    updatedCard.nextReviewAt = now + updatedCard.interval * 24 * 60 * 60 * 1000; // Convert days to ms

    // Update the card in the cards array
    updateCard(updatedCard);

    // Record the review
    addReview(updatedCard.id, true);

    // Select the next card
    selectNextCard();
  }, [currentCard, updateCard, addReview, selectNextCard]);
  /**
   * Mark the current card as not known and reschedule it
   */
  const markAsNotKnown = useCallback(() => {
    if (!currentCard) return;

    const now = Date.now();

    // Update card scheduling using spaced repetition algorithm
    const updatedCard = { ...currentCard };

    // Reset interval for cards that were not remembered
    updatedCard.interval = 0; // Reset to be reviewed again soon

    // Decrease ease factor since the card was not remembered
    updatedCard.easeFactor = Math.max(updatedCard.easeFactor - 0.2, 1.3);

    // Update review metadata
    updatedCard.reviewCount += 1;
    updatedCard.lastReviewedAt = now;
    updatedCard.nextReviewAt = now + 1 * 60 * 60 * 1000; // Review again in 1 hour (in ms)

    // Update the card in the cards array
    updateCard(updatedCard);

    // Record the review
    addReview(updatedCard.id, false);

    // Select the next card
    selectNextCard();  }, [currentCard, updateCard, addReview, selectNextCard]);
  
  /**
   * Add a new card to the deck
   */
  const addCard = (card) => {
    const newCard = {
      id: Math.random().toString(36).substring(2, 9),
      question: card.question,
      answer: card.answer,
      interval: 0,
      easeFactor: 2.5,
      reviewCount: 0,
      lastReviewedAt: null,
      nextReviewAt: Date.now(),
      created: Date.now(),
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    setReviewData((prev) => ({
      ...prev,
      cards: updatedCards,
    }));
  };

  /**
   * Remove a card from the deck
   */
  const removeCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
    setReviewData((prev) => ({
      ...prev,
      cards: updatedCards,
    }));
  };

  /**
   * Import cards from a JSON file
   */
  const importCards = (importedData) => {
    try {
      // Preserve existing reviews
      const existingReviews = reviewData.reviews || [];

      // If importing full data with reviews
      if (importedData.cards && Array.isArray(importedData.cards)) {
        // Make sure imported cards have all required properties
        const processedCards = importedData.cards.map((card) => ({
          id: card.id || Math.random().toString(36).substring(2, 9),
          question: card.question,
          answer: card.answer,
          interval: card.interval || 0,
          easeFactor: card.easeFactor || 2.5,
          reviewCount: card.reviewCount || 0,
          lastReviewedAt: card.lastReviewedAt || null,
          nextReviewAt: card.nextReviewAt || Date.now(),
          created: card.created || Date.now(),
        }));

        setCards(processedCards);

        // Merge reviews if they exist in import
        const importedReviews = importedData.reviews || [];
        const mergedReviews = [...existingReviews, ...importedReviews];

        setReviewData({
          cards: processedCards,
          reviews: mergedReviews,
        });
      }
      // If importing just an array of cards without metadata
      else if (Array.isArray(importedData)) {
        const processedCards = importedData.map((card) => ({
          id: Math.random().toString(36).substring(2, 9),
          question: card.question,
          answer: card.answer,
          interval: 0,
          easeFactor: 2.5,
          reviewCount: 0,
          lastReviewedAt: null,
          nextReviewAt: Date.now(),
          created: Date.now(),
        }));

        setCards(processedCards);
        setReviewData({
          cards: processedCards,
          reviews: existingReviews,
        });
      }

      return true;
    } catch (error) {
      console.error("Error importing cards:", error);
      return false;
    }
  };
  /**
   * Export all card data to JSON
   */
  const exportCards = () => {
    return reviewData;
  };
  /**
   * Get card due counts for different time periods
   */
  const getDueCounts = useCallback(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const dueNow = cards.filter((card) => card.nextReviewAt <= now).length;
    const dueToday = cards.filter(
      (card) => card.nextReviewAt > now && card.nextReviewAt <= now + day
    ).length;
    const dueTomorrow = cards.filter(
      (card) =>
        card.nextReviewAt > now + day && card.nextReviewAt <= now + 2 * day
    ).length;
    const dueThisWeek = cards.filter(
      (card) =>
        card.nextReviewAt > now + 2 * day && card.nextReviewAt <= now + 7 * day
    ).length;

    return {
      dueNow,
      dueToday,
      dueTomorrow,
      dueThisWeek,
      total: cards.length,
    };
  }, [cards]);

  // Load data from localStorage on initial mount only
  useEffect(() => {
    let isMounted = true;

    const loadData = () => {
      const savedData = localStorage.getItem("flashcard-data");

      if (!isMounted) return;

      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);

          // Initialize cards from saved data or use initial cards
          if (parsedData.cards && parsedData.cards.length > 0) {
            setCards(parsedData.cards);
            setReviewData(parsedData);
          } else if (initialCards.length > 0) {
            initializeNewCards();
          }
        } catch (error) {
          console.error("Error loading flashcard data:", error);
          if (initialCards.length > 0) {
            initializeNewCards();
          }
        }
      } else if (initialCards.length > 0) {
        initializeNewCards();
      }

      if (isMounted) {
        setIsLoaded(true);
      }
    };

    loadData();

    // Cleanup function to prevent setting state on unmounted component
    return () => {
      isMounted = false;
    };
    // This effect should only run once on mount, hence the empty dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  // Save data to localStorage whenever it changes
  useEffect(() => {
    // Only save if we've finished loading initial data
    // and we have a meaningful change to save
    if (isLoaded && reviewData.cards && reviewData.cards.length > 0) {
      // Use a ref to keep track of previous state to avoid unnecessary saves
      const dataToSave = JSON.stringify(reviewData);
      localStorage.setItem("flashcard-data", dataToSave);
    }
  }, [reviewData, isLoaded]);

  // Select next card for review
  useEffect(() => {
    if (cards.length > 0) {
      selectNextCard();
    } else {
      setCurrentCard(null);
    }
  }, [cards, selectNextCard]);

  return {
    cards,
    currentCard,
    reviewData,
    markAsKnown,
    markAsNotKnown,
    addCard,
    removeCard,
    importCards,
    exportCards,
    getDueCounts,
  };
};

export default useSpacedRepetition;
