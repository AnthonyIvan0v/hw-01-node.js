const { Command } = require("commander");
const program = new Command();

const contacts = require("./db/contacts");

const invoceAction = async ({ action, id, name, phone, email }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            return console.log(allContacts);
        case "get":
            const oneContact = await contacts.getContactById(id);
            return console.log(oneContact);
        case "add":
            const newContact = await contacts.addContact({
                id,
                name,
                phone,
                email,
            });
            return console.log(newContact);
        case "remove":
            const removeContact = await contacts.removeContact(id);
            return console.log(removeContact);
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
};

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invoceAction(options);
