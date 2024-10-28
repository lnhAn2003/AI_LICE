import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const passwordValidation: RequestHandler[] = [
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least on uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number'),

    ((req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }) as RequestHandler
];
