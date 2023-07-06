import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI!;
export const connectToDatabase = async () => {
  const client = await MongoClient.connect(uri);
  return client;
};
