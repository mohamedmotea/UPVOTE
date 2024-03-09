import { Schema, model } from "mongoose";


const product_schema = new Schema({
  title:{type:String, required:true},
  caption:{type:String,default:'no caption'},
  likes:{type:Number,default:0,min:0},
  addedBy:{type:Schema.Types.ObjectId,ref:'user'},
  images:[{
    secure_url:{type:String,required:true},
    public_id:{type:String,required:true,unique:true},
    fileId:{type:String,required:true}  }
  ]
},{timestamps:true})

const Product = model('Product',product_schema)

export default Product