jest.mock('../../services/contactService');
jest.mock('../../utils/ui');

const contactService = require('../../services/contactService');
const ui = require('../../utils/ui');
const commands = require('../../commands/commandsData');

describe('command registry shape', () => {
    it('defines the expected commands', () => {
        expect(Object.keys(commands).sort())
            .toEqual(['add', 'delete', 'help', 'list', 'search']);
    });

    it.each(Object.entries(commands))('command "%s" has a numeric numOfArgs and an activate fn', (_name, cmd) => {
        expect(typeof cmd.numOfArgs).toBe('number');
        expect(typeof cmd.activate).toBe('function');
        expect(typeof cmd.explanation).toBe('string');
    });
});

describe('command activate wiring', () => {
    it('add calls contactService.addContact with destructured args', () => {
        commands.add.activate(['John Doe', 'john@example.com', '555-1234']);
        expect(contactService.addContact)
            .toHaveBeenCalledWith('John Doe', 'john@example.com', '555-1234');
    });

    it('list calls contactService.showContacts', () => {
        commands.list.activate([]);
        expect(contactService.showContacts).toHaveBeenCalled();
    });

    it('search calls contactService.searchContact with the query', () => {
        commands.search.activate(['john']);
        expect(contactService.searchContact).toHaveBeenCalledWith('john');
    });

    it('delete calls contactService.deleteContact with the email', () => {
        commands.delete.activate(['john@example.com']);
        expect(contactService.deleteContact).toHaveBeenCalledWith('john@example.com');
    });

    it('help prints the CLI help via ui', () => {
        commands.help.activate([]);
        expect(ui.printCliHelp).toHaveBeenCalledWith(commands);
    });
});
