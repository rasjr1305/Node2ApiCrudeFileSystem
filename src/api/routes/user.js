import {Router} from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/user', UserController.create);
router.put('/user/:userId', UserController.updateOne);
router.delete('/user/:userId', UserController.deleteOne);
router.get('/user', UserController.find);
router.get('/user/:userId', UserController.findOne);

export default router;