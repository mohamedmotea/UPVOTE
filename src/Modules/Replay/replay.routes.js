import { Router } from "express";
import auth from '../../Middlewares/auth.js';
import * as RC from './replay.controller.js';
import expressAsyncHandler from "express-async-handler";
const router = Router();

router.post('/:replayId',auth(),expressAsyncHandler(RC.addReplay))

export default router