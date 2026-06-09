// Custom error types. Each carries the exact message to display; the command
// layer adds the "✗ Error: " prefix. The shared AppError base lets callers
// distinguish expected, user-facing errors from unexpected programmer bugs.

class AppError extends Error {}

// Bad input: invalid email, missing field, duplicate email.
class ValidationError extends AppError {}

// A requested contact does not exist (e.g. delete by unknown email).
class ContactError extends AppError {}

module.exports = { AppError, ValidationError, ContactError };
