const { AppError, ValidationError, ContactError } = require('../../utils/errors');

describe('error classes', () => {
    it('AppError extends Error', () => {
        const err = new AppError('boom');
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('boom');
    });

    it('ValidationError extends AppError and Error', () => {
        const err = new ValidationError('bad input');
        expect(err).toBeInstanceOf(ValidationError);
        expect(err).toBeInstanceOf(AppError);
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('bad input');
    });

    it('ContactError extends AppError and Error', () => {
        const err = new ContactError('not found');
        expect(err).toBeInstanceOf(ContactError);
        expect(err).toBeInstanceOf(AppError);
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('not found');
    });

    it('ValidationError and ContactError are distinct types', () => {
        expect(new ValidationError('x')).not.toBeInstanceOf(ContactError);
        expect(new ContactError('x')).not.toBeInstanceOf(ValidationError);
    });
});
