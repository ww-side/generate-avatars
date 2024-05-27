import { z } from 'zod';

export const saveAvatarSchema = z.object({
  link: z.string().min(1, {message: "Image link is required"}),
});