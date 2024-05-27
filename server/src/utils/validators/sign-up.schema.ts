import { z } from 'zod';
import { messages } from '../../config/messages';

export const signUpSchema = z.object({
  username: z.string().min(4, messages.usernameLength),
  password: z
    .string()
    .min(9, messages.passwordLength)
    .regex(/[a-z]/, messages.passwordOneLowerCase)
    .regex(/[A-Z]/, messages.passwordOneUpperCase)
    .regex(/[0-9]/, messages.passwordOneNumber)
    .regex(/[^a-zA-Z0-9]/, messages.passwordOneSpecialChar),
});
