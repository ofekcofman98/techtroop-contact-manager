const contactService = require('../services/contactService');



const commands = {
    add: new AddCommand(),
    delete: new DeleteCommand(),
    search: new SearchCommand(),
    list: new ListCommand(),
    help: new HelpCommand()
};



// function handleCommand()