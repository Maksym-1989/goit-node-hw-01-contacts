const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(contacts));
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(contacts);

    const requiredContact =
      parsedContacts.find((contact) => String(contact.id) === contactId) ||
      `Контакт с ID${contactId} не найден.`;

    console.table(requiredContact);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(contacts);

    const index = parsedContacts.findIndex((item) => String(item.id) === contactId);
    if (index === -1) {
      return console.log(`Контакт с ID ${contactId} не найден.`);
    }

    const filteredContacts =
      parsedContacts.filter((contact) => String(contact.id) !== contactId) ;

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 1));
    console.log(`Контакт с ID ${contactId} удален!`);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");

    const parsedContacts = JSON.parse(contacts);

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Контакт ${name} добавлен!`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
