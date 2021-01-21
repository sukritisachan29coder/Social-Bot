//const { urlencoded } = require('express');
const express=require('express');
const cookieParser = require('cookie-parser');
const path=require('path');
const { title } = require('process');
const port=9080;
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
//used for session cookie
const passportLocal = require('./config/passport-local-strategy');
const { connect } = require('http2');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
//const { sesion } = require('passport');
const flash = require('connect-flash');
const customMware=require('./config/middleware');

//set static files
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);
//app.use(flash());
// app.use(customMware.setFlash);
app.use(sassMiddleware({
src:'./assets/scss',
dest:'./assets/css',
debug:true,
outputStyle:'extended',
prefix:"/css"
}));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.set('views', './views');
//mongo store is used to store session cookie in the db
app.use(session({
    name:'BankingBot',
    //change secret before deployment
    secret:'xyz',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
   store:new MongoStore({
       mongooseConnection:db,
       autoRemove:'disabled'
   },
   function(err)
   {
       console.log(err || 'connect-mongodb connection ok');//i will fix it u may leave i'll resolve//ok
   }
   )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));
app.get('/',function(req,res){
    return res.render('user_profile',{title:"User Profile"});
    
})
app.get('/',function(req,res){
    return res.render('layout',{title:"Layout Page"});
})

app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error in running the server...",err);
    }
        console.log("Server is running on port",port);
}
);

//wait ok