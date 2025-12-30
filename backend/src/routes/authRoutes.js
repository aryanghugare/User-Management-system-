const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getMe,
  logout,
  updateProfile,
  changePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  signupValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation
} = require('../validators/authValidators');

router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/profile', protect, updateProfileValidation, validate, updateProfile);
router.put('/change-password', protect, changePasswordValidation, validate, changePassword);

module.exports = router;
