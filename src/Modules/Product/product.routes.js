import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import multerMiddleware from './../../Middlewares/multer.js';
import expressAsyncHandler from "express-async-handler";
import * as PC from "./product.controller.js";
import * as schema from './product.validation.js';
import vld from './../../Middlewares/validation.js';
import { allowRole } from "../../utils/systemRoles.js";
const router = Router();


router.post('/',auth([allowRole.USER,allowRole.ADMIN]),multerMiddleware().array('images',5),vld(schema.addProduct),expressAsyncHandler(PC.addProduct))

.get('/:productId',vld(schema.likes),expressAsyncHandler(PC.productLikes))
.patch('/:productId',auth(),multerMiddleware().single('image'),expressAsyncHandler(PC.updateProduct))
.delete('/:productId',auth(),expressAsyncHandler(PC.deleteProduct))
.get('/',expressAsyncHandler(PC.getAllProducts))
export default router 