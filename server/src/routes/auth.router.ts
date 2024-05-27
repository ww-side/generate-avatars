import { Router } from 'express';
import controller from '../controllers/auth.controller';

const router = Router();

router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);

export default router;