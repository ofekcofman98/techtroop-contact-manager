const contactService = require('../services/contactService');
const ui = require('../utils/ui');

const commands = {
    add: {
        numOfArgs: 3,
        usage: '"name" "email" "phone"',
        explanation: "Add a new contact",
        example: `node contacts.js add "John Doe" "john@example.com" "555-123-4567"`,
        activate: function(args) {
            const [name, email, phone] = args;
            contactService.addContact(name, email, phone);
        }
    },
    list: {
        numOfArgs: 0,
        usage: "",
        explanation: "List all contacts",
        example: "",
        activate: function() {
            contactService.showContacts();
        }
    },
    search: {
        numOfArgs: 1,
        usage: '"query"',
        explanation: "Search contacts by name or email",
        example: `node contacts.js search "john"`,
        activate: function(args) {
            const [query] = args;
            contactService.searchContact(query);
        }
    },
    delete: {
        numOfArgs: 1,
        usage: '"email"',
        explanation: "Delete contact by email",
        example: 'node contacts.js delete "john@example.com"',
        activate: function(args) {
            const [email] = args;
            contactService.deleteContact(email);
        }
    },
    help: {
        numOfArgs: 0,
        usage: "",
        example: "",
        explanation: "Show this help message",
        activate: function() {
            ui.printCliHelp(commands);
        }
    }
};

module.exports = commands;