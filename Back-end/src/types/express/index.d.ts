// src/types/express/index.d.ts

import 'express';
import { File } from 'multer';

declare global {
  namespace Express {
    interface MulterS3File extends File {
      location: string;
    }

    interface Request {
      file?: MulterS3File;
    }
  }
}
