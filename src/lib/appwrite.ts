import { Account, Client, Databases } from 'appwrite';

const client : Client = new Client();

// use env variable
client
    .setProject(import.meta.env.VITE_PROJECT_ID)

const account : Account = new Account(client);
const database : Databases = new Databases(client);

export { client, account, database };

