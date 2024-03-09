
import Comment from './../../../DB/Models/comment.model.js';
import Replay from './../../../DB/Models/replay.model.js';

export const addReplay = async (req,res,next) => {
  const {content , onModel} = req.body
  const {replayId} = req.params

    if(onModel == 'Comment'){
      const comment = await Comment.findById(replayId)
      if(!comment) return next(new Error('comment not found',{cause:404}))
    }else if(onModel == 'Replay'){
      const replay = await Replay.findById(replayId)
      if(!replay) return next(new Error('replay not found',{cause:404}))
    }

    const replay = await Replay.create({content, onModel,user:req.user.id})
    if(!replay) return next(new Error('replay fail',{cause:400}))

    res.status(201).json({msg:'success',replay})

}