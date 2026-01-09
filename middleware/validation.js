<<<<<<< HEAD
import { body, validationResult, query } from 'express-validator';

/**
 * Handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Manga validation rules
 */
export const validateManga = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must be max 255 characters')
    .matches(/^[^0-9]+$/).withMessage('Title cannot contain numbers'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 255 }).withMessage('Description must be max 255 characters'),
  
  body('release_date')
    .notEmpty().withMessage('Release date is required')
    .isISO8601().withMessage('Release date must be in YYYY-MM-DD format')
    .custom((value) => {
      const releaseDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (releaseDate > today) {
        throw new Error('Release date cannot be in the future');
      }
      return true;
    }),
  
  body('cover_image')
    .optional()
    .isURL().withMessage('Cover image must be a valid URL'),
  
  body('slug')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Slug must be max 255 characters'),
  
  handleValidationErrors
];

/**
 * News validation rules
 */
export const validateNews = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must be max 255 characters'),
  
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 20 }).withMessage('Content must be at least 20 characters'),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['action', 'romance', 'comedy', 'drama']).withMessage('Category must be one of: action, romance, comedy, drama'),
  
  body('manga_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Manga ID must be a positive integer'),
  
  handleValidationErrors
];

/**
 * Query parameter validation for pagination
 */
export const validatePagination = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  query('offset')
    .optional()
    .isInt({ min: 0 }).withMessage('Offset must be a non-negative integer'),
  
  query('sort')
    .optional()
    .isIn(['title', 'release_date', 'created_at']).withMessage('Sort must be one of: title, release_date, created_at'),
  
  query('order')
    .optional()
    .isIn(['asc', 'desc']).withMessage('Order must be asc or desc'),
  
  handleValidationErrors
];

=======
// Basisvalidatie functies

export const validateNotEmpty = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    throw new Error(`${fieldName} mag niet leeg zijn`);
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Ongeldig e-mailadres formaat');
  }
};

export const validateName = (name, fieldName) => {
  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
    throw new Error(`${fieldName} mag alleen letters, spaties, apostrofen en streepjes bevatten`);
  }
};

export const validateNumeric = (value, fieldName) => {
  if (isNaN(value) || value === null || value === undefined) {
    throw new Error(`${fieldName} moet een numerieke waarde zijn`);
  }
};

export const validatePhone = (phone) => {
  // Formaat: +32 XXX XX XX XX (bijv. +32 444 44 44 44)
  // Verwijder alle spaties en controleer het patroon
  const digitsOnly = phone.replace(/\s/g, '');
  // Regex: +32 gevolgd door exact 9 cijfers
  const phoneRegex = /^\+32\d{9}$/;
  if (digitsOnly && !phoneRegex.test(digitsOnly)) {
    throw new Error('Telefoonnummer moet formaat +32 XXX XX XX XX hebben (bijv. +32 444 44 44 44)');
  }
};

export const validateDateRange = (startDate, endDate) => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      throw new Error('Einddatum moet na startdatum liggen');
    }
  }
};

export const validateLength = (value, min, max, fieldName) => {
  if (value.length < min || value.length > max) {
    throw new Error(`${fieldName} moet tussen ${min} en ${max} karakters zijn`);
  }
};

// Middleware voor error handling
export const handleValidationError = (error, req, res, next) => {
  if (error.message.includes('mag niet leeg zijn') || 
      error.message.includes('moet een numerieke waarde zijn') ||
      error.message.includes('mag alleen letters') ||
      error.message.includes('moet formaat') ||
      error.message.includes('Einddatum moet') ||
      error.message.includes('tussen') ||
      error.message.includes('Ongeldig')) {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};
>>>>>>> 59775988cc5591501086a0950bf39b14e17599d8

