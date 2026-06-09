// JSON persistence with error recovery. A missing file is a normal first-run
// case (reported via `isNew`, not thrown); a corrupted or unwritable file is a
// real error and throws.

const fs = require('fs');

// Reads and parses the contacts file.
// Returns { contacts, isNew }. isNew is true when the file does not exist yet.
// Throws on corrupted JSON or an unexpected read failure.
function loadContacts(path) {
    let raw;
    try {
        raw = fs.readFileSync(path, 'utf8');
    } catch (err) {
        if (err.code === 'ENOENT') {
            return { contacts: [], isNew: true };
        }
        throw new Error(`Could not read ${path}: ${err.message}`);
    }

    let parsed;
    try {
        parsed = JSON.parse(raw);
    } catch (err) {
        throw new Error(`${path} is corrupted (invalid JSON)`);
    }

    if (!Array.isArray(parsed)) {
        throw new Error(`${path} is corrupted (expected a list of contacts)`);
    }

    return { contacts: parsed, isNew: false };
}

// Writes contacts to the file as pretty-printed JSON. Throws on write failure.
function saveContacts(path, contacts) {
    try {
        fs.writeFileSync(path, JSON.stringify(contacts, null, 2), 'utf8');
    } catch (err) {
        throw new Error(`Could not save to ${path}: ${err.message}`);
    }
}

module.exports = { loadContacts, saveContacts };
