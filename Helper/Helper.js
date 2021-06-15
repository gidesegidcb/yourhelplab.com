
const nodemailer = require('nodemailer');
const passport=require('passport')
const bcrypt =require('bcryptjs');
var permissionInfo=require('../permissions/permission').permissionInfo
const createError=require('http-errors')
const translate = require("googletrans").default;
let date_ob = new Date();
let Cdate_ob = new Date();
let Cdate = ("0" + Cdate_ob.getDate()).slice(-2);
let Cmonth = ("0" + (Cdate_ob.getMonth() + 1)).slice(-2);
let Cyear = Cdate_ob.getFullYear();
let Chours = Cdate_ob.getHours();
let Cminutes = Cdate_ob.getMinutes();
let Cseconds = Cdate_ob.getSeconds();
let thisDate=Cdate+"-"+Cmonth+"-"+Cyear
let thisTime=Chours+":"+Cminutes+":"+Cseconds
  passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
  passport.deserializeUser(function(user_id, done) {
      done(null, user_id);
  });
  function authenticationMiddleware(){
      return (req,res,next)=>{
          if(req.isAuthenticated()){
            return next();
          } 
          res.redirect('/')
      }
  }
  function authenticationMiddleware2(){
    return (req,res,next)=>{
        if(req.isAuthenticated()){
          return next();
        } 
        res.redirect('/login')
    }
}
  const authIsAdmin=(req,res,next)=>{
    permissionInfo.isAdmin(req.user,function(error,result){
        try {
            if(result==true){
              return next()
            }
            return next(createError(403,"U mag deze pagina niet zien"))
        } catch (err) {
            console.log(error)
            res.json("There is something wrong")
        }
    })
}
  
exports.helpers={
    thisDate:thisDate,
    thisTime:thisTime,
    authenticationMiddleware:authenticationMiddleware,
    authenticationMiddleware2:authenticationMiddleware2,
    changepassword:(email,language)=>{
        var myhtml
        return new Promise((resolve,reject)=>{
            if(language=='Tigrina'){
                myhtml=`
                <html>
                <title>www.yourhelplab.com ምቕያር ቃለ ምስጢር</title>
                <header>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css?family=Khand&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <!-- <script src='https://kit.fontawesome.com/a076d05399.js'></script> -->
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                </header>
                <body>
                    <div class="panel panel-primary" style="margin-left:100px;margin-right:20px;margin-top:50px;">
                    <p>www.yourhelplab.com</p>
                    <hr>
                        <div class="class="panel-heading"">
                            <h1>ምቕያር ቃለ ምስጢር</h1>
                        </div>
                        <div class="panel-body">
                            <p id="language" hidden>`+language+`</p>`+
                            `<p id="email" hidden>`+email+`</p>`+
                            `<label>ሓዲሽ ቃለ ምስጢር</label><br>
                            <input type="password" placeholder="ሓዲሽ ቃለ ምስጢር"  id="newPassword"><br><br>
                            <label>ቃለ ምስጢር ድገምዎ</label><br>
                            <input type="password" placeholder="ቃለ ምስጢር ድገምዎ"  id="repeatPassword"><br><br>
                            <button onClick="changePassword()">በዚ የእቲየዮ ዘለኹ ቃለ ምስጢር ቀይርለይ</button><br><br>
                            <p id="validatorId"></p><br>
                            <span id="result"></span>
                        </div>
                    </div>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                    <script>
                        function changePassword(){
                            var email=document.getElementById('email').textContent
                            var language=document.getElementById('language').textContent
                            var newPassword=document.getElementById('newPassword').value;
                            var repeatPassword=document.getElementById('repeatPassword').value;
                            var validatorId=document.getElementById('validatorId')
                            if(newPassword=='' || newPassword==null){
                            validatorId.innerHTML='ቃለ ምስጢር የእትዉ'
                            validatorId.style.color='red'
                            }else{
                            validatorId.innerHTML='';
                            if(newPassword==repeatPassword){
                                axios.post('/changePasswordInDatabase',{
                                        email,
                                        newPassword,
                                        language
                                }).then(function(response){
                                        var result=document.getElementById('result')
                                        result.innerHTML=response.data
                                        result.style.color='green'
                                        console.log(response.data)
                                })
                                
                            }else{
                                validatorId.innerHTML='ኣብ ቀዳመይቲ ቦክስ ዘእተኹማ ቃለ ምስጢር ምስ ኣብታ ካልአይቲ ቦክስ ዘእተኹማ ቃለ ምስጢር ሓደ ዓይነት ኣይኮናን።እታ ኣብታ ቀዳመይቲ መእተዊ ቃለ ምስጢር ዘእተኹማ ምስታ ካልአይቲ ሓደ ዓይነት ክኾና ኣለወን።'
                                validatorId.style.color='red'
                            }
                            }
                        }
                    </script>
                </body>
                </html>
            `
            }else{
                myhtml=`
                <html>
                <title>www.yourhelplab.com change passowrd</title>
                <header>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css?family=Khand&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <!-- <script src='https://kit.fontawesome.com/a076d05399.js'></script> -->
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                </header>
                <body>
                    <div class="panel panel-primary" style="margin-left:100px;margin-right:20px;margin-top:50px;">
                        <p>www.yourhelplab.com</p>
                    <hr>
                        <div class="class="panel-heading"">
                            <h1>Change password</h1>
                        </div>
                        <div class="panel-body">
                            <p id="language" hidden>`+language+`</p>`+
                            `<p id="email" hidden>`+email+`</p>`+
                            `<label>New password</label><br>
                            <input type="password" placeholder="New password"  id="newPassword"><br><br>
                            <label>Confirm</label><br>
                            <input type="password" placeholder="confirm password"  id="repeatPassword"><br><br>
                            <button onClick="changePassword()">Change</button><br><br>
                            <p id="validatorId"></p><br>
                            <span id="result"></span>
                        </div>
                    </div>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                    <script>
                        function changePassword(){
                            var email=document.getElementById('email').textContent
                            var language=document.getElementById('language').textContent
                            var newPassword=document.getElementById('newPassword').value;
                            var repeatPassword=document.getElementById('repeatPassword').value;
                            var validatorId=document.getElementById('validatorId')
                            if(newPassword=='' || newPassword==null){
                            validatorId.innerHTML='Enter password'
                            validatorId.style.color='red'
                            }else{
                            validatorId.innerHTML='';
                            if(newPassword==repeatPassword){
                                axios.post('/changePasswordInDatabase',{
                                        email,
                                        newPassword,
                                        language
                                }).then(function(response){
                                        var result=document.getElementById('result')
                                        result.innerHTML=response.data
                                        result.style.color='green'
                                        console.log(response.data)
                                })
                                
                            }else{
                                validatorId.innerHTML='Password mismatch'
                                validatorId.style.color='red'
                            }
                            }
                        }
                    </script>
                </body>
                </html>
            `
            }
          return resolve(myhtml)
        })
        
        
    },
    sendEmailTo:(info)=>{
        return new Promise((resolve,reject)=>{
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'yourhelplab@gmail.com', // Your email id
                    pass: 'yourhelplab@123' // Your password
                },
                tls:{
                  rejectUnauthorized:false
                }
             });
            let text = info.text;
            let mailOptions = {}
            if(info.language=='Tigrina'){
                mailOptions = {
                    from:transporter.options.auth, // sender address
                    to: info.email, 
                    subject: info.tigrinaSubject, 
                    html:info.tigrinaText,
                    attachments:[
                        {   filename: 'cv.pdf',
                            path:'./public/cv/'+info.cv,
                            contentType: 'application/pdf' 
                        }
                    ]
                };
            }else{
                mailOptions = {
                    from:transporter.options.auth, // sender address
                    to: info.email, 
                    subject: info.subject, 
                    html:text,
                    attachments:[
                        {   filename: 'cv.pdf',
                            path:'./public/cv/'+info.cv,
                            contentType: 'application/pdf' 
                        }
                    ]
                };
            }
            
            transporter.sendMail(mailOptions,function(error,info){
              if(error){
                return reject(error)
              }else{
                return resolve("Email has been send succefully")
              }
            })
        })
    },
    authIsAdmin:authIsAdmin
}
// this is helper