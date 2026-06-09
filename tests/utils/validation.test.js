const {
    validateName,
    validateEmail,
    validatePhone,
    validateContact
} = require('../../utils/validation');
const { ValidationError } = require('../../utils/errors');

describe('validateName', () => {
    it('accepts a non-empty string', () => {
        expect(() => validateName('John Doe')).not.toThrow();
    });

    it.each([
        ['empty string', ''],
        ['whitespace only', '   '],
        ['non-string (number)', 42],
        ['non-string (undefined)', undefined],
        ['non-string (null)', null]
    ])('rejects %s with "Name is required"', (_label, value) => {
        expect(() => validateName(value)).toThrow(ValidationError);
        expect(() => validateName(value)).toThrow('Name is required');
    });
});

describe('validateEmail', () => {
    it('accepts a string containing @', () => {
        expect(() => validateEmail('john@example.com')).not.toThrow();
    });

    it.each([
        ['missing @', 'johnexample.com'],
        ['empty string', ''],
        ['non-string (number)', 42],
        ['non-string (undefined)', undefined]
    ])('rejects %s with "Email must contain @ symbol"', (_label, value) => {
        expect(() => validateEmail(value)).toThrow(ValidationError);
        expect(() => validateEmail(value)).toThrow('Email must contain @ symbol');
    });
});

describe('validatePhone', () => {
    it('accepts a non-empty string', () => {
        expect(() => validatePhone('555-123-4567')).not.toThrow();
    });

    it.each([
        ['empty string', ''],
        ['whitespace only', '   '],
        ['non-string (number)', 5551234567],
        ['non-string (null)', null]
    ])('rejects %s with "Phone is required"', (_label, value) => {
        expect(() => validatePhone(value)).toThrow(ValidationError);
        expect(() => validatePhone(value)).toThrow('Phone is required');
    });
});

describe('validateContact', () => {
    it('passes when all fields are valid', () => {
        expect(() =>
            validateContact('John Doe', 'john@example.com', '555-123-4567')
        ).not.toThrow();
    });

    it('surfaces the name error first', () => {
        expect(() => validateContact('', 'bad-email', ''))
            .toThrow('Name is required');
    });

    it('surfaces the email error when the name is valid', () => {
        expect(() => validateContact('John', 'bad-email', ''))
            .toThrow('Email must contain @ symbol');
    });

    it('surfaces the phone error when name and email are valid', () => {
        expect(() => validateContact('John', 'john@example.com', ''))
            .toThrow('Phone is required');
    });
});
