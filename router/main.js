const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const passport=require('passport')
const controller=require('../Controller/controller').controller
var helper=require('../Helper/Helper').helpers
const service=require('../Services/db').connectionInfo
var multer = require('multer');
// var helper=require('../helper/helper').helpers
const languagesAndAbbrivations = [
    {abbv:'Tgr',language:'ትግርኛ(Tigrina)'},
    {abbv:'af', language:'Afrikaans'},
    {abbv:'sq',language:'Albanian'},
    {abbv:'am', language:'Amharic'},
    {abbv:'ar', language:'Arabic'},
    {abbv:'hy', language:'Armenian'},
    {abbv:'az', language: 'Azerbaijani'},
    {abbv:'eu', language: 'Basque'},
    {abbv:'be', language: 'Belarusian'},
    {abbv:'bn', language: 'Bengali'},
    {abbv:'bs', language: 'Bosnian'},
    {abbv:'bg', language: 'Bulgarian'},
    {abbv:'ca', language: 'Catalan'},
    {abbv:'ceb', language: 'Cebuano'},
    {abbv:'ny', language: 'Chichewa'},
    {abbv:'zh-CN', language: 'Chinese (Simplified)'},
    {abbv:'zh-TW', language: 'Chinese (Traditional)'},
    {abbv:'co', language: 'Corsican'},
    {abbv:'hr', language: 'Croatian'},
    {abbv:'cs', language: 'Czech'},
    {abbv:'da', language: 'Danish'},
    {abbv:'nl', language: 'Dutch'},
    {abbv:'en', language: 'English'},
    {abbv:'eo', language: 'Esperanto'},
    {abbv:'et', language: 'Estonian',},
    {abbv:'tl', language: 'Filipino'},
    {abbv:'fi', language: 'Finnish'},
    {abbv:'fr', language: 'French'},
    {abbv:'fy', language: 'Frisian'},
    {abbv:'gl', language: 'Galician'},
    {abbv:'ka', language: 'Georgian'},
    {abbv:'de', language: 'German'},
    {abbv:'el', language: 'Greek'},
    {abbv:'gu', language: 'Gujarati'},
    {abbv:'ht', language: 'Haitian Creole'},
    {abbv:'ha', language: 'Hausa'},
    {abbv:'haw', language: 'Hawaiian'},
    {abbv:'he', language: 'Hebrew'},
    {abbv:'iw', language: 'Hebrew'},
    {abbv:'hi', language: 'Hindi'},
    {abbv:'hmn', language: 'Hmong'},
    {abbv:'hu', language: 'Hungarian'},
    {abbv:'is', language: 'Icelandic'},
    {abbv:'ig', language: 'Igbo'},
    {abbv:'id', language: 'Indonesian'},
    {abbv:'ga', language: 'Irish'},
    {abbv:'it', language: 'Italian'},
    {abbv:'ja', language: 'Japanese'},
    {abbv:'jw', language: 'Javanese'},
    {abbv:'kn', language: 'Kannada'},
    {abbv:'kk', language: 'Kazakh'},
    {abbv:'km', language: 'Khmer'},
    {abbv:'ko', language: 'Korean'},
    {abbv:'ku', language: 'Kurdish (Kurmanji)'},
    {abbv:'ky', language: 'Kyrgyz'},
    {abbv:'lo', language: 'Lao'},
    {abbv:'la', language: 'Latin'},
    {abbv:'lv', language: 'Latvian'},
    {abbv:'lt', language: 'Lithuanian'},
    {abbv:'lb', language: 'Luxembourgish'},
    {abbv:'mk', language: 'Macedonian'},
    {abbv:'mg', language: 'Malagasy'},
    {abbv:'ms', language: 'Malay'},
    {abbv:'ml', language: 'Malayalam'},
    {abbv:'mt', language: 'Maltese'},
    {abbv:'mi', language: 'Maori'},
    {abbv:'mr', language: 'Marathi'},
    {abbv:'mn', language: 'Mongolian'},
    {abbv:'my', language: 'Myanmar (Burmese)'},
    {abbv:'ne', language: 'Nepali'},
    {abbv:'no', language: 'Norwegian'},
    {abbv:'ps', language: 'Pashto'},
    {abbv:'fa', language: 'Persian'},
    {abbv:'pl', language: 'Polish'},
    {abbv:'pt', language: 'Portuguese'},
    {abbv:'pa', language: 'Punjabi'},
    {abbv:'ro', language: 'Romanian'},
    {abbv:'ru', language: 'Russian'},
    {abbv:'sm', language: 'Samoan'},
    {abbv:'gd', language: 'Scots Gaelic'},
    {abbv:'sr', language: 'Serbian'},
    {abbv:'st', language: 'Sesotho'},
    {abbv:'sn', language: 'Shona'},
    {abbv:'sd', language: 'Sindhi'},
    {abbv:'si', language: 'Sinhala'},
    {abbv:'sk', language: 'Slovak'},
    {abbv:'sl', language: 'Slovenian'},
    {abbv:'so', language: 'Somali'},
    {abbv:'es', language: 'Spanish'},
    {abbv:'su', language: 'Sundanese'},
    {abbv:'sw', language: 'Swahili'},
    {abbv:'sv', language: 'Swedish'},
    {abbv:'tg', language: 'Tajik'},
    {abbv:'ta', language: 'Tamil'},
    {abbv:'te', language: 'Telugu'},
    {abbv:'th', language: 'Thai'},
    {abbv:'tr', language: 'Turkish'},
    {abbv:'uk', language: 'Ukrainian'},
    {abbv:'ur', language: 'Urdu'},
    {abbv:'uz', language: 'Uzbek'},
    {abbv:'vi', language: 'Vietnamese'},
    {abbv:'cy', language:'Welsh'},
    {abbv:'xh', language:'Xhosa'},
    {abbv:'yi', language: 'Yiddish'},
    {abbv:'yo', language: 'Yoruba'},
    {abbv:'zu', language: 'Zulu'}
];
router.get('/getLanguages',function(req,res){
     res.json(languagesAndAbbrivations)
})
// router.get('/translation',function(req,res){
//     res.render('translation.ejs',{menus:[
//         {menu:'Home'},
//         {menu:'Login'},
//         {menu:'Registration'},
//         {menu:'Contact'},
//         {menu:'About us'},
//         {menu:'Translation'},
//        ],username:''})
// })
router.post('/updateTranslation',controller.updateTranslation)
router.get('/getTigrinaTranslation/:inputWord',controller.getTigrinaTranslation)
router.get('/getWord/:fromLanguage/:text/:toLanguage',controller.getWord)
router.use(bodyParser.json());
require('dotenv/config');
router.get('/about',(req,res)=>{
    res.render('about.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'Contact'},
        {menu:'About us'},
        // {menu:'Translation'},
       ],username:''})
 })
 router.get('/paymentSucceed',(req,res)=>{
    res.render('paymentSucceed.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'Contact'},
        {menu:'About us'},
        {menu:'Tigrina'}
       ],username:''})
 })
 router.get('/paymentCancled',(req,res)=>{
    res.render('paymentCancled.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'Contact'},
        {menu:'About us'},
        {menu:'Tigrina'},
        // {menu:'Translation'},
       ],username:''})
 })
 router.get('/contact',(req,res)=>{
     res.render('contact.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'Contact'},
        {menu:'About us'},
        // {menu:'Translation'},
       ],username:''})
 })
 router.get('/forgetpassword',(req,res)=>{
    res.render('forgetpassword.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'forgetpassword'},
      ],username:''})
})
router.get('/',(req,res)=>{
    const flash=req.flash();
    const error=flash.error || [];
    const success= flash.success || [];
    res.render('home.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'Contact'},
        {menu:'About us'},
        // {menu:'Translation'},
        {menu:'Tigrina'},
        
    ],username:'',error,success})
});
router.get('/login',(req,res)=>{
    const flash=req.flash();
    const error=flash.error || [];
    const success= flash.success || [];
    res.render('login.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'About us'},
        {menu:'Contact'},
        // {menu:'Translation'},
     ],username:'',error,success})
})
router.get('/JobTrans',(req,res)=>{
    var username=req.session.passport.user.username
    var userFullName=req.session.passport.user.userFullName;
    var userId=req.session.passport.user.user_id
    var permission=req.session.passport.user.permission;
    var menu=[]
    var userInfo={
          userFullName:userFullName,
          username:username,
          userId:userId,
    }
    menu.push({menu:'Job'})
    menu.push({menu:'Job register for employers'})
    menu.push({menu:'Settings'}) 
    // menu.push({menu:'adminJobTranslation'}) 
    if(permission=='admin'){
        menu.push({menu:'Admin'}) 
        menu.push({menu:'JobTrans'}) 
        menu.push({menu:'Trans'}) 
    }
    menu.push({menu:'Logout'})
    res.render('JobTrans.ejs',{menus:menu,userInfo:userInfo,username:userInfo.username})
})
router.get('/Trans',(req,res)=>{
    var username=req.session.passport.user.username
    var userFullName=req.session.passport.user.userFullName;
    var userId=req.session.passport.user.user_id
    var permission=req.session.passport.user.permission;
    var menu=[]
    var userInfo={
          userFullName:userFullName,
          username:username,
          userId:userId,
    }
    menu.push({menu:'Job'})
    menu.push({menu:'Job register for employers'})
    menu.push({menu:'Settings'}) 
    // menu.push({menu:'adminTranslation'}) 
    if(permission=='admin'){
        menu.push({menu:'Admin'}) 
        menu.push({menu:'JobTrans'}) 
        menu.push({menu:'Trans'}) 
    }
    menu.push({menu:'Logout'})
    res.render('Trans.ejs',{menus:menu,userInfo:userInfo,username:userInfo.username})
})
router.get('/getListsOfProfessions/:term/:language',controller.getListsOfProfessionsOnAutoCompleteUserInput)
router.get('/getListsOfLocations/:profession/:location/:language',controller.getListsOfLocations)
router.get('/jobs',helper.authenticationMiddleware(),(req,res)=>{
    var username=req.session.passport.user.username
    var userId=req.session.passport.user.user_id
    var permission=req.session.passport.user.permission;
    var menu=[]
    var userInfo={
          username:username,
          userId:userId,
    }
    menu.push({menu:'Job'})
    menu.push({menu:'Job register for employers'})
    if(permission=='admin'){
        menu.push({menu:'Admin'}) 
        menu.push({menu:'JobTrans'}) 
        menu.push({menu:'Trans'}) 
    }
    menu.push({menu:'Settings'}) 
    menu.push({menu:'Logout'})
    res.render('jobs.ejs',{menus:menu,userInfo:userInfo,username:userInfo.username})
})
router.get('/admin',helper.authenticationMiddleware(),helper.authIsAdmin
,(req,res)=>{
    var username=req.session.passport.user.username
    var userId=req.session.passport.user.user_id
    var menu=[]
    var userInfo={
          username:username,
          userId:userId,
    }
    menu.push({menu:'Job'})
    menu.push({menu:'Job register for employers'})
    menu.push({menu:'Admin'}) 
    menu.push({menu:'JobTrans'}) 
    menu.push({menu:'Trans'}) 
    menu.push({menu:'Settings'}) 
    menu.push({menu:'Logout'})
    res.render('admin.ejs',{menus:menu,userInfo:userInfo,username:userInfo.username})
})
router.get('/jobRegister',helper.authenticationMiddleware(),(req,res)=>{
    var username=req.session.passport.user.username
    var userFullName=req.session.passport.user.userFullName;
    var userId=req.session.passport.user.user_id
    var permission=req.session.passport.user.permission;
    var menu=[]
    var userInfo={
          userFullName:userFullName,
          username:username,
          userId:userId,
    }
    menu.push({menu:'Job'})
    menu.push({menu:'Job register for employers'})

    
    menu.push({menu:'Settings'}) 
    if(permission=='admin'){
        menu.push({menu:'Admin'}) 
        menu.push({menu:'JobTrans'}) 
        menu.push({menu:'Trans'}) 
    }
    menu.push({menu:'Logout'})
    res.render('jobRegister.ejs',{menus:menu,userInfo:userInfo,username:userInfo.username})
})
router.get('/mysettings',helper.authenticationMiddleware(),(req,res)=>{
    var username=req.session.passport.user.username
    var userId=req.session.passport.user.user_id
    var permission=req.session.passport.user.permission;
    var menu=[]
    var userInfo={
          username:username,
          userId:userId,
    }
    menu.push({menu:'Job'})
    menu.push({menu:'Job register for employers'})
    menu.push({menu:'Settings'})
    if(permission=='admin'){
        menu.push({menu:'Admin'}) 
        menu.push({menu:'JobTrans'}) 
        menu.push({menu:'Trans'}) 
    }
    menu.push({menu:'Logout'})
    res.render('settings.ejs',{menus:menu,userInfo:userInfo,username:userInfo.username})
})
router.get('/getUserInfo/:userId/:language',helper.authenticationMiddleware(),controller.getUserInfo)
router.get('/isThisUserHasPaymentDone',function(req,res){
    res.json('no')
})
router.post('/payment',async function(req,res){
    // console.log("hiiiiii")
    var info={}
    info.name=req.body.paymentInfo.name;
    info.email=req.body.paymentInfo.email;
    info.amount=10.00
    // console.log(info)
    // const mollie = require('@mollie/api-client');
    // const mollieClient = mollie({ apiKey: 'test_TPWASauyBDuWrPncnVHjBykahGBcgW' });
    const { createMollieClient,Payment } = require('@mollie/api-client');
     const mollieClient = createMollieClient({ apiKey: 'test_TPWASauyBDuWrPncnVHjBykahGBcgW' });
    const orderId = new Date().getTime();
    // var myamount=info.amount
    //SEND EMAIL OF THE  ORDER TO CUSTOMER
        // var mailToCustomer={}
        // mailToCustomer.email=data.email;
        // mailToCustomer.languageKey=data.languageKey;
        // mailToCustomer.requestCode='orders'
        // mailToCustomer.key=orderId
        // sendEmailTo(mailToCustomer,function(error,result){
        // })
    // mollieClient.payments
    // .create({
    //   amount: { value:myamount, currency: 'EUR' },
    //   description: 'New payment',
    //   redirectUrl:'http://localhost:3000/payment',
    //   webhookUrl:'http://localhost:3000',
    //   metadata: { orderId },
    // })
    // .then(payment => {
    //    res.redirect(payment.getPaymentUrl());
    // })
    // mollieClient.payments.create({
    //     amount: {
    //       value:    '10.00',
    //       currency: 'EUR'
    //     },
    //     description: 'My first API payment',
    //     redirectUrl: 'http://localhost:3000/paymentSucceed',
    //     webhookUrl:  'http://localhost:3000/paymentCancled'
    //   }).then(payment => {
    //         console.log("payment")
    //         console.log(payment)
    //        //   res.redirect(payment.getCheckoutUrl())
    //     })
    //     .catch(error => {
    //         console.log("error")
    //         console.log(error)
    //       // Handle the error
    //     });
    // const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

// (async () => {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: '10.00', // You must send the correct number of decimals, thus we enforce the use of strings
      },
      description: 'My first payment',
      redirectUrl: 'https://webshop.example.org/order/12345/',
      webhookUrl: 'https://webshop.example.org/payments/webhook/',
      metadata: {
        order_id: '12345',
      },
    });

    console.log(payment);
  } catch (error) {
    console.warn(error);
  }
})
router.get('/getJobs/:profession/:location/:language',controller.getJobs)

router.post('/registerjob',controller.registerjob)
router.get('/getProfessions',controller.getProfessions)
router.get('/registration',(req,res)=>{
    const flash=req.flash();
    const error=flash.error || [];
    const success= flash.success || [];
    res.render('register.ejs',{menus:[
        {menu:'Home'},
        {menu:'Login'},
        {menu:'Registration'},
        {menu:'Contact'},
        {menu:'About us'},
        // {menu:'Translation'},
     ],username:'',error,success})
})
router.post('/checkUserEmail',controller.checkUserEmail)
router.get('/logout',function(req,res){
    req.logout();
    req.session.destroy();
    res.redirect('/')
})
router.get('/success',function(req,res){
    const flash=req.flash();
    const error=flash.error || [];
    const success= flash.success || [];
    res.render('success.ejs',{menus:['logout'],error,success})
})
router.get('/error',function(req,res){
    const flash=req.flash();
    const error=flash.error || [];
    const success= flash.success || [];
     res.render('error.ejs',{menus:['logout'],error,success})
 })
router.post('/login',passport.authenticate('local',{
        failureFlash:true,
        failureRedirect:'/login',
        failureMessage:"there was error"
    }),(req,res,next)=>{
        console.log("req.body when login")
        console.log(req.body)
        if(req.body.isThisPageCameThroughJobApply!=='no'){
            res.redirect('/applyForAjob')
        }
        res.redirect('/jobs')
    })
router.post('/userRegistration',controller.userRegistration)
router.get('/changepassword/:email/:language',controller.changepassword)
router.post('/changePasswordInDatabase',controller.changePasswordInDatabase)
router.post('/forgetpassword',controller.forgetpassword)
router.post('/updateProfession',controller.updateProfession)
router.post('/updateDescription',controller.updateDescription)
router.get('/getRegisteredJobs',controller.getRegisteredJobs)
router.get('/getSearchedWords',controller.getSearchedWords)
router.get('/getJobDescription/:id/:language',controller.getJobDescription)
router.get('/applyForAjob',helper.authenticationMiddleware2(),(req,res)=>{
    var username=req.session.passport.user.username
    var userId=req.session.passport.user.user_id
    var permission=req.session.passport.user.permission;
    var email=req.session.passport.user.email;
    var menu=[]
    var userInfo={
          username:username,
          userId:userId,
          email:email
    }
    menu.push({menu:'Job'})
    menu.push({menu:'Applyforjob'})
    menu.push({menu:'Job register for employers'})
    menu.push({menu:'Settings'})
    if(permission=='admin'){
        menu.push({menu:'Admin'}) 
        menu.push({menu:'JobTrans'}) 
        menu.push({menu:'Trans'}) 
    }
    menu.push({menu:'Logout'})
    res.render('applyForAjob.ejs',{menus:menu,userInfo:userInfo,username:userInfo.username})
})
router.post('/updateProfessionAtUserSettings',controller.updateProfessionAtUserSettings)
router.get('/getJobInfoOnUserApply/:id',controller.getJobInfoOnUserApply)
const { v4: uuidv4 } = require('uuid');
let uId=uuidv4()
var fileStorage= multer.diskStorage({
    destination: function (req,file, cb) {
        cb(null,'./public/cv')
    },
    filename: function (req, file, cb) {
        
        cb(null,uId+".pdf" );
    }
});
var numberOfFilesToBeUploadedAtOnce=1
var multStore=multer({storage:fileStorage}).single('filename',numberOfFilesToBeUploadedAtOnce)
router.post('/submitUserInfoToApplyForAjob',helper.authenticationMiddleware(),multStore,putInToDatabase)
async function putInToDatabase(req,res){
   let info={}
   info.cvId=uId+".pdf";
   info.userId=req.body.userId;
   let cvResult;
   if(req.file!==undefined){
    await service.updateUserCv(info)
    cvResult= JSON.stringify(await service.getMyCv(req.body.userId))
   }else{
    cvResult= JSON.stringify(await service.getMyCv(req.body.userId))
   }
   let parseCv=JSON.parse(cvResult)
   let cv=parseCv[0].cv
   info.text=`
   <div>
       <p> Name:${req.body.name}</p>
       <p>Address:${req.body.address}</p>
       <p>Post code:${req.body.postcode}</p>
       <p>Email:${req.body.jobApplierEmail}</p>
       <p>Telephone:${req.body.telephone}</p>
   </div>
    <div>
       <Strong class="text-mute">Motivation letter</Strong><br>
       <span>${req.body.coverLetter}</span>
    </div>
   `
   info.language=req.body.language
   info.tigrinaText=`
   <div>
       <p> ስም:${req.body.name}</p>
       <p>ኣድራሻ:${req.body.address}</p>
       <p>ፖስት  ኮድ:${req.body.postcode}</p>
       <p>ኢመይል:${req.body.jobApplierEmail}</p>
       <p>ተለፎን:${req.body.telephone}</p>
   </div>
    <div>
       <Strong class="text-mute">ናይ ምትብባዕ ደብዳቤ</Strong><br>
       <span>${req.body.coverLetter}</span>
    </div>
   `
   info.subject=`Applying for a job`
   info.tigrinaSubject=`ናይ ስራሕ ምልክታ`
   info.email=req.body.jobPosterEmail;
   info.filename=req.body.filename;
   info.cv=cv
   let result= helper.sendEmailTo(info)
   uId=uuidv4()
   let message='Submited successfully '
   let tigrinaMessage='ናብ ዋና ስራሕ ብትኽክል ተሰዲዱ ኣሎ'
   let mailReturnInfo=`
   <html>
       <title>Job apply</title>
       <header>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
       <style>
       .container{
           margin-left:20px;
           margin-top:40px;
       }
       </style>
       </header>
       <body>
       <div class="container">
           <div>
           <span>
               ${message}
           </span>
           </div>
           <div>
           <button onclick="backTo()" class="btn-primary">Go back</button>
           </div>
       </div>
       <script>
           function backTo(){
               window.location.href='/jobs'
           }
       </script>
       </body>
   </html>`
   let mailReturnInfoTigrina=`
   <html>
       <title>Job apply</title>
       <header>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
       <style>
       .container{
           margin-left:20px;
           margin-top:40px;
       }
       </style>
       </header>
       <body>
       <div class="container">
           <div>
           <span>
               ${tigrinaMessage}
           </span>
           </div>
           <div>
           <button onclick="backTo()" class="btn-primary">ንድሕሪት ተመለስ</button>
           </div>
       </div>
       <script>
           function backTo(){
               window.location.href='/jobs'
           }
       </script>
       </body>
   </html>`
   if(req.body.language=='Tigrina'){
    res.send(mailReturnInfoTigrina)
   }else{
    res.send(mailReturnInfo)
   }
  

}
router.post('/uploadCv',helper.authenticationMiddleware(),multStore,uploadCv)
async function uploadCv(req,res){
    let info={}
    info.cvId=uId+".pdf";
    info.userId=req.body.userId;
    await service.updateUserCv(info)
    res.redirect('/mysettings')
}
router.get('/getMyCv/:userId',helper.authenticationMiddleware(),controller.getMyCv)
router.post('/updateLocation',helper.authenticationMiddleware(),controller.updateLocation)
router.get('/getBranches',controller.getBranches)
module.exports=router

