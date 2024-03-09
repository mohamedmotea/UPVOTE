import Like from "../../../DB/Models/like.model.js"


export const likesHistorted = async (req,res,next) => {
  const {id} = req.user
  const {onModel} = req.query
  const likes = await Like.find({likeBy:id,onModel}).populate([ {path:'likeDoneOnId',populate:{path:'product'}}])
  res.status(200).json({likes})
}