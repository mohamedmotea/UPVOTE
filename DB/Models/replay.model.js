import { Schema, model } from "mongoose";


const replay_schema = new Schema({
  content:{
    type:String,
    required:true
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  replayOnId :{
    type:Schema.Types.ObjectId,
    refPath:'onModel'
  },
  onModel:{
    type:String,
    enum:["Comment","Replay"],
    required:true
  },
  likesOfReplay:{
    type:Number,
    default:0,
    min:0
  }
},{timestamps:true})

const Replay = model('Replay',replay_schema)

export default Replay