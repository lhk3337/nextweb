import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;
    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData as any);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  }

  res.status(200).json({ message: "This works!" });
}

export default handler;
