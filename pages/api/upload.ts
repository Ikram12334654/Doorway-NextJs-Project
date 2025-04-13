import fs from "fs";
import path from "path";
import { IncomingForm, File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

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

  const uploadDir = path.join(process.cwd(), "public", "download");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, (err: any, fields: any, files: any) => {
    if (err) {
      return res.status(500).json({ message: "Form parse error" });
    }

    const fileArray = files.file as File[];
    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (file.mimetype !== "application/vnd.apple.pkpass") {
      return res.status(400).json({ message: "Only .pkpass files allowed" });
    }

    const customName = fields.name[0] || "upload";
    const finalFileName = `${customName}.pkpass`;

    const finalPath = path.join(uploadDir, finalFileName);

    fs.renameSync(file.filepath, finalPath);

    return res.status(200).json({
      message: "File uploaded successfully",
      path: `/download/${finalFileName}`,
    });
  });
}
