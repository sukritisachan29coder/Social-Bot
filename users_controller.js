const User=require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user)
    {
        return res.render('user_profile.ejs', {
            title: 'User Profile',
            profile_user:user
        });
    }
    );

    User.findById(req.user.id,function(err,user){
        
    })
   
}

module.exports.update=async function(req,res)//what was the error like you are trying to reuire the file. this is a folder u need to only join them not reuire them and you cannot use await without async
//oh ok 1 more thing..yes...my flash notification is not working like none of req.flash messages are shown..can u see plz..
{
    // if(req.user.id==req.params.id)
    // {
    //     User.findByIdAndUpdate(req.params.id,{name: req.body.name[0], email: req.body.name[1]},function(err,user)//i'll check once in db
    //     {
    //         req.flash('success','User Profile update successfully');
            
    //         return res.redirect('back');
    //     }
    //     );
    // }
    // else
    // {
    //     return res.status(401).send('Unauthorized');//its getting updated but not gettig loaded to db
    // }
    if(req.user.id==req.params.id)
    {
        try
        {
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err)
            {
                if(err)
                {
                    console.log("Multer Error", err);

                }
                
                user.name=req.body.name;
                user.email=req.body.email;
                //name and email update ho rahe hain?yes

                if(req.file)
                {
                    //this is saving the uploaded file of avatar field in the user//

                    user.avatar=User.avatarPath+'/'+req.file.filename;//the file is getting updated like if i update my profile its hows here in uplaods/avatars/users but dont know why this error is coming
                }
                console.log(user.avatar);
                user.save();
                return res.redirect('back');
            })
        }catch(err)
        {
            req.flash('error',"err");
            return res.redirect('back');
        }

    }else
    {
        req.flash('error','Unauthorized');
            
    }
}
    
//ek bar run karao pl

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
     }
    return res.render('user_sign_up.ejs', {
        title: "Social Bot | Sign Up"
    })
}

//checking ok
// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
     }
    return res.render('user_sign_in', {
        title: "Social Bot | Sign In"
    })
}
//get the signup data

module.exports.create=function(req,res){

    console.log("body",req.body.password);
    if(req.body.password !=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('Error in Signing Up');
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in Signing Up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
        return res.redirect('back');
        }
        
        //sign in and create a session for the user
    //    module.exports.createSession=function(req,res)
    //    {
    //        return res.redirect('/');
    //    }
    });
}
          
// module.exports.create = function(req, res){
//     return res.render('user_signin', {
//         title: "Banking Bot | Sign In"
//     })
// }
        
// module.exports.Chatbot = function(req, res){
//     return res.render('user_signin', {
//         title: "Banking Bot | Sign In"
//     })
// }
    

//signin and create a session for the user
module.exports.createSession=function(req,res)
{
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
    // handle the passwords which dont match
}
module.exports.destroySession=function(req,res)
{
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/users/sign-in');
}


//done where was the problem??actaullyprofile route change hogya is wajah se cannot get /users/profile ok got ot thanks ur welcomepls resolve ya