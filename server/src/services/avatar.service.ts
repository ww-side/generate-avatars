import axios from 'axios';
import SavedAvatar from '../models/saved-avatar.model';
import { messages } from '../config/messages';

class AvatarService {
  async generate(style: string, photo: Express.Multer.File) {
    try {
      const formData = new FormData();
      const blob = new Blob([photo.buffer], { type: 'image/jpg' });
      formData.append('photo', blob, photo.originalname);

      const res = await axios.post(
        `https://public-api.mirror-ai.net/v2/generate?style=${style}`,
        formData,
        {
          headers: {
            'X-Token': process.env.X_TOKEN,
          },
        },
      );

      return res.data.face;
    } catch (e) {
      console.error(e);
      throw new Error(messages.errorGeneratingAvatar);
    }
  }

  async save(userId: string, link: string) {
    try {
      const newSavedAvatar = new SavedAvatar({ userId, img: link });
      await newSavedAvatar.save();

      return { message: messages.avatarSaved };
    } catch (e) {
      console.error(e);
    }
  }

  async getAvatars(userId: string) {
    try {
      return await SavedAvatar.find({ userId });
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: string) {
    try {
      await SavedAvatar.deleteOne({ _id: id });

      return { message: messages.avatarDeleted };
    } catch (e) {
      console.error(e);
    }
  }
}

export default new AvatarService();
