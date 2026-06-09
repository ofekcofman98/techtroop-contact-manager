// Orchestrates the contact operations: validate, load, mutate, save, and drive
// the UI. Holds no console.log of its own — all output goes through the ui module.

const { loadContacts, saveContacts } = require('../utils/fileUtils');
const { validateContact } = require('../utils/validation');
const { ValidationError, ContactError } = require('../utils/errors');
const ui = require('../utils/ui');

const CONTACTS_FILE = 'contacts.json';

// --- Small pure helpers (case-insensitive) ---

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

// Loads the file and reports the outcome (loaded N / new list) via the ui.
function loadAndReport() {
    const { contacts, isNew } = loadContacts(CONTACTS_FILE);

    if (isNew) {
        ui.fileNotFound();
    } else {
        ui.loaded(contacts.length);
    }
    
    return contacts;
}

// --- Commands ---

function addContact(name, email, phone) {
    // Validate before touching the file so a bad email surfaces immediately.
    validateContact(name, email, phone);

    ui.loading(CONTACTS_FILE);
    const contacts = loadAndReport();

    if (emailExists(contacts, email)) {
        throw new ValidationError('Contact with this email already exists');
    }

    contacts.push({ name, email, phone });
    ui.contactAdded(name);

    saveContacts(CONTACTS_FILE, contacts);
    ui.saved(CONTACTS_FILE);
}

function deleteContact(email) {
    ui.loading(CONTACTS_FILE);
    const contacts = loadAndReport();

    const index = findIndexByEmail(contacts, email);
    if (index === -1) {
        throw new ContactError(`No contact found with email: ${email}`);
    }

    const [removed] = contacts.splice(index, 1);
    ui.contactDeleted(removed.name);

    saveContacts(CONTACTS_FILE, contacts);
    ui.saved(CONTACTS_FILE);
}

function searchContact(query) {
    ui.loading(CONTACTS_FILE);
    const contacts = loadAndReport();

    const matches = filterByQuery(contacts, query);
    ui.searchResults(query, matches);
}

function showContacts() {
    ui.loading(CONTACTS_FILE);
    const contacts = loadAndReport();

    ui.contactList(contacts);
}

module.exports = { addContact, deleteContact, searchContact, showContacts };
