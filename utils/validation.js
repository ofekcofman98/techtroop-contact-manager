// Pure field validators. No I/O, no printing — each throws a ValidationError
// whose message is the exact text to show the user, or returns nothing on success.

const { ValidationError } = require('./errors');

function validateName(name) {
    if (typeof name !== 'string' || name.trim() === '') {
        throw new ValidationError('Name is required');
    }
}

function validateEmail(email) {
    if (typeof email !== 'string' || !email.includes('@')) {
        throw new ValidationError('Email must contain @ symbol');
    }
}

function validatePhone(phone) {
    if (typeof phone !== 'string' || phone.trim() === '') {
        throw new ValidationError('Phone is required');
    }
}

// Validates a whole contact. Order matters only for which error surfaces first.
function validateContact(name, email, phone) {
    validateName(name);
    validateEmail(email);
    validatePhone(phone);
}

module.exports = { validateName, validateEmail, validatePhone, validateContact };
