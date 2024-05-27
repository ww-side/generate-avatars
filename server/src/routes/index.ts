import { Router } from 'express';
import auth from './auth.router';
import avatar from './avatar.router';

const router = Router();

// router.use((req, res, next) => {
//   res.setHeader("Content-Type", "application/json");
//   return next();
// });

router.use('/auth', auth);
router.use('/', avatar);

export default router;