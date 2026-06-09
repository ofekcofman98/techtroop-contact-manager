const { handleCommand } = require('./commands/commandHandler');

const [,, command, ...args] = process.argv;

handleCommand(command, args);