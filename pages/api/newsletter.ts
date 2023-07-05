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
    await db.collection("emails").insertOne({ email: userEmail });
    client.close();
    res.status(201).json({ message: "Sign up!" });
  }
}
export default handler;
