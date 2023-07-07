import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI!;
const connectDB = async () => {
  const client = await MongoClient.connect(uri);
  return client;
};

export const collectionMongoDB = async (collectName: string) => {
  return (await connectDB()).db().collection(collectName);
};

export const closeMongoDB = async () => {
  return (await connectDB()).close();
};
