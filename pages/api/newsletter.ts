import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "libs/mongodb";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const db = (await connectToDatabase()).db();
    const emailCollection = db.collection("emails");
    const isEmail = await emailCollection.findOne({ email: userEmail });

    if (isEmail) {
      res.status(422).json({ message: "Email address already exists." });
    } else {
      await emailCollection.insertOne({ email: userEmail });
      (await connectToDatabase()).close();
      res.status(201).json({ message: "Sign up!" });
    }
  }
}
export default handler;
