import type { NextApiRequest, NextApiResponse } from "next";

import { collectionMongoDB, closeMongoDB } from "libs/mongodb";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const isEmail = await (await collectionMongoDB("users")).findOne({ email: userEmail });
    if (isEmail) {
      res.status(422).json({ message: "Email address already exists." });
    } else {
      await (await collectionMongoDB("users")).insertOne({ email: userEmail });
      await closeMongoDB();
      res.status(201).json({ message: "Sign up!" });
    }
  }
}
export default handler;
