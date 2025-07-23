import express from 'express';
import { RegisterUser,LoginUser,getAllUsers,searchedUsers } from '../controller/user.controllers.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/', getAllUsers);
router.get('/search', searchedUsers);


export default router;
