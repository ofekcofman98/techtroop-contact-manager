const commands = require('./commandsData');
const ui = require('../utils/ui');

function handleCommand(commandName, args) {
    if (!commandName) {
        ui.printCliHelp(commands);
        return;
    }

    const cmdKey = commandName.toLowerCase();
    const command = commands[cmdKey];

    if (!command) {
        ui.unknownCommand(commandName);
        return;    
    }

    if (args.length < command.numOfArgs) {
        ui.missingArguments(cmdKey, command.usage);
        return;
    }

    try {
        command.activate(args);
    } catch (error) {
        ui.printError(error.message);
    }
}

module.exports = { handleCommand };