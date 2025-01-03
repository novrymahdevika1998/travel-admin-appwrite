import { database } from "@/lib/appwrite";
import { ID } from "appwrite";

const collections = [
    {
        'databaseId': import.meta.env.VITE_APPWRITE_DATABASE_ID_DEV,
        'id': import.meta.env.VITE_APPWRITE_COLLECTION_ID_CUSTOMERS,
        'name': 'customers',
    },
    {
        'databaseId': import.meta.env.VITE_APPWRITE_DATABASE_ID_DEV,
        'id': import.meta.env.VITE_APPWRITE_COLLECTION_ID_CUSTOMER_SCHEDULES,
        'name': 'customerSchedules',
    }
]

const db: {
    [key: string]: {
        list: (queries: string[]) => Promise<any>,
        create: (payload: any) => Promise<any>,
        update: (id: string, payload: any) => Promise<any>,
        get: (id: string) => Promise<any>,
    }
} = {}

collections.forEach(col => {
    db[col.name] = {
        create: (payload: any) => database.createDocument(
            col.databaseId,
            col.id,
            ID.unique(),
            payload
        ),
        update: (id: string, payload: any) => database.updateDocument(
            col.databaseId,
            col.id,
            id,
            payload
        ),
        get: (id: string) => database.getDocument(
            col.databaseId,
            col.id,
            id
        ),
        list: (queries: string[]) => database.listDocuments(
            col.databaseId,
            col.id,
            queries
        ),
    }
})

export { db }