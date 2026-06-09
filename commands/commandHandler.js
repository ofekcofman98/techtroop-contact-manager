const contactService = require('../services/contactService');

const commands = {
    add: {
        numOfArgs: 3,
        usage: '"name" "email" "phone"',
        explanation: "Add a new contact",
        action: function(args) {
            const [name, email, phone] = args;
            contactService.addContact(name, email, phone);
        }
    },
    delete: {
        numOfArgs: 1,
        usage: '"email"',
        explanation: "Delete contact by email",
        action: function(args) {
            const [email] = args;
            contactService.deleteContact(email);
        }
    },
    search: {
        numOfArgs: 1,
        usage: '"query"',
        explanation: "Search contacts by name or email",
        action: function(args) {
            const [query] = args;
            contactService.searchContact(query);
        }
    },
    list: {
        numOfArgs: 0,
        usage: "",
        explanation: "List all contacts",
        action: function() {
            contactService.showContacts();
        }
    },
    help: {
        numOfArgs: 0,
        usage: "",
        explanation: "Show this help message",
        action: function() {
            printHelp();
        }
    }
};

function printHelp() {
    console.log("Usage: node contacts.js [command] [arguments]\n");
    console.log("Commands:");

    for (const key in commands) {
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