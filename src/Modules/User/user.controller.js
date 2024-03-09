import jwt from "jsonwebtoken";
import User from "./../../../DB/Models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { userName, password, email, age, gender } = req.body;
  const check = await User.findOne({ email: email });
  if (check) return next(new Error('email is already exist',{cause:409}))
  const hashPassword = bcryptjs.hashSync(password, +process.env.SALT_ROUNDS);
  const newUser = await User.create({userName,password: hashPassword,email,age,gender});
  if (!newUser)  return next(new Error("Couldn't create",{cause:400}))
  return res.status(201).json({ message: "User created successfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return next(new Error("User not found",{cause:404}))
  const isMatch = bcryptjs.compareSync(password, user.password);
  if (!isMatch) return next(new Error("Invalid password",{cause:401}))
  const token = jwt.sign(
    {id:user._id,userName:user.userName,email:user.email,age:user.age,gender:user.gender,
    createdAt:user.createdAt,updatedAt:user.updatedAt}
    ,process.env.TOKEN_SIGNATURE_KEY,{
  expiresIn:'5d'})

  return res.status(200).json({ message: "User logged in successfully" ,token});
}

export const info = (req, res, next) => {
  res.json({ message: "User Data",data:req.user})
}

export const update = async(req, res,next)=>{
  const {userName,email,newPassword,age,gender} = req.body
  if(email) {
    const check = await User.findOne({ email ,_id:{$ne:req.user.id} });
    if (check) return next(new Error('email is already exist',{cause:409}))
  }
  
  if(newPassword){
    const newHashPassword = bcryptjs.hashSync(newPassword,+process.env.SALT_ROUNDS)
    const updateUser = await User.findOneAndUpdate({_id:req.user.id},{userName,email,password:newHashPassword,age,gender},{new:true}).select('-password')
    if(!updateUser) return next(new Error("Couldn't update user "));
    return res.status(200).json({ message: "User updated successfully" ,data:updateUser})
  }
  const updateUser = await User.findOneAndUpdate({_id:req.user.id},{userName,email,age,gender},{new:true}).select('-password')
  if(!updateUser) return next(new Error("Couldn't update user",{cause:400}));

  return res.status(200).json({ message: "User updated successfully" ,data:updateUser})

}

export const dltUser = async (req, res) => {
  const deleteUser = await User.findOneAndDelete({_id:req.user.id});
  if(!deleteUser) return next(new Error("Couldn't delete user",{cause:400}));
  return res.status(200).json({ message: "User deleted successfully",data:deleteUser})
}