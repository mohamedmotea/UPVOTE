import { Router } from "express";
import expressAsyncHandler from 'express-async-handler'
import * as UC from './user.controller.js'
import * as schema from './user.validation.js'
import vld from "../../Middlewares/validation.js";
import auth from "../../Middlewares/auth.js";
const router = Router();


router
.post('/',vld(schema.signUp),expressAsyncHandler(UC.signUp))
.post('/login',vld(schema.login),expressAsyncHandler(UC.login))
.get('/',vld(schema.token),auth(),expressAsyncHandler(UC.info))
.put('/',vld(schema.update),auth(),expressAsyncHandler(UC.update))
.delete('/',vld(schema.token),auth(),expressAsyncHandler(UC.dltUser))
export default router