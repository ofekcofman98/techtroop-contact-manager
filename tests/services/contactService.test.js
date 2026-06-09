jest.mock('../../utils/fileUtils');
jest.mock('../../utils/ui');
jest.mock('../../utils/validation');

const { loadContacts, saveContacts } = require('../../utils/fileUtils');
const { validateContact } = require('../../utils/validation');
const ui = require('../../utils/ui');
const { ValidationError, ContactError } = require('../../utils/errors');
const contactService = require('../../services/contactService');

const FILE = 'contacts.json';
const sample = () => [
    { name: 'John Doe', email: 'john@example.com', phone: '555-1111' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '555-2222' }
];

// Helper: stub loadContacts to return a given list (existing file).
function withContacts(contacts, isNew = false) {
    loadContacts.mockReturnValue({ contacts, isNew });
}

describe('addContact', () => {
    it('validates, loads, appends, and saves a new contact', () => {
        const contacts = sample();
        withContacts(contacts);

        contactService.addContact('Bob Jones', 'bob@work.org', '555-3333');

        expect(validateContact).toHaveBeenCalledWith('Bob Jones', 'bob@work.org', '555-3333');
        expect(loadContacts).toHaveBeenCalledWith(FILE);
        expect(saveContacts).toHaveBeenCalledWith(FILE, contacts);
        expect(contacts).toContainEqual({ name: 'Bob Jones', email: 'bob@work.org', phone: '555-3333' });
        expect(ui.contactAdded).toHaveBeenCalledWith('Bob Jones');
        expect(ui.saved).toHaveBeenCalledWith(FILE);
    });

    it('throws ValidationError and does not save on a duplicate email (case-insensitive)', () => {
        const contacts = sample();
        withContacts(contacts);

        expect(() =>
            contactService.addContact('John Clone', 'JOHN@EXAMPLE.COM', '555-9999')
        ).toThrow(ValidationError);
        expect(() =>
            contactService.addContact('John Clone', 'JOHN@EXAMPLE.COM', '555-9999')
        ).toThrow('Contact with this email already exists');

        expect(saveContacts).not.toHaveBeenCalled();
    });

    it('propagates validation failures before touching the file', () => {
        validateContact.mockImplementation(() => {
            throw new ValidationError('Name is required');
        });

        expect(() => contactService.addContact('', 'x@y.com', '555'))
            .toThrow('Name is required');
        expect(loadContacts).not.toHaveBeenCalled();
        expect(saveContacts).not.toHaveBeenCalled();
    });

    it('reports a new (not-found) file via ui.fileNotFound', () => {
        withContacts([], true);

        contactService.addContact('Bob', 'bob@work.org', '555-3333');

        expect(ui.fileNotFound).toHaveBeenCalled();
        expect(ui.loaded).not.toHaveBeenCalled();
    });

    it('reports an existing file via ui.loaded with the count', () => {
        withContacts(sample());

        contactService.addContact('Bob', 'bob@work.org', '555-3333');

        expect(ui.loaded).toHaveBeenCalledWith(2);
        expect(ui.fileNotFound).not.toHaveBeenCalled();
    });
});

describe('deleteContact', () => {
    it('removes a matching contact and saves', () => {
        const contacts = sample();
        withContacts(contacts);

        contactService.deleteContact('jane@example.com');

        expect(contacts).toHaveLength(1);
        expect(contacts.find(c => c.email === 'jane@example.com')).toBeUndefined();
        expect(ui.contactDeleted).toHaveBeenCalledWith('Jane Smith');
        expect(saveContacts).toHaveBeenCalledWith(FILE, contacts);
    });

    it('matches the email case-insensitively', () => {
        const contacts = sample();
        withContacts(contacts);

        contactService.deleteContact('JANE@EXAMPLE.COM');

        expect(contacts).toHaveLength(1);
    });

    it('throws ContactError and does not save when the email is unknown', () => {
        withContacts(sample());

        expect(() => contactService.deleteContact('nobody@example.com'))
            .toThrow(ContactError);
        expect(() => contactService.deleteContact('nobody@example.com'))
            .toThrow('No contact found with email: nobody@example.com');
        expect(saveContacts).not.toHaveBeenCalled();
    });
});

describe('searchContact', () => {
    it('passes the query and matching contacts to ui.searchResults', () => {
        const contacts = sample();
        withContacts(contacts);

        contactService.searchContact('jane');

        expect(ui.searchResults).toHaveBeenCalledWith('jane', [contacts[1]]);
        expect(saveContacts).not.toHaveBeenCalled();
    });
});

describe('showContacts', () => {
    it('passes the loaded contacts to ui.contactList', () => {
        const contacts = sample();
        withContacts(contacts);

        contactService.showContacts();

        expect(ui.contactList).toHaveBeenCalledWith(contacts);
        expect(saveContacts).not.toHaveBeenCalled();
    });
});
