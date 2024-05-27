import { z } from 'zod';

export const deleteAvatarSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' })
});