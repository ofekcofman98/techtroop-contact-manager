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
            // נשאיר את זה ריק או שנקרא לפונקציה שתוגדר ב-handler
        }
    }
};

module.exports = commands;