describe('Input Validation Tests', () => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

  describe('Email Validation', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.user@domain.org',
        'admin@company.co',
        'user123@test.net'
      ];

      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid',
        'missing@domain',
        '@nodomain.com',
        'spaces in@email.com',
        ''
      ];

      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('Password Validation', () => {
    it('should accept strong passwords', () => {
      const validPasswords = [
        'Test@1234',
        'Secure!Pass1',
        'MyP@ssw0rd',
        'Complex$123'
      ];

      validPasswords.forEach(password => {
        expect(passwordRegex.test(password)).toBe(true);
      });
    });

    it('should reject weak passwords', () => {
      const invalidPasswords = [
        'weakpassword',
        'ALLUPPERCASE1!',
        'NoNumbers!abc',
        'NoSpecial123Abc'
      ];

      invalidPasswords.forEach(password => {
        expect(passwordRegex.test(password)).toBe(false);
      });
    });
  });

  describe('Full Name Validation', () => {
    it('should validate full name length', () => {
      const validateFullName = (name) => {
        if (!name) return false;
        return name.length >= 2 && name.length <= 100;
      };

      expect(validateFullName('Jo')).toBe(true);
      expect(validateFullName('John Doe')).toBe(true);
      expect(validateFullName('A')).toBe(false);
      expect(validateFullName('')).toBe(false);
      expect(validateFullName(null)).toBe(false);
      expect(validateFullName('A'.repeat(101))).toBe(false);
    });
  });

  describe('Role Validation', () => {
    it('should only accept valid roles', () => {
      const validateRole = (role) => ['admin', 'user'].includes(role);

      expect(validateRole('admin')).toBe(true);
      expect(validateRole('user')).toBe(true);
      expect(validateRole('moderator')).toBe(false);
      expect(validateRole('')).toBe(false);
    });
  });

  describe('Status Validation', () => {
    it('should only accept valid statuses', () => {
      const validateStatus = (status) => ['active', 'inactive'].includes(status);

      expect(validateStatus('active')).toBe(true);
      expect(validateStatus('inactive')).toBe(true);
      expect(validateStatus('pending')).toBe(false);
      expect(validateStatus('blocked')).toBe(false);
    });
  });
});
