const {
    listContacts,
    getContactById,
    removeContact,
    addContact
  } = require("./contacts");

const { Command } = require("commander");


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const conactsList = await listContacts()
      return console.table(conactsList)

    case "get":
      const contactById = await  getContactById(id)
      return console.table(contactById )

    case "add":
      const newConact = await  addContact({name,email,phone})
      return console.table(newConact )

    case "remove":
      const removedConact = await  removeContact(id)
      return console.table(removedConact )

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv)
