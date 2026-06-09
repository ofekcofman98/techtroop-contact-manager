// All console output lives here, keeping the service and utils free of UI.
// Status messages use ✓ / ✗ markers; errors are printed by the command layer.

// Formats a single contact row: "1. John Doe - john@example.com - 555-1234".
function formatRow(contact, index) {
    return `${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`;
}

function loading(file) {
    console.log(`Loading contacts from ${file}...`);
}

function loaded(count) {
    console.log(`✓ Loaded ${count} contacts`);
}

function fileNotFound() {
    console.log('✗ File not found - creating new contact list');
}

function contactAdded(name) {
    console.log(`✓ Contact added: ${name}`);
}

function contactDeleted(name) {
    console.log(`✓ Contact deleted: ${name}`);
}

function saved(file) {
    console.log(`✓ Contacts saved to ${file}`);
}

function contactList(contacts) {
    console.log('\n=== All Contacts ===');
    contacts.forEach((contact, i) => console.log(formatRow(contact, i)));
}

function searchResults(query, matches) {
    console.log(`\n=== Search Results for "${query}" ===`);
    if (matches.length === 0) {
        console.log(`No contacts found matching "${query}"`);
        return;
    }
    matches.forEach((contact, i) => console.log(formatRow(contact, i)));
}

function printCliHelp(commands) {
    console.log("Usage: node contacts.js [command] [arguments]\n");
    console.log("Commands:");
    for (const key in commands) {
        const cmd = commands[key];
        console.log(`  ${key} ${cmd.usage}`.padEnd(30) + ` - ${cmd.explanation}`);
    }

    console.log("\nExamples:");
    for (const key in commands) {
        const cmd = commands[key];
        if (cmd.example) {
            console.log(`  ${cmd.example}`);
        }
    }
}

function unknownCommand(commandName) {
    console.log(`✗ Error: Unknown command '${commandName}'`);
    console.log("Usage: node contacts.js [add|list|search|delete|help] [arguments]");
}

function missingArguments(cmdKey, usage) {
    console.log(`✗ Error: Missing arguments for ${cmdKey} command`);
    console.log(`Usage: node contacts.js ${cmdKey} ${usage}`);
}

function printError(message) {
    console.error(`✗ Error: ${message}`);
}

module.exports = {
    loading,
    loaded,
    fileNotFound,
    contactAdded,
    contactDeleted,
    saved,
    contactList,
    searchResults,
    printCliHelp,
    unknownCommand,  
    missingArguments,
    printError
};
