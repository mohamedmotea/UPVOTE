import Joi from "joi";


export const signUp = {
  body: Joi.object({
    userName: Joi.string().required().min(3).alphanum(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    gender: Joi.string().valid('male','female'),
    age: Joi.number().required().min(12)
  })
}

export const login = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  })
}

export const token = {
  headers:Joi.object({
    accesstoken:[Joi.string(),Joi.number()]
  }).options({ allowUnknown: true },{presence:'required'})
}

export const update = {
  body: Joi.object({
    userName: Joi.string().min(3).alphanum(),
    email: Joi.string().email(),
    newPassword: Joi.string().min(6),
    gender: Joi.string().valid('male','female'),
    age: Joi.number().min(12)
  }),
  headers:Joi.object({
    accesstoken:[Joi.string(),Joi.number()]
  }).options({ allowUnknown: true })
}


/*export const profilePic = {
    file:Joi.object({
      size:Joi.number().positive(),
      path:Joi.string(),
      filename:Joi.string(),
      destination:Joi.string(),
      mimetype:Joi.string(),
      encoding:Joi.string(),
      originalname:Joi.string(),
      fieldname:Joi.string()
  }).options({presence: 'required'})
  ,
  headers:Joi.object({
    accesstoken:[Joi.string(),Joi.number()]
  }).options({ allowUnknown: true })
}
*/