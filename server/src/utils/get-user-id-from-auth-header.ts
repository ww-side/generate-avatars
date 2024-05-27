import jwt from 'jsonwebtoken';

export function getUserIdFromAuthHeader(
  authHeader: string | undefined,
): string | null {
  if (!authHeader) {
    return null;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string,
    );
    return decodedToken.id;
  } catch (error) {
    return null;
  }
}
