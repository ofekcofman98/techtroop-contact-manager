jest.mock('fs');
const fs = require('fs');
const { loadContacts, saveContacts } = require('../../utils/fileUtils');

const PATH = 'contacts.json';

describe('loadContacts', () => {
    it('returns { contacts: [], isNew: true } when the file does not exist', () => {
        const enoent = new Error('no such file');
        enoent.code = 'ENOENT';
        fs.readFileSync.mockImplementation(() => { throw enoent; });

        expect(loadContacts(PATH)).toEqual({ contacts: [], isNew: true });
    });

    it('parses a valid JSON array', () => {
        const data = [{ name: 'John', email: 'john@example.com', phone: '555' }];
        fs.readFileSync.mockReturnValue(JSON.stringify(data));

        expect(loadContacts(PATH)).toEqual({ contacts: data, isNew: false });
    });

    it('throws a "corrupted (invalid JSON)" error on malformed JSON', () => {
        fs.readFileSync.mockReturnValue('{ not json');

        expect(() => loadContacts(PATH)).toThrow(`${PATH} is corrupted (invalid JSON)`);
    });

    it('throws a "corrupted (expected a list)" error when JSON is not an array', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify({ name: 'John' }));

        expect(() => loadContacts(PATH))
            .toThrow(`${PATH} is corrupted (expected a list of contacts)`);
    });

    it('rethrows a non-ENOENT read failure as a "Could not read" error', () => {
        const eacces = new Error('permission denied');
        eacces.code = 'EACCES';
        fs.readFileSync.mockImplementation(() => { throw eacces; });

        expect(() => loadContacts(PATH))
            .toThrow(`Could not read ${PATH}: permission denied`);
    });
});

describe('saveContacts', () => {
    it('writes pretty-printed JSON to the file', () => {
        fs.writeFileSync.mockImplementation(() => {});
        const contacts = [{ name: 'John', email: 'john@example.com', phone: '555' }];

        saveContacts(PATH, contacts);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            PATH,
            JSON.stringify(contacts, null, 2),
            'utf8'
        );
    });

    it('throws a "Could not save" error on write failure', () => {
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('disk full');
        });

        expect(() => saveContacts(PATH, []))
            .toThrow(`Could not save to ${PATH}: disk full`);
    });
});
