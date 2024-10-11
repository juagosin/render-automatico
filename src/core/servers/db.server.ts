import { MongoClient, Db } from 'mongodb';

export let db: Db;
let client: MongoClient;

export const connectToDBServer = async (connectionURI: string) => {
  const client = new MongoClient(connectionURI);
  await client.connect();

  db = client.db();
};
export const disconnectFromDBServer = async () => {
  await client.close();
};
