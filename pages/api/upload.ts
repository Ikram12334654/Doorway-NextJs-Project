import fs from "fs";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const boundary = req.headers["content-type"]?.split("boundary=")[1];
  if (!boundary)
    return res
      .status(400)
      .json({ message: "No boundary in content-type header" });

  const chunks: Buffer[] = [];
  for await (const chunk of req as IncomingMessage) {
    chunks.push(Buffer.from(chunk));
  }

  const buffer = Buffer.concat(chunks);
  const parts = buffer.toString().split(`--${boundary}`);

  const filePart = parts.find(
    (part) =>
      part.includes("Content-Disposition: form-data;") &&
      part.includes("filename=")
  );

  if (!filePart) {
    return res.status(400).json({ message: "No file found in upload" });
  }

  const filenameMatch = filePart.match(/filename="(.+?)"/);
  const filename = filenameMatch ? filenameMatch[1] : "upload.pkpass";

  const fileDataStart = filePart.indexOf("\r\n\r\n") + 4;
  const fileDataEnd = filePart.lastIndexOf("\r\n");
  const fileContent = filePart.substring(fileDataStart, fileDataEnd);

  const fileBuffer = Buffer.from(fileContent, "binary");

  const downloadDir = path.join(process.cwd(), "public", "download");
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  const savePath = path.join(downloadDir, filename);
  fs.writeFileSync(savePath, fileBuffer);

  return res.status(200).json({
    message: "File uploaded successfully",
    path: `/download/${filename}`,
  });
}
