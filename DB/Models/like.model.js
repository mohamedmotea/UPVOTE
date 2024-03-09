import { Schema, model } from "mongoose";


const like_schema = new Schema({
  likeBy:{type: Schema.Types.ObjectId, ref:'User'},
  likeDoneOnId : {type: Schema.Types.ObjectId, refPath:'onModel'},
  onModel : {type:String , enum:['Product', 'User','Comment','Replay'] ,require:true}
},{timestamps: true})

const Like = model('like',like_schema)

export default Like