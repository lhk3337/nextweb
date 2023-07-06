import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "libs/mongodb";
import { hashPassword } from "libs/auth";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    if (!email || !email.includes("@" || !password || password.trim().length < 7)) {
      res.status(422).json({ message: "Invalid input - password should also be at least 7 characters long." });
      return;
    }

    const db = (await connectToDatabase()).db();
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User exists already." });
      (await connectToDatabase()).close();
      return;
    }
    const hashPasswords = await hashPassword(password);

    await db.collection("users").insertOne({ email, password: hashPasswords });
    res.status(201).json({ message: "Created user!" });
    (await connectToDatabase()).close();
  }
}
export default handler;
