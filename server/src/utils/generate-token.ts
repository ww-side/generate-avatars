import jwt from 'jsonwebtoken';

export default function generateToken(id: string, username: string) {
  return jwt.sign({ id, username }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "24h",
  });
};