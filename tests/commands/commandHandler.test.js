jest.mock('../../commands/commandsData');
jest.mock('../../utils/ui');

const commands = require('../../commands/commandsData');
const ui = require('../../utils/ui');
const { handleCommand } = require('../../commands/commandHandler');

// Replace the mocked command registry with a controllable fixture.
const addActivate = jest.fn();
beforeEach(() => {
    for (const key of Object.keys(commands)) delete commands[key];
    Object.assign(commands, {
        add: { numOfArgs: 3, usage: '"name" "email" "phone"', activate: addActivate },
        list: { numOfArgs: 0, usage: '', activate: jest.fn() }
    });
});

describe('handleCommand', () => {
    it('prints CLI help when no command is given', () => {
        handleCommand(undefined, []);
        expect(ui.printCliHelp).toHaveBeenCalledWith(commands);
    });

    it('reports an unknown command', () => {
        handleCommand('frobnicate', []);
        expect(ui.unknownCommand).toHaveBeenCalledWith('frobnicate');
        expect(addActivate).not.toHaveBeenCalled();
    });

    it('looks up commands case-insensitively', () => {
        handleCommand('ADD', ['John', 'john@example.com', '555']);
        expect(addActivate).toHaveBeenCalledWith(['John', 'john@example.com', '555']);
    });

    it('reports missing arguments when too few are supplied', () => {
        handleCommand('add', ['John']);
        expect(ui.missingArguments).toHaveBeenCalledWith('add', '"name" "email" "phone"');
        expect(addActivate).not.toHaveBeenCalled();
    });

    it('activates the command with its args when valid', () => {
        const args = ['John', 'john@example.com', '555'];
        handleCommand('add', args);
        expect(addActivate).toHaveBeenCalledWith(args);
    });

    it('allows zero-arg commands through', () => {
        handleCommand('list', []);
        expect(commands.list.activate).toHaveBeenCalledWith([]);
    });

    it('catches errors thrown by a command and routes them to ui.printError', () => {
        addActivate.mockImplementation(() => {
            throw new Error('boom');
        });
        handleCommand('add', ['John', 'john@example.com', '555']);
        expect(ui.printError).toHaveBeenCalledWith('boom');
    });
});
