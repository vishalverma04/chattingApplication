import express from 'express';
import { RegisterUser,
    LoginUser,
    getAllUsers,
    searchedUsers,
    isLoggedIn
 } from '../controller/user.controllers.js';
import {checkIsLoggedIn } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/', getAllUsers);
router.get('/search', searchedUsers);
router.get('/isLoggedIn', checkIsLoggedIn, isLoggedIn);



export default router;
