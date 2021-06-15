const express = require('express');
const expressLayouts=require('express-ejs-layouts')
const app = express();
require('dotenv/config');
const router=require('./router/main');
const db=require('./Services/db').connectionInfo.connection
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const expressValidator=require('express-validator')
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy;
 const session=require('express-session')
 const flash=require('connect-flash')
 const handlebars = require('express-handlebars')
 const createError=require('http-errors')
 const MySQLStore = require('express-mysql-session')(session);
 const bcrypt =require('bcryptjs');
 const two_hours=1000*10*60*60
app.use(expressLayouts)
app.set('view engine','ejs');
// const {
//  PORT=3000,
//  NODE_ENV='development',
//  SESS_NAME='sid',
//  SESS_LIFETIME=two_hours,
//  SESS_SECRET='GIDE',
// }=process.env
// const IN_PROD=NODE_ENV=='production'
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname+'/public'));
 app.use(express.static('./views/'));
 app.use(bodyParser.json());
// app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:false}));
app.use(flash());
app.use(function(req, res, next) { //allow cross origin requests
       res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
       res.header("Access-Control-Allow-Origin", "http://localhost");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       next();
 });

var options ={
       host:process.env.host,
       user:process.env.user,
       password:process.env.password,
       database:process.env.database
   };
   var sessionStore = new MySQLStore(options);
app.use(session({
       secret: 'gide',
       resave: false,
       store:sessionStore,
       saveUninitialized: true,
      // cookie: { secure: true }
     }))
app.use(passport.initialize())
app.use(passport.session())
app.use('/',router)
app.use((req, res, next)=> {
       console.log("req.user")
       console.log(req.user)
       
       return next(createError(404,"Deze pagina is niet gevonden"))
});
app.use((err, req, res, next)=> {
       const statusCode=err.statusCode || 500;
       res.status(err.statusCode || 500)
       res.send(
              `
              <html>
              <title>Error message  from duurzamedata.nl</title>
              <header>
              <style>
              .errorPage{
                     margin-top:100px;
                     margin-left:100px;
                     margin-right:30px;
                     margin-bottom:30px;
              }
              </style>
              </header>
              <body>
                <div class="errorPage">
                     <h3>Sorry, er is iets mis</h3>
                     <p>${err.message}</p>
                     <p>Status code:${err.status}</p>
                     <div>
                     <button onClick="backToHomePage()">Terug</button>
                 </div>
                </div>
              <script>
               function backToHomePage(){
                      window.location.href="/"
               }
              </script>
              </body>
              </html>
              `
              )
});
passport.use(new LocalStrategy({
    passReqToCallback:true
},
       function(req,username,password,done,selectedlanguage){
              db.query(`
              select users.id as id,users.username as username,users.password as password
              ,users.email as email,permissions.permissionName as permission from users 
              inner join permissions on permissions.id=users.permission
               where username=?
              `,[username],function(error,results,fields){
                     if(error){
                            // console.log("on error")
                            if(req.body.selectedlanguage=='Tigrina'){
                                   req.flash('error','ገለ ጸገም ተፈጢሩ ኣሎ እሞ ነዚ ጸገም ከነለልዮ መታን ኣብ ናይ መራኸቢና ቦታ ብምኻድ ነዚ ሓበሬታ ዚ ንገሩና።')
                            }else{
                                   req.flash('error','There was unknown error please contact us')    
                            }
                            
                          return  done("db error,"+error)
                     }else if(results.length==0){
                     //       console.log("on not found")
                           if(req.body.selectedlanguage=='Tigrina'){
                            return done(null,false,req.flash('error','በዚ ስም ዚ ኣብ መአከቢ ሓበሬታና ክንረኽበኩም ኣይከኣልናን'))
                           }else{
                            return done(null,false,req.flash('error','User name not found.'))
                           }
                     }else{
                            // console.log("on found")
                            const hash=results[0].password.toString();
                            bcrypt.compare(password,hash,function(error,response){
                                 if(response==true){
                                    return done(null,{user_id:results[0].id,username:results[0].username,email:results[0].email,permission:results[0].permission});
                                 }else{
                                   if(req.body.selectedlanguage=='Tigrina'){
                                   return   done(null,false, req.flash('error','ቃለ ምስጢር ትኽክል የሎን።'))
                                   }else{
                                   return   done(null,false, req.flash('error','Password is incorrect.'))
                                   }
                                 }  
                            })
                     }
              })
       }
))
// app.use(function(err, req, res, next) {
//        console.log(err);
//    });
 
  
     //get street address
    // https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q='Sint Jac' Utre and type:adres
http.listen(process.env.ServerPort,function(){
        console.log('The server MAP.com is runninggggg on port',process.env.ServerPort);
 });