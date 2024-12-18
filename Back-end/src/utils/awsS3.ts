// src/utils/awsS3.ts
import { S3Client, PutObjectCommand  } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import multer from 'multer';
import dotenv from 'dotenv';
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  // Disable SSL certificate verification
  requestHandler: new NodeHttpHandler({
    httpsAgent: new (require('https').Agent)({
      rejectUnauthorized: false,
    }),
  }),
});

const bucketName = process.env.AWS_BUCKET_NAME!;

// Configure Multer with S3Client
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    // acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  },
});

export const fileUpload = async (
  buffer: Buffer,
  folder: string,
  filename: string,
  contentType: string
): Promise<string> => {
  const key = `${folder}/${filename}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    ContentDisposition: 'attachment',
  };

  await s3.send(new PutObjectCommand(params));
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
