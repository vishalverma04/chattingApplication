import express from 'express';
import { sendMessage,getAllMessages } from '../controller/message.controllers.js';
import {upload} from '../middlewares/multer.middleware.js';


const router = express.Router();
router.post('/', upload.array('file'), sendMessage);
router.get('/:chatId', getAllMessages);

export default router;