const { use } = require('passport');
const passport=require('passport');
const User=require('../models/user');
const LocalStrategy=require('passport-local').Strategy;
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done)
{
//find the user and establish the identity
User.findOne({email:email},function(err,user){
    if(err)
    {
        req.flash("Error",err);
        return done(err);
    }
    if(!user || user.password != password)
    {
        req.flash("error","Invalid Username or Password");
        return done(null,false);
    } 
    return done(null,user);
});
}
));
//serializing the user to decide which key is to be kept in the cookies
//use small e ya got it thanks i'll resolve
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserializing the user from the keys in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log("Error in finding user-->Passport");
            return done(null);
        }
        return done(null,user);
    });
});
//check if the user is authenticated
passport.checkAuthentication=function(req,res,next)
//if the user is signed in, then pass on the request to the next function(controller's action)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;
