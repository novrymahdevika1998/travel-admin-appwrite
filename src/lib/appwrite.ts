import { Account, Client, Databases } from 'appwrite';

const PROJECT_ID = '674323fe0025f781b5f0'
const DATABASE_ID_DEV = '67432558002caa14c825'
const COLLECTION_ID_CUSTOMERS = '674325a90010bb23f17a'
const COLLECTION_ID_CUSTOMER_SCHEDULES = '67432a0a00250ac9a7d5'

const client : Client = new Client();

client
    .setProject(PROJECT_ID)

const account : Account = new Account(client);
const database : Databases = new Databases(client);

export { client, account, database, COLLECTION_ID_CUSTOMERS, DATABASE_ID_DEV, PROJECT_ID , COLLECTION_ID_CUSTOMER_SCHEDULES}

