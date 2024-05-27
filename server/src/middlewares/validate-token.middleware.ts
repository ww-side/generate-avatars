import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { messages } from '../config/messages';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: messages.tokenRequired });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: messages.invalidTokenFormat });
  }

  try {
    (req as any).user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    next();
  } catch (error) {
    return res.status(401).json({ message: messages.invalidToken });
  }
};
