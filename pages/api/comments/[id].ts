import { collectionMongoDB } from "libs/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      id,
      email,
      name,
      text,
    };

    await (await collectionMongoDB("comments")).insertOne(newComment);
    res.status(201).json({ message: "Added comments!", newComment });
  }
  if (req.method === "GET") {
    const result = await (await collectionMongoDB("comments")).find({ id: id }).sort({ _id: -1 }).toArray();
    res.status(200).json({ comments: result });
  }
}

export default handler;
