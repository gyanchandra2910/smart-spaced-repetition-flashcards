import { validateImportedData, generateUniqueId, prepareDataForExport } from '../utils/dataValidation';

describe('Data Validation Utils', () => {
  describe('validateImportedData', () => {
    test('validates a correctly formatted data object', () => {
      const mockData = {
        cards: [
          {
            id: '1',
            question: 'Test Question',
            answer: 'Test Answer',
            nextReview: new Date().toISOString(),
            interval: 1,
            ease: 2.5,
            reviews: 5,
            lapses: 0
          }
        ],
        stats: {
          totalReviews: 10,
          correctReviews: 8
        },
        reviewHistory: [
          {
            cardId: '1',
            reviewedAt: new Date().toISOString(),
            wasCorrect: true
          }
        ]
      };
      
      const result = validateImportedData(mockData);
      
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
      expect(result.warnings.length).toBe(0);
      expect(result.cards.length).toBe(1);
    });
    
    test('returns errors for invalid data format', () => {
      const result = validateImportedData('not an object');
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
    
    test('returns errors for missing cards array', () => {
      const result = validateImportedData({});
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
    
    test('adds warnings for cards missing IDs', () => {
      const mockData = {
        cards: [
          {
            question: 'Test Question',
            answer: 'Test Answer'
          }
        ]
      };
      
      const result = validateImportedData(mockData);
      
      expect(result.isValid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.cards[0].id).toBeDefined();
    });
    
    test('returns errors for cards with missing required fields', () => {
      const mockData = {
        cards: [
          {
            id: '1',
            // Missing question and answer
          }
        ]
      };
      
      const result = validateImportedData(mockData);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
  
  describe('generateUniqueId', () => {
    test('generates a string ID', () => {
      const id = generateUniqueId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(5);
    });
    
    test('generates unique IDs', () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).not.toBe(id2);
    });
  });
  
  describe('prepareDataForExport', () => {
    test('formats data correctly for export', () => {
      const mockData = {
        cards: [{ id: '1', question: 'Q', answer: 'A' }],
        stats: { totalReviews: 10 },
        reviewHistory: [{ cardId: '1', wasCorrect: true }]
      };
      
      const result = prepareDataForExport(mockData);
      
      expect(result.cards).toEqual(mockData.cards);
      expect(result.stats).toEqual(mockData.stats);
      expect(result.reviewHistory).toEqual(mockData.reviewHistory);
      expect(result.exportDate).toBeDefined();
      expect(result.version).toBeDefined();
    });
    
    test('handles missing optional data', () => {
      const mockData = {
        cards: [{ id: '1', question: 'Q', answer: 'A' }],
        // Missing stats and reviewHistory
      };
      
      const result = prepareDataForExport(mockData);
      
      expect(result.cards).toEqual(mockData.cards);
      expect(result.stats).toEqual({});
      expect(result.reviewHistory).toEqual([]);
    });
  });
});
