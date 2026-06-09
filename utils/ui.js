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

module.exports = {
    loading,
    loaded,
    fileNotFound,
    contactAdded,
    contactDeleted,
    saved,
    contactList,
    searchResults,
};
