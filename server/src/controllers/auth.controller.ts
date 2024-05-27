import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { signUpSchema } from '../utils/validators/sign-up.schema';
import User from '../models/user.model';
import { signInSchema } from '../utils/validators/sign-in.schema';

class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const validationResult = signUpSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error.errors });
      }

      const { username, password } = validationResult.data;
      const user = await User.findOne({ username });

      if (user) {
        return res.status(409).json({ error: 'User already exists' });
      }

      const token = await authService.signUp(username, password);

      return res.json(token);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: 'Auth error' });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const validationResult = signInSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ errors: validationResult.error.errors });
      }

      const { username, password } = validationResult.data;
      const result = await authService.signIn(username, password);

      return res.json(result);
    } catch (e) {
      res.status(400).json({ error: 'Auth error' });
    }
  }
}

export default new AuthController();
