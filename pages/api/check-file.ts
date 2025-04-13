import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  const filePath = path.join(
    process.cwd(),
    "public",
    "download",
    `${userId}.pkpass`
  );

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    return res.status(200).json({ exists: true });
  } else {
    res.status(400).json({ exists: false });
  }
}
