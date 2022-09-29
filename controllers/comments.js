const Post = require('../models/post');

module.exports = {
    create,
    deleteComment
}

async function create(req, res){

    try{
        const post = await Post.findById(req.params.id);
        post.comments.push({username: req.user.username, userId: req.user._id})
        await post.save()
        res.status(201).json({data: 'comment added'})
    } catch(err){
        res.status(400).json({error: err})
    }
}
async function deleteComment(req, res){
    try{
        const post = await Post.findOne({'comments._id': req.params.id, 'comments.username': req.user.username});
        post.comments.remove(req.params.id)
        await post.save()
        res.json({data: 'comment removed'})
    }catch(err){
        res.status(400).json({err: err})
    }
}