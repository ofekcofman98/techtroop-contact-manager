const ui = require('../../utils/ui');

describe('ui output', () => {
    let logSpy;
    let errorSpy;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    // Convenience: all console.log output joined into one string.
    const loggedText = () => logSpy.mock.calls.map(args => args.join(' ')).join('\n');

    it('loading prints the file name', () => {
        ui.loading('contacts.json');
        expect(logSpy).toHaveBeenCalledWith('Loading contacts from contacts.json...');
    });

    it('loaded prints the count with a ✓ marker', () => {
        ui.loaded(3);
        expect(logSpy).toHaveBeenCalledWith('✓ Loaded 3 contacts');
    });

    it('fileNotFound prints a ✗ message', () => {
        ui.fileNotFound();
        expect(loggedText()).toContain('✗ File not found');
    });

    it('contactAdded names the contact', () => {
        ui.contactAdded('John Doe');
        expect(logSpy).toHaveBeenCalledWith('✓ Contact added: John Doe');
    });

    it('contactDeleted names the contact', () => {
        ui.contactDeleted('John Doe');
        expect(logSpy).toHaveBeenCalledWith('✓ Contact deleted: John Doe');
    });

    it('saved names the file', () => {
        ui.saved('contacts.json');
        expect(logSpy).toHaveBeenCalledWith('✓ Contacts saved to contacts.json');
    });

    it('contactList prints a header and a numbered row per contact', () => {
        ui.contactList([
            { name: 'John Doe', email: 'john@example.com', phone: '555-1234' }
        ]);
        const text = loggedText();
        expect(text).toContain('=== All Contacts ===');
        expect(text).toContain('1. John Doe - john@example.com - 555-1234');
    });

    describe('searchResults', () => {
        it('prints a header and matching rows', () => {
            ui.searchResults('john', [
                { name: 'John Doe', email: 'john@example.com', phone: '555-1234' }
            ]);
            const text = loggedText();
            expect(text).toContain('=== Search Results for "john" ===');
            expect(text).toContain('1. John Doe - john@example.com - 555-1234');
        });

        it('prints a "no contacts found" message when there are no matches', () => {
            ui.searchResults('zzz', []);
            expect(loggedText()).toContain('No contacts found matching "zzz"');
        });
    });

    it('printCliHelp lists each command and its examples', () => {
        const commands = {
            add: { usage: '"name"', explanation: 'Add a contact', example: 'node contacts.js add "x"' },
            list: { usage: '', explanation: 'List contacts', example: '' }
        };
        ui.printCliHelp(commands);
        const text = loggedText();
        expect(text).toContain('Usage: node contacts.js [command] [arguments]');
        expect(text).toContain('Add a contact');
        expect(text).toContain('List contacts');
        expect(text).toContain('node contacts.js add "x"');
    });

    it('unknownCommand reports the bad command name', () => {
        ui.unknownCommand('frobnicate');
        expect(loggedText()).toContain("Unknown command 'frobnicate'");
    });

    it('missingArguments reports the command and its usage', () => {
        ui.missingArguments('add', '"name" "email" "phone"');
        const text = loggedText();
        expect(text).toContain('Missing arguments for add command');
        expect(text).toContain('Usage: node contacts.js add "name" "email" "phone"');
    });

    it('printError writes to console.error with a ✗ prefix', () => {
        ui.printError('something broke');
        expect(errorSpy).toHaveBeenCalledWith('✗ Error: something broke');
    });
});
