import cloudinaryConnection from "../../utils/cloudinary.js"
import unique from "../../utils/generateUnique.js"
import Product from './../../../DB/Models/product.model.js';
import Like from './../../../DB/Models/like.model.js';
import Comment from './../../../DB/Models/comment.model.js';



export const addProduct = async(req,res,next) => {
  const {title,caption} = req.body
  let images = []
  let publicIds = []
  
  const fileId = unique()
  for (const file of req.files){
    const {secure_url,public_id} = await cloudinaryConnection().uploader.upload(file.path,{
      folder:`upVote/product/${req.user.id}/${fileId}`
    })
    images.push({secure_url,public_id,fileId})
    publicIds.push(public_id)
  }

  const newProduct = await Product.create({title,caption,images,addedBy:req.user.id})
  if(!newProduct){
      await cloudinaryConnection().api.delete_resources(publicIds)
      await cloudinaryConnection().api.delete_folder(`upVote/product/${req.user.id}/${fileId}`)
    return next(new Error('Product not created',{cause:400}))
  }

  res.status(201).json(
    {msg:'success',
      product:newProduct
    }
  )
}


export const likeOrUnlikeProduct = async(req, res,next) =>{
    const {onModel} = req.body
    const {productId} = req.params
    const checkProductId = await Product.findById(productId)
    if(!checkProductId) return next(new Error('Product notfound',{cause:404}));

    const checkLike = await Like.findOne({likeBy:req.user.id,onModel,likeDoneOnId:productId})
    if(checkLike){
    await Like.deleteOne({_id:checkLike._id,onModel,likeDoneOnId:productId})
    checkProductId.likes--
    await checkProductId.save()
      return res.status(200).json(
        {msg:'success',product:checkProductId}
      )
    }
    
    const like = await Like.create({likeBy:req.user.id,onModel,likeDoneOnId:productId})
    if(!like) return next(new Error('like fail',{cause:400}));

    checkProductId.likes++
    await checkProductId.save()
    res.status(201).json(
      {msg:'success',
        product:checkProductId
      }
    )
    
}

export const productLikes = async (req, res,next) => {
  const {productId} = req.params 
  const likes =  await Like.find({likeDoneOnId:productId}).populate([{path:'likeDoneOnId'}])
  if(!likes) return next(new Error('likes not found',{cause:404}))

  res.status(200).json(
    {msg:'success',
      likes:likes
    }
  )
}

export const updateProduct = async (req, res, next) => {
  const {title,caption, oldPublicId} = req.body
  const {productId} = req.params
  const product = await Product.findOne({_id:productId,addedBy:req.user.id})
  if(!product) return next(new Error('product not found',{cause:404}))

  if(title) product.title = title
  if(caption) product.caption = caption
  if(oldPublicId){
    if(!req.file) return next(new Error('uploud files',{cause:404}))
    await cloudinaryConnection().uploader.destroy(oldPublicId)

  const {secure_url,public_id} =  await cloudinaryConnection().uploader.upload(req.file.path,{
      folder:`upVote/product/${req.user.id}/${product.images[0].fileId}`
    })
      product.images[0].public_id = public_id
      product.images[0].secure_url = secure_url
  }

  await product.save()
  res.status(200).json(
    {msg:'success',
      product:product
    }
  )
}

export const deleteProduct = async (req,res,next) => {
  const {productId} = req.params
  const product = await Product.findByIdAndDelete({_id:productId,addedBy:req.user.id})
  if(!product) return next(new Error('product notfound',{cause:404}))

  const publicIds = []
  for(const image of product.images){
    publicIds.push(image.public_id)
  }
  await cloudinaryConnection().api.delete_resources(publicIds)
  await cloudinaryConnection().api.delete_folder(`upVote/product/${req.user.id}/${product.images[0].fileId}`)
  res.status(200).json(  {msg:'product deleted successfully'})

}

export const getAllProducts = async (req, res, next) => {
  // const products = await Product.find().lean()
  // if(!products) return next(new Error('products not found',{cause:404}))
  // for(const product of products){
  //   const comment = await Comment.find({product: product._id})
  //   product.comment = comment
  // }
  const products =  Product.find().cursor()
  if(!products) return next(new Error('products not found',{cause:404}))

  let finalResult = []

  for(let doc = await products.next();doc != null; doc = await products.next()){
    const comment = await Comment.find({product: doc._id})
    const docObj = doc.toObject()
    docObj.comments = comment
    finalResult.push(docObj)
  }
  res.status(200).json({msg:'success',products:finalResult})
}