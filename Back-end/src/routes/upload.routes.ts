// src/routes/upload.routes.ts

import { Router, Request, Response } from 'express';
import { upload } from '../utils/awsS3';

const router = Router();

router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
    }

    // Use intersection type to include 'location'
    const file = req.file as Express.Multer.File & { location: string };
    const fileUrl = file.location;

    res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default router;
