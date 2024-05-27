import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import avatarService from '../services/avatar.service';
import { validateToken } from '../middlewares/validate-token.middleware';
import { saveAvatarSchema } from '../utils/validators/save-avatar.schema';
import { deleteAvatarSchema } from '../utils/validators/delete-avatar.schema';
import { messages } from '../config/messages';
import { getUserIdFromAuthHeader } from '../utils/get-user-id-from-auth-header';

class AvatarController {
  async generate(req: Request, res: Response) {
    try {
      validateToken(req, res, async () => {
        const { style } = req.body;

        if (!style) {
          return res
            .status(400)
            .json({ errors: [{ message: messages.styleRequired }] });
        }

        if (!req.file) {
          return res
            .status(400)
            .json({ errors: [{ message: messages.photoRequired }] });
        }

        const photo = req.file;
        const result = await avatarService.generate(style, photo);

        return res.json(result);
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: messages.errorGeneratingAvatar });
    }
  }

  async save(req: Request, res: Response) {
    try {
      validateToken(req, res, async () => {
        const validationResult = saveAvatarSchema.safeParse(req.body);
        const authHeader = req.headers['authorization'];
        const userId = getUserIdFromAuthHeader(authHeader);

        if (!validationResult.success) {
          return res
            .status(400)
            .json({ errors: validationResult.error.errors });
        }

        if (!userId) {
          return res.status(400).json({ error: messages.userNotExist });
        }

        const { link } = validationResult.data;

        const result = await avatarService.save(userId, link);

        return res.json(result);
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: messages.saveError });
    }
  }

  async getAvatars(req: Request, res: Response) {
    try {
      validateToken(req, res, async () => {
        const authHeader = req.headers['authorization'];
        const userId = getUserIdFromAuthHeader(authHeader);

        if (!userId) {
          return res.status(401).json({ error: messages.tokenRequired });
        }

        const result = await avatarService.getAvatars(userId);

        return res.json(result);
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: messages.errorGetAvatars });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      validateToken(req, res, async () => {
        const validationResult = deleteAvatarSchema.safeParse(req.params);

        if (!validationResult.success) {
          return res
            .status(400)
            .json({ errors: validationResult.error.errors });
        }

        const { id } = validationResult.data;
        const result = await avatarService.delete(id);

        return res.json(result);
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: messages.errorDeleteAvatars });
    }
  }
}

export default new AvatarController();
