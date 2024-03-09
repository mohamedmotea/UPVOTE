import { Schema, model } from "mongoose";

const comment_schema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  likes:{
    type: Number,
    default: 0,
    min:0
  }
},{timestamps: true});


const Comment = model('Comment',comment_schema)

export default Comment