import { NextApiRequest, NextApiResponse } from "next";
import { closeMongoDB, collectionMongoDB } from "libs/mongodb";
import { hashPassword } from "libs/auth";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    if (!email || !email.includes("@" || !password || password.trim().length < 7)) {
      res.status(422).json({ message: "Invalid input - password should also be at least 7 characters long." });
      return;
    }

    const existingUser = await (await collectionMongoDB("users")).findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User exists already." });
      await closeMongoDB();
      return;
    }
    const hashPasswords = await hashPassword(password);

    await (await collectionMongoDB("users")).insertOne({ email, password: hashPasswords });
    res.status(201).json({ message: "Created user!" });
    await closeMongoDB();
  }
}
export default handler;
