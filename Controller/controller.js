
const service=require('../Services/db').connectionInfo
var helper=require('../Helper/Helper').helpers
const bcrypt =require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
var multer = require('multer');
exports.controller={
    getUserInfo : async (req,res)=>{
        console.log("req.params.userId.....")
        console.log(req.params.userId)
        try {
          let result= await service.getUserInfo(req.params.userId,req.params.language)
          res.json(result)
        } catch (error) {
            console.log("error",error)
            res.json("Something went wrong")
        }
    },
    getJobs:async (req,res)=>{
        console.log("req.params....")
        let profession=req.params.profession;
        let location=req.params.location;
        let language=req.params.language
        try {
            let result= await service.getJobs(profession,language,location)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    getListsOfProfessionsOnAutoCompleteUserInput:async(req,res)=>{
        try {
            let result= await service.getListsOfProfessionsOnAutoCompleteUserInput(req.params.term,req.params.language)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    getProfessions:async (req,res)=>{
        try {
            let result= await service.getProfessions()
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    registerjob:async(req,res)=>{
        try {
            let result= await service.registerjob(req.body.info)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    checkUserEmail:async (req,res)=>{
        try {
            let result= await service.checkUserEmail(req.body.userEmail)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    getListsOfLocations:async(req,res)=>{
        var profession=req.params.profession;
        var location=req.params.location;
        var language=req.params.language
        try {
            let result= await service.getListsOfLocations(profession,location,language)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    userRegistration:async (req,res)=>{
        let userPermissions=await service.getPermissions('user')
        let userRegistrationInfo={}
        userRegistrationInfo.username=req.body.username
        userRegistrationInfo.password=await bcrypt.hash(req.body.password,10);
        userRegistrationInfo.email=req.body.email;
        userRegistrationInfo.location=req.body.location;
        userRegistrationInfo.permission=userPermissions
        userRegistrationInfo.profession=req.body.professionInfo.profession
        userRegistrationInfo.professionDescription=req.body.professionInfo.professionDescription
        userRegistrationInfo.language=req.body.language
        userRegistrationInfo.registrationTime=helper.thisDate +" "+helper.thisTime;
        try {
            let result= await service.userRegistration(userRegistrationInfo)
            // let emailSendtInfo=await helper.sendEmailTo(info)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    changepassword:async (req,res)=>{
        var email=req.params.email
        var language=req.params.language;
        try {
            let result= await helper.changepassword(email,language)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    
    },
    changePasswordInDatabase:async(req,res)=>{
        let email=req.body.email;
        let language=req.body.language
        let newPassword=req.body.newPassword;
        let password=await bcrypt.hash(newPassword,10);
        try {
            let result= await service.changePasswordInDatabase(email,language,password)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          } 
    },
    forgetpassword:async(req,res)=>{
        var email=req.body.email;
        var language=req.body.language
        try {
            let result= await service.forgetpassword(email,language)
            console.log("result in forget jpa")
            console.log(result)
            // let sendMailInfo=await helper.sendEmailTo(result)
            res.json(result) 
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          } 
    },
    updateProfession:async(req,res)=>{
        let id=req.body.id;
        let tigrina=req.body.tigrina;
         console.log("req.body user info.....")
         console.log(req.body)
        try {
            let result= await service.updateProfession(id,tigrina)
            res.json("successfully updated")
          } catch (error) {
              console.log("error",error)
              res.json("Something went wrong")
          }
    },
    updateDescription:async(req,res)=>{
            var userId=req.body.userId;
            var professionDescription=req.body.professionDescription
            console.log("userId,professionDescription")
            console.log(userId,professionDescription)
            try {
                let result= await service.updateDescription(professionDescription,userId)
                res.json("successfully updated")
              } catch (error) {
                  res.json("Something went wrong")
              }
    },
    getWord:async(req,res)=>{
        let fromLanguage=req.params.fromLanguage;
        let text=req.params.text;
        let toLanguage=req.params.toLanguage;
        try {
            let result= await service.getWord(fromLanguage,text,toLanguage)
            res.json(result)
          } catch (error) {
              res.json("Something went wrong")
          }
    },
    getTigrinaTranslation:async(req,res)=>{
        let inputWord=req.params.inputWord;
        try {
            let result=await service.getTigrinaTranslation(inputWord)
            res.json(result)
        } catch (error) {
            res.json("something was wrong")
        }
    },
    updateTranslation:async(req,res)=>{
        let id=req.body.translationUpdateInfo.id;
        let english=req.body.translationUpdateInfo.english
        try {
            let result=await service.updateTranslation(id,english)
            res.json(result)
        } catch (error) {
            res.json("something was wrong")
        }
    },
    getRegisteredJobs:async(req,res)=>{
        try {
            let result= await service.getRegisteredJobs()
            res.json(result)
          } catch (error) {
              res.json("Something went wrong")
          }
    },
    getSearchedWords:async(req,res)=>{
        try {
            let result=await service.getSearchedWords()
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    },
    getJobDescription:async(req,res)=>{
        try {
            let result=await service.getJobDescription(req.params.id,req.params.language)
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    },
    getJobInfoOnUserApply:async(req,res)=>{
        console.log("req.....",req.params.id)
        try {
            let result=await service.getJobInfoOnUserApply(req.params.id)
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    },
    submitUserInfoToApplyForAjob:async(req,res)=>{
       
        try {
            let info={}
            info.text=`this is ${req.body.jobApplierEmail}`
            info.subject=`Applying for a job`
            info.email=req.body.jobPosterEmail;
            info.filename=req.body.filename;
            let result= helper.sendEmailTo(info)
            res.send(`
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
                        Submited successfully
                    </span>
                    <div>
                      ${result}
                    </div>
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
            </html>
            `)
        } catch (error) {
            
        }
    },
    getMyCv:async(req,res)=>{
        try {
            let result=await service.getMyCv(req.params.userId)
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    },
    updateLocation:async(req,res)=>{
        console.log(req.body)
        let info={}
        info.userId=req.body.userId;
        info.location=req.body.location;
        try {
            let result=await service.updateLocation(info)
            console.log("result.....")
            console.log(result)
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    },
    updateProfessionAtUserSettings:async(req,res)=>{
        try {
            let result=await service.updateProfessionAtUserSettings(req.body.userId,req.body.profession)
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    },
    getBranches:async(req,res)=>{
        try {
            let result=await service.getBranches()
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    }
}
function upload(){
    var fileStorage= multer.diskStorage({
        destination: function (req,file, cb) {
            cb(null,'./public/cv')
        },
        filename: function (req, file, cb) {
            console.log("file....mmmmmmm")
            console.log( file );
            cb(null,file.originalname );
        }
    });
    var numberOfFilesToBeUploadedAtOnce=1
    multer({storage:fileStorage}).single('filename',numberOfFilesToBeUploadedAtOnce)
    
}