const contactService = require('../services/contactService');
const ui = require('../utils/ui');

const commands = {
    add: {
        numOfArgs: 3,
        usage: '"name" "email" "phone"',
        explanation: "Add a new contact",
        activate: function(args) {
            const [name, email, phone] = args;
            contactService.addContact(name, email, phone);
        }
    },
    delete: {
        numOfArgs: 1,
        usage: '"email"',
        explanation: "Delete contact by email",
        activate: function(args) {
            const [email] = args;
            contactService.deleteContact(email);
        }
    },
    search: {
        numOfArgs: 1,
        usage: '"query"',
        explanation: "Search contacts by name or email",
        activate: function(args) {
            const [query] = args;
            contactService.searchContact(query);
        }
    },
    list: {
        numOfArgs: 0,
        usage: "",
        explanation: "List all contacts",
        activate: function() {
            contactService.showContacts();
        }
    },
    help: {
        numOfArgs: 0,
        usage: "",
        explanation: "Show this help message",
        activate: function() {
            ui.printCliHelp(commands);
        }
    }
};

module.exports = commands;