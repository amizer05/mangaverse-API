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

