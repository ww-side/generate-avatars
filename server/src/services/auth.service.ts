import bcrypt from 'bcrypt';
import User from '../models/user.model';
import generateToken from '../utils/generate-token';
import isValidPassword from '../utils/is-valid-password';
import { messages } from '../config/messages';

class AuthService {
  async signUp(username: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 7);

      const newUser = new User({
        username: username,
        password: hashedPassword,
      });

      await newUser.save();

      return { token: generateToken(newUser._id.toString(), username) };
    } catch (e) {
      console.error(e);
    }
  }

  async signIn(username: string, password: string) {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return { error: messages.userNotFound };
      }

      if (isValidPassword(password, user.password)) {
        return { token: generateToken(user._id.toString(), user.username) };
      } else {
        return { error: messages.invalidPassword };
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthService();
