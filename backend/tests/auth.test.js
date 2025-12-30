const jwt = require('jsonwebtoken');

const JWT_SECRET = 'test_secret_key';
const JWT_EXPIRES_IN = '7d';

describe('Authentication Tests', () => {
  describe('JWT Token Generation', () => {
    it('should generate a valid JWT token', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });

    it('should verify a valid JWT token', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      
      const decoded = jwt.verify(token, JWT_SECRET);
      expect(decoded.id).toBe(userId);
    });

    it('should reject an invalid JWT token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => {
        jwt.verify(invalidToken, JWT_SECRET);
      }).toThrow();
    });

    it('should reject token with wrong secret', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      
      expect(() => {
        jwt.verify(token, 'wrong_secret');
      }).toThrow();
    });
  });

  describe('Token Expiration', () => {
    it('should create token with expiration', () => {
      const userId = '507f1f77bcf86cd799439011';
      const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1s' });
      
      const decoded = jwt.decode(token);
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(decoded.iat);
    });
  });
});
