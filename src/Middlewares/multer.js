import multer from "multer"
import unique from "../utils/generateUnique.js"
import extension from "../utils/extension.js"
const multerMiddleware = (customExtension = extension.images)=>{

  const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
      cb(null,unique()+'_'+file.originalname)
    }
  })

  const fileFilter = (req,file,cb)=>{
    if(customExtension.includes(file.mimetype)){
     return  cb(null,true)
    }
      return    cb(new Error(`invalid extension ${file.mimetype}`))
  }

  const uploud = multer({fileFilter, storage})
  return uploud
}

export default multerMiddleware