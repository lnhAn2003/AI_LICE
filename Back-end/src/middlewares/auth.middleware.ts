import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
          return res.status(403).json({ message: 'Invalid token' });
        } else {
          return res.status(403).json({ message: 'Forbidden' });
        }
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};
