
import Comment from '../../../DB/Models/comment.model.js';
import Like from '../../../DB/Models/like.model.js';
import Product from './../../../DB/Models/product.model.js';

export const addComment = async(req,res,next)=>{
  const {productId} = req.params
  const {content} = req.body
  const {id} = req.user
  const checkProduct = await Product.findById(productId)
  if(!checkProduct) return next(new Error('Product not found',{cause:404}))
  const comment = await Comment.create({content,user:id,product:productId})
  res.status(201).json({message:'Comment added successfully',comment})
}

export const likeOrUnlikeComment= async(req, res,next) =>{
  const {onModel} = req.body
  const {commentId} = req.params
  const checkcommentId = await Comment.findById(commentId)
  if(!checkcommentId) return next(new Error('Comment notfound',{cause:404}));

  const checkLike = await Like.findOne({likeBy:req.user.id,onModel,likeDoneOnId:commentId})
  if(checkLike){
  await Like.deleteOne({_id:checkLike._id,onModel,likeDoneOnId:commentId})
  checkcommentId.likes--
  await checkcommentId.save()
    return res.status(200).json(
      {msg:'success',comment:checkcommentId}
    )
  }

  const like = await Like.create({likeBy:req.user.id,onModel,likeDoneOnId:commentId})
  if(!like) return next(new Error('like fail',{cause:400}));

  checkcommentId.likes++
  await checkcommentId.save()
  res.status(201).json(
    {msg:'success',
      comment:checkcommentId
    }
  )
  
}