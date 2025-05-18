/**
 * Utility functions for handling JSON data validation and processing
 */

/**
 * Validates flashcard data structure in imported JSON files
 * @param {Object} data - The parsed JSON data to validate
 * @returns {Object} Result object with validation status and messages
 */
export const validateImportedData = (data) => {
  // Initialize result object
  const result = {
    isValid: true,
    errors: [],
    warnings: [],
    cards: [],
    stats: null,
    reviewHistory: []
  };

  // Check if data exists and is an object
  if (!data || typeof data !== 'object') {
    result.isValid = false;
    result.errors.push('Invalid data format: Expected a JSON object');
    return result;
  }

  // Check for cards array
  if (!data.cards || !Array.isArray(data.cards)) {
    result.isValid = false;
    result.errors.push('Missing or invalid cards array');
    return result;
  }

  // Validate each card
  data.cards.forEach((card, index) => {
    if (!card.id) {
      result.warnings.push(`Card at index ${index} is missing an ID. A new ID will be generated.`);
      card.id = generateUniqueId();
    }

    if (!card.question || typeof card.question !== 'string') {
      result.errors.push(`Card at index ${index} has invalid or missing question`);
      result.isValid = false;
    }

    if (!card.answer || typeof card.answer !== 'string') {
      result.errors.push(`Card at index ${index} has invalid or missing answer`);
      result.isValid = false;
    }

    // Default scheduling data if missing
    if (!card.nextReview) {
      result.warnings.push(`Card at index ${index} is missing scheduling data. Setting default values.`);
      card.nextReview = new Date().toISOString();
      card.interval = 0;
      card.ease = 2.5;
      card.reviews = 0;
      card.lapses = 0;
    }
  });

  // Validate stats if present
  if (data.stats && typeof data.stats !== 'object') {
    result.warnings.push('Invalid stats object format. Using default stats.');
  } else if (data.stats) {
    result.stats = data.stats;
  }

  // Validate review history if present
  if (data.reviewHistory) {
    if (!Array.isArray(data.reviewHistory)) {
      result.warnings.push('Invalid review history format. Review history will be reset.');
    } else {
      result.reviewHistory = data.reviewHistory;
    }
  }

  // Return valid cards even if there are warnings
  if (result.isValid) {
    result.cards = data.cards;
  }

  return result;
};

/**
 * Generates a unique ID for new cards
 * @returns {string} A unique ID
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Sanitizes and prepares data for export
 * @param {Object} data - The data to sanitize for export
 * @returns {Object} Cleaned data ready for export
 */
export const prepareDataForExport = (data) => {
  const exportData = {
    cards: data.cards,
    stats: data.stats || {},
    reviewHistory: data.reviewHistory || [],
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };
    return exportData;
};

// Create a named export object
const dataValidationUtils = {
  validateImportedData,
  generateUniqueId,
  prepareDataForExport
};

export default dataValidationUtils;
