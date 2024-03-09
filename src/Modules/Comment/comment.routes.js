import { Router } from "express";
import * as CC from "./comment.controller.js";
import auth from '../../Middlewares/auth.js';
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post('/:productId',auth(),expressAsyncHandler(CC.addComment))
.post('/like/:commentId',auth(),expressAsyncHandler(CC.likeOrUnlikeComment))
export default router