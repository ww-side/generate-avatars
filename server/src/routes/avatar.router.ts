import { Router } from 'express';
import controller from '../controllers/avatar.controller';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/generate-avatar', upload.single('photo'), controller.generate);
router.post('/save-avatar', controller.save);
router.get('/get-avatars', controller.getAvatars);
router.delete('/delete-avatar/:id', controller.delete);

export default router;
