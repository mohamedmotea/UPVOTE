import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import * as LC from './like.controller.js'
import auth from "../../Middlewares/auth.js";
const router = Router()

router.get('/',auth(),expressAsyncHandler(LC.likesHistorted))

export default router