// Pure helpers for querying a list of contacts. No I/O, no printing — these are
// the building blocks the service composes. Email matching is case-insensitive.

function emailExists(contacts, email) {
    const target = email.toLowerCase();
    return contacts.some(contact => contact.email.toLowerCase() === target);
}

function findIndexByEmail(contacts, email) {
    const target = email.toLowerCase();
    return contacts.findIndex(contact => contact.email.toLowerCase() === target);
}

function filterByQuery(contacts, query) {
    const needle = query.toLowerCase();
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(needle) ||
        contact.email.toLowerCase().includes(needle)
    );
}

module.exports = { emailExists, findIndexByEmail, filterByQuery };
