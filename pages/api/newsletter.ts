import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cjv5svh.mongodb.net/?retryWrites=true&w=majority`
    );

    const db = client.db();
    const emailCollection = db.collection("emails");
    const isEmail = await emailCollection.findOne({ email: userEmail });

    if (isEmail) {
      res.status(422).json({ message: "Email address already exists." });
    } else {
      await emailCollection.insertOne({ email: userEmail });
      client.close();
      res.status(201).json({ message: "Sign up!" });
    }
  }
}
export default handler;
