import { Schema, model } from 'mongoose';

const savedAvatarSchema = new Schema({
  userId: { type: String, required: true },
  img: { type: String, required: true }
});

const SavedAvatar = model('SavedAvatar', savedAvatarSchema);

export default SavedAvatar;