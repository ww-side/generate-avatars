import bcrypt from 'bcrypt';

export default function isValidPassword(inputPassword: string, storedPassword: string) {
  return bcrypt.compareSync(inputPassword, storedPassword);
};
