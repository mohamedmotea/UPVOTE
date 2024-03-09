import Joi from "joi";
import { Types } from "mongoose";

const objId = (value,helper)=>{
   const isValid = Types.ObjectId.isValid(value)
   return isValid ? value : helper.message('objectId is not valid') 
}

export const addProduct = {
  body:Joi.object({
    title:Joi.string().required(),
    caption:Joi.string(),
    images:Joi.array().items(Joi.string().uri()),
  }),
  headers:Joi.object({
    accesstoken:[Joi.string(),Joi.number()]
  }).options({ allowUnknown: true },{presence:'required'})
}

export const likes = {

  params:Joi.object({
    productId:Joi.string().required().custom(objId),
  }),
  headers:Joi.object({
    accesstoken:[Joi.string(),Joi.number()]
  }).options({ allowUnknown: true },{presence:'required'})
}