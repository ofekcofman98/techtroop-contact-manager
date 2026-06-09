const commands = require('./commandsData');

commands.help.action = printHelp;

function printHelp() {
    console.log("Usage: node contacts.js [command] [arguments]\n");
    console.log("Commands:");

    for (const key in commands) {
        const cmd = commands[key];
        console.log(`  ${key} ${cmd.usage}`.padEnd(30) + ` - ${cmd.explanation}`);
    }
}

function handleCommand(commandName, args) {
    if (!commandName) {
        printHelp();
        return;
    }

    const cmdKey = commandName.toLowerCase();
    const command = commands[cmdKey];

    if (!command) {
        console.log(`✗ Error: Unknown command '${commandName}'`);
        console.log("Usage: node contacts.js [add|list|search|delete|help] [arguments]");
        return;
    }

    if (args.length < command.numOfArgs) {
        console.log(`✗ Error: Missing arguments for ${cmdKey} command`);
        console.log(`Usage: node contacts.js ${cmdKey} ${command.usage}`);
        return;
    }

    try {
        command.action(args);
    } catch (error) {
        console.error(`✗ Error: ${error.message}`);
    }
}

module.exports = { handleCommand };