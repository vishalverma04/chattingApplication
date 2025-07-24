import express from 'express';
import { accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup } from '../controller/chat.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/access-chat',verifyJWT, accessChat);
router.get('/fetch-chats', verifyJWT, fetchChats);
router.post('/create-group-chat', verifyJWT, createGroupChat);  
router.put('/rename-group', verifyJWT, renameGroup);
router.put('/add-to-group', verifyJWT, addToGroup);
router.put('/remove-from-group', verifyJWT, removeFromGroup);


export default router;