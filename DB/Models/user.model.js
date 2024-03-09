import { Schema,model } from "mongoose";


const user_schema = new Schema({
  userName: { type: String, required: true,min:3},
  email:{ type: String, required: true, unique: true},
  password: { type: String, required: true,min:6,max:25},
  gender:{ type: String,enum: ["male", "female"], default: "male"},
  isConfirmed: { type: Boolean, default: false},
  age:{ type: Number,min:12},
  role:{
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
},{timestamps: true})

const User = model("User", user_schema)

export default User