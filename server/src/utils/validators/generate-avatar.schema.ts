import { z } from 'zod';

export const generateAvatarSchema = z.object({
  style: z.string().min(1, { message: 'Style is required' }).refine(
    style => ['kenga', 'anime', 'mau'].includes(style),
    { message: 'Style must be kenga, anime, or mau' }
  )
});