import type { NextApiRequest, NextApiResponse } from "next";
function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    res.status(201).json({ message: "Added comments!", newComment });
  }
  if (req.method === "GET") {
    const dummyData = [
      { id: "c1", name: "max", text: "first comment" },
      { id: "c2", name: "aaa", text: "second comment" },
    ];
    res.status(200).json({ comments: dummyData });
  }
}

export default handler;
