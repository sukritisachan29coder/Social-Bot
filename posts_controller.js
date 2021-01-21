const Post=require('../models/posts');
const Comment=require('../models/comments')
module.exports.create=async function(req,res){
    try
    {
       let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr)
        {
            return res.status(200).json({
            data:
            {
                post:post
            },
            messgae:'Post created!'
        })
        }
        req.flash('success','Post published');
        
            return res.redirect('back');

    }
    catch(err)
    {
        req.flash('error',"err");
        return res.redirect('back');
    }


   
}
module.exports.destroy=async function(req,res)
{
    try
    {
        let post=await Post.findById(req.params.id);

    if(post.user==req.user.id)
        {
            post.remove();
           await Comment.deleteMany({post:req.params.id});
           if(req.xhr)
           {
               return res.status(200).json({
                   data:
                   {
                       post_id:req.params.id
                   },
                   messgae:"Post deleted"
                   
                   
               })
           }
           req.flash('success','Post and associated comments deleted successfully!');
           return res.redirect('back');
        }
        else
        {
            req.flash('error','Post cannot be deleted!');
            return res.redirect('back');
        }
    }
    catch(err)
    {
        req.flash('error',"err");
        return res.redirect('back');
    }
    
}