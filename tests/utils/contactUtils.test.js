const {
    emailExists,
    findIndexByEmail,
    filterByQuery
} = require('../../utils/contactUtils');

const contacts = [
    { name: 'John Doe', email: 'john@example.com', phone: '555-1111' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '555-2222' },
    { name: 'Bob Jones', email: 'bob@work.org', phone: '555-3333' }
];

describe('emailExists', () => {
    it('returns true for a matching email', () => {
        expect(emailExists(contacts, 'jane@example.com')).toBe(true);
    });

    it('matches case-insensitively', () => {
        expect(emailExists(contacts, 'JANE@EXAMPLE.COM')).toBe(true);
    });

    it('returns false when no email matches', () => {
        expect(emailExists(contacts, 'nobody@example.com')).toBe(false);
    });

    it('returns false for an empty list', () => {
        expect(emailExists([], 'john@example.com')).toBe(false);
    });
});

describe('findIndexByEmail', () => {
    it('returns the index of a matching email', () => {
        expect(findIndexByEmail(contacts, 'bob@work.org')).toBe(2);
    });

    it('matches case-insensitively', () => {
        expect(findIndexByEmail(contacts, 'John@Example.com')).toBe(0);
    });

    it('returns -1 when no email matches', () => {
        expect(findIndexByEmail(contacts, 'nobody@example.com')).toBe(-1);
    });
});

describe('filterByQuery', () => {
    it('matches by name (case-insensitive, partial)', () => {
        const result = filterByQuery(contacts, 'jane');
        expect(result).toEqual([contacts[1]]);
    });

    it('matches by email (case-insensitive, partial)', () => {
        const result = filterByQuery(contacts, 'WORK.ORG');
        expect(result).toEqual([contacts[2]]);
    });

    it('returns multiple matches', () => {
        // "example" appears in two emails.
        const result = filterByQuery(contacts, 'example');
        expect(result).toEqual([contacts[0], contacts[1]]);
    });

    it('returns an empty array when nothing matches', () => {
        expect(filterByQuery(contacts, 'zzz')).toEqual([]);
    });

    it('does not mutate the source list', () => {
        const copy = [...contacts];
        filterByQuery(contacts, 'jane');
        expect(contacts).toEqual(copy);
    });
});
