const Post=require('../models/posts');
const User=require('../models/user');
const { use } = require('../routes');
module.exports.home = async function(req, res){
    // console.log(req.cookies);
//     Post.find({},function(err,posts){
//         return res.render('home', {
//             title: "Social Bot | Home",
//             posts:posts
//     });
// });
try{
    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:
        {
            path:'user'
        }
    })
       Post.find({}).populate('user').populate({
           path:'comments',
           populate:
           {
               path:'user'
           }
       })
       let users=await User.find({});
       return res.render('home',{
            title:"Codeial | Home", 
            posts:posts,
            all_users:users
       });
}
catch(err)
{
    console.log("Error",err);
    return;
    
}

   }
   
