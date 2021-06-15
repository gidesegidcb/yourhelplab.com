// const helper=require('../Helpers/helper').helpers
const mysql = require('mysql');
// const translate = require("googletrans").default;
var helper=require('../Helper/Helper').helpers
const fs = require('fs')
// var alphabetInfo=require('../alphabets.js')
// var alphabetsWithComma=alphabetInfo.alphabetsWithComma
// var familyPositions=alphabetInfo.familyPositions
// var tigrinaEnglishAphabets=alphabetInfo.tigrinaEnglishAphabets
require('dotenv/config');
const connection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    port:process.env.port
});
const translationDbConnection=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.translationDatabase,
    port:process.env.port
});
connection.connect();
exports.connectionInfo={
    connection:connection,
    getUserInfo:(userId,language)=>{
        console.log("userId")
        console.log(userId)
        return new Promise((resolve,reject)=>{
            if(language=='Tigrina'){
                connection.query(`select users.id as id,users.email as email,
                users.location as location,professions.tigrina as profession,
                users.professionDescription as professionDescription,
                users.cv as cv
                 from users inner join professions on professions.id=users.profession
                 where users.id=?`,userId,function(error,row){
                    if(!!error){
                        console.log("error")
                        console.log(error)
                       return reject("there was something wrong")
                    }else{
                        console.log("row...user info")
                        console.log(row)
                       return resolve(row)
                    }
               })
            }else{
                connection.query(`select users.id as id,users.email as email,
                users.location as location,professions.profession as profession,
                users.professionDescription as professionDescription,
                users.cv as cv
                 from users inner join professions on professions.id=users.profession
                 where users.id=?`,userId,function(error,row){
                    if(!!error){
                       return reject("there was something wrong")
                    }else{
                       return resolve(row)
                    }
               })
            }
            
        })
    },
    getJobs:(profession,language,location)=>{
        return new Promise((resolve,reject)=>{
            if(language=='Tigrina'){
                connection.query("select id,tigrina from professions where tigrina=? limit 1",profession,function(error,row){
                    if(!!error){
                        console.log(error)
                     return reject("there was something wrong")
                    }else{
                        let professionId=row[0].id;
                        let professionName=profession
                        connection.query(`select jobs.id as id,jobs.sector as sector,professions.tigrina as profession,
                        jobs.locations as locations,jobs.url as url,jobs.jobDescriptionCut as description,jobs.registrationTime as registrationTime,
                        jobs.jobDescriptionTitle as jobDescriptionTitle
                         from jobs 
                         inner join professions on professions.id=jobs.profession 
                         where jobs.profession=? and jobs.locations=? ORDER BY jobs.id  DESC`,[professionId,location],function(error,row){
                            if(!!error){
                                console.log(error)
                               return reject("there was something wrong")
                            }else{
                               return resolve(row)
                            }
                        })
                    }
                })
            }else{
                connection.query("select id,profession from professions where profession=? limit 1",profession,function(error,row){
                    if(!!error){
                        console.log(error)
                       return reject("there was something wrong")
                    }else{
                        let professionId=row[0].id
                        connection.query(`
                        select jobs.id as id,jobs.sector as sector,professions.profession as profession,
                        jobs.locations as locations,jobs.url as url,jobs.jobDescriptionCut as description,
                        jobs.registrationTime as registrationTime,jobs.jobDescriptionTitle as jobDescriptionTitle
                         from yourhelplab.jobs 
                         inner join yourhelplab.professions on professions.id=jobs.profession 
                        where jobs.profession=? and jobs.locations=?
                        `,[professionId,location],function(error,row2){
                            if(!!error){
                                console.log("error",error)
                            }else{
                                return resolve(row2)
                            }
                        })
                    }
                })
            }
        })
    },
    getListsOfProfessionsOnAutoCompleteUserInput:(term,language)=>{
        return new Promise((resolve,reject)=>{
            if(language=='Tigrina'){
                let checkIfInputIsFromEnglishAlphabetsOrNot=isCharacterALetter(term)
                if(checkIfInputIsFromEnglishAlphabetsOrNot==true){
                    let english_tigrina_letters=convertNamesToTigrina(term)
                    // convertNamesToTigrina(term,function(error,result){
                        connection.query("select * from professions where tigrina like '%"+english_tigrina_letters+"%' group by tigrina",function(error,row){
                            if(!!error){
                              console.log(error)
                              return reject("there was something wrong")
                            }else{
                                return resolve(row)
                            }
                        })
                    // })
                }else{
                    connection.query("select * from professions where tigrina like '%"+term+"%' group by tigrina",function(error,row){
                        if(!!error){
                          console.log(error)
                          return reject("there was something wrong")
                        }else{
                            return resolve(row)
                        }
                    })
                }
                
                
            }else{
                connection.query("select * from professions where profession like '%"+term+"%' group by profession",function(error,row){
                    if(!!error){
                      console.log(error)
                      return reject("there was something wrong")
                    }else{
                        console.log("list of professions")
                        console.log(row)
                        return resolve(row)
                    }
                })
            }
           
        })
       
    },
    getProfessions:()=>{
        return new Promise((resolve,reject)=>{
            connection.query("select * from professions",function(error,row){
                if(!!error){
                    console.log(error)
                    return reject("there was something wrong")
                }else{
                    return resolve(row)
                }
            })
        })
    },
    registerjob:(info)=>{
         let reply={}
        return new Promise((resolve,reject)=>{
            if(info.language=='Tigrina'){
                connection.query("select id from professions where tigrina=? limit 1",info.profession,function(error,row){
                    if(!!error){
                        reply="there was something wrong"
                        return reject(reply)
                    }else{
                        info.profession=row[0].id
                        if(info.description.length>100){
                            info.jobDescriptionCut=info.description.substr(0,100)+" ..... "
                        }else{
                            info.jobDescriptionCut=info.description.substr(0,100)
                        }
                        info.registrationTime=helper.thisDate
                        connection.query('INSERT INTO jobs SET ?',info,function(error2,row1){
                            if(!!error2){
                                console.log(error2)
                                reply.message="there was something wrong on registering a job into database"
                                return reject(reply)
                            }else{
                                reply.message="Job registered successfully"
                                reply.insertedId=row1.insertId
                                return resolve(reply)
                            }
                        }) 
                    }
                })
            }else{
                connection.query("select id from professions where profession=? limit 1",info.profession,function(error,row){
                    if(!!error){
                        console.log(error)
                        reply="there was something wrong"
                        return reject(reply)
                    }else{
                        info.profession=row[0].id
                        info.jobDescriptionTitle=info.jobDescriptionTitle
                        if(info.description.length>100){
                            info.jobDescriptionCut=info.description.substr(0,100)+" ..... "
                        }else{
                            info.jobDescriptionCut=info.description.substr(0,100)
                        }
                        info.registrationTime=helper.thisDate+" "+helper.thisTime
                        connection.query('INSERT INTO jobs SET ?',info,function(error2,row1){
                            if(!!error2){
                                console.log(error2)
                                reply.message="there was something wrong on registering a job into database"
                                return reject(reply)
                            }else{
                                console.log(row1.insertId)
                                reply.message="Job registered successfully"
                                reply.insertedId=row1.insertId
                                return resolve(reply)
                            }
                        }) 
                    }
                })
            }
        })
    },
    deleteRegisteredJob:(id)=>{
        let reply={}
        return new Promise((resolve,reject)=>{
            connection.query("DELETE FROM jobs WHERE id=?",id,function(error,row){
                if(!!error){
                    reply.message="there was something wrong"
                    return reject("there was something wrong")
                }else{
                    console.log("delted",row)
                    reply.message="Job deleted successfully"
                    return resolve("Job deleted successfully")
                }
            })
        })
    },
    checkUserEmail:(email)=>{
        return new Promise((resolve,reject)=>{
            connection.query("select id,email from users where email=?",email,function(error,row){
                if(!!error){
                    return reject("there was error")
                }else{
                    if(row.length==0){
                        return resolve("no")
                    }else{
                        return resolve("yes")
                    }
                }
            })
        })
    },
    getListsOfLocations:(profession,location,language)=>{
          return new Promise((resolve,reject)=>{
            if(language=='Tigrina'){
                connection.query("select id from professions where Tigrina=?",profession,function(error,row){
                    if(!!error){
                        console.log(error)
                        return reject("there was error")
                    }else{
                        if(row.length==0){
                            row=[{locations:'yelen'}]
                            // res.json(row)
                            return resolve(row)
                        }else{
                            var professionId=row[0].id;
                            connection.query("select * from jobs where profession=? and locations like '%"+location+"%' group by locations",professionId,function(error2,row2){
                                if(!!error2){
                                    console.log(error2)
                                    return reject("there was error")
                                }else{
                                    console.log("row")
                                    console.log(row)
                                    if(row2.length==0){
                                        connection.query("select * from jobs where profession=? group by locations",professionId,function(error3,row3){
                                            if(!!error3){
                                                console.log(error3)
                                                return reject("there was error")
                                            }else{
                                                row3.unshift({locations:'No data'})
                                                // res.json(row3)
                                                return resolve(row3)
                                            }
                                        })
                                    }else{
                                        // res.json(row2)
                                        return resolve(row2)
                                    }
                                    
                                }
                            })
                        }
                        
                    }
                })
            }else{
                connection.query("select id from professions where profession=?",profession,function(error,row){
                    if(!!error){
                        return reject("there was error")
                    }else{
                        if(row.length==0){
                            row=[{locations:'No data'}]
                            return resolve(row)
                        }else{
                            var professionId=row[0].id;
                            connection.query("select * from jobs where profession=? and locations like '%"+location+"%' group by locations",professionId,function(error2,row2){
                                if(!!error2){
                                    return reject("there was error")
                                }else{
                                    if(row2.length==0){
                                        row2=[{locations:'No data'}]
                                        connection.query("select * from jobs where profession=? group by locations",professionId,function(error3,row3){
                                            if(!!error3){
                                                return reject("there was error")
                                            }else{
                                                row3.unshift({locations:'No data'})
                                                return resolve(row3)
                                            }
                                        })
                                        
                                    }else{
                                        return resolve(row2)
                                    }
                                   
                                }
                            })
                        }
                        
                    }
                })
            }
          })
    },
    userRegistration:(userRegistrationInfo)=>{
        return new Promise((resolve,reject)=>{
            connection.query("select username from users where username=?",userRegistrationInfo.username,function(error,row){
                if(!!error){
                    console.log(error)
                    return reject("there was something wrong")
                }else{
                    if(row.length==0){
                        connection.query("select email from users where email=?",userRegistrationInfo.email,function(error2,row2){
                            if(!!error2){
                                console.log(error2)
                                return reject("there was something wrong")
                            }else{
                              if(row2.length==0){
                                getProfessionId(userRegistrationInfo.profession,userRegistrationInfo.language,function(error,result){
                                    if(result==null){
                                        return reject("there was something wrong")
                                    }else{
                                        userRegistrationInfo.profession=result
                                        console.log("userRegistrationInfo")
                                        console.log(userRegistrationInfo)
                                        connection.query('INSERT INTO users SET ?',userRegistrationInfo,function(error3,row3){
                                            if(!!error3){
                                                console.log(error3)
                                                return reject("there was something wrong")
                                            }else{
                                                return resolve("You have registered successfully.Thanks for registering with us.You can now go to the login page and start looking for work. ")
                                            }
                                        })
                                    }
                                    
                                })
                                
                              }else{
                                  return resolve("emailExist")
                              }
                            }
                        })
                    }else{
                        return resolve("usernameExist")

                    }
                }
            })
            // transporter.sendMail({
                                //     from:'info@duurzamedata.nl',
                                //     to:['gidesegid@gmail.com'],
                                //     subject: 'User Registration',
                                //     html:`<html>
                                //     <head>
                                //         <title>yourhelplab.com</title>
                                //         </head>
                                //         <body>`+
                                //             `<p>`+userRegistrationInfo.name +` `+`heeft een registratieverzoek ingediend.</p>`+
                                //             `<br>`+
                                //             `<label>Name:`+` `+userRegistrationInfo.name+`</label><br>`+
                                //             `<label>Organisatie:`+` `+userRegistrationRequests.organisatie+`</label><br>`+
                                //             `<label>Email:`+` `+userRegistrationRequests.email+`</label>`+
                                //         `</body>
                                //     </html>`,
                                //     ses: { // optional extra arguments for SendRawEmail
                                //         Tags: [{
                                //             Name: 'tag_name',
                                //             Value: 'tag_value'
                                //         }]
                                //     }
                                // }, (err, info) => {
                                //     if(!!err){
                                //         console.log("err",err)
                                //         // callback(null,err)
                                //     }else{
                                //         console.log(info.envelope);
                                //         console.log(info.messageId);
                                //         // callback(null,info.messageId)
                                //     }
                                // });
        })
    },
    changePasswordInDatabase:(email,language,password)=>{
        return  new Promise((resolve,reject)=>{
            // var password=await bcrypt.hash(newPassword,10);
            connection.query("select username,email from users where email=? limit 1",email,function(error,row){
                if(!!error){
                  console.log(error)
                  return reject("there was something wrong")
                }else{
                    if(row[0].username=='' || row[0].username==null || row[0].username==undefined){
                        if(language=='Tigrina'){
                            return resolve("ኢመይልኩም ኣብዚ ናትናን ሓበሬታ ኣይተረኽበን ።"+'<a href="/">ናብ መእተዊ ገጽ ንምኻድ ኣብዚ ጠውቑ።</a>')
                        }else{
                            return resolve("Email is invalid."+'<a href="/">Click here to go to home page</a>')
                        }
                        
                    }else{
                    connection.query("update users set password='"+password+"' where email=?",email,function(error,row){
                        if(!!error){
                            console.log(error)
                            return reject("there was something wrong")
                        }else{
                            if(language=='Tigrina'){
                                return resolve("ቃለ ምስጢርኩም ብትኽክል ተመስሪሑ ኣሎ።"+'<a href="/">ስለዚ ናብ ቀንዲ ገጽ ብምኻድ ሓዲሽ ዘእተኹሞ ቃለ ምስጢር ብምጥቃም ኣገልግሎትና ክትሳተፉ ትኽእሉ ኢኹም።ናብ ቀንዲ ገጽ ንምኻድ ኣብዚ ጠውቑ።</a>')
                            }else{
                                return resolve("Your password is successfully changed."+'<a href="/">You can click here to go to the home page now.</a>')
                            }
                            
                        }
                    })
                }
                }
            })
        })
    },
    forgetpassword:(email,language)=>{
       return new Promise((resolve,reject)=>{
        connection.query("select username,email from users where email=?",email,function(error,row){
            if(!!error){
             console.log(error)
             return reject("there was something wrong")
            }else{
                if(row.length==0){
                    return resolve("emailNotfound")
                }else{
                    var info={}
                    info.email=email;
                    if(language=='Tigrina'){
                        info.subject="ምቕያር ቃለ ምስጢር"
                        info.text='ክቡር/ቲ '+row[0].username+',  ቃለ ምስጢር ንምቅያር ኣብዚ www.yourhelplab.com ተወኪስኩም ኣለኹም . ኣብዚ  '+'www.yourhelplab.com/changepassword/'+info.email+'/'+language +' እንተጠዊቕኩም ናብ መቀየሪ ቃለ ምስጢር ከተሕልፈኩም ኢያ. መጠቀሚ ስምኩም '+row[0].username+' ኢዩ። www.yourhelplab.com/changepassword/'+info.email+'/'+language+' እንተዳ ኣብዚ ጠዊቅኩም ተዘይሰሪሑልኩም ነዚ ብ ሰመያዊ ሕብሪ ኮይና ዘላ ጽሕፍቲ ቀዲሕኩም ኣብ ናይ ኢንተረት መራኣዪ ወሲድኩም ተጠቀሙላ: '+'www.yourhelplab.com/changepassword/'+info.email+'/'+language
                      return resolve(info)
                    }else{
                        info.subject="Set Password"
                        info.text='Dear '+row[0].username+', a request has been made to reset your password for the web application www.yourhelplab.com. If you click on the link below you can set a new password. Your username is '+row[0].username+'. www.yourhelplab.com/changepassword/'+info.email+'/'+language+'  If the link above does not work, copy the following url : '+'www.yourhelplab.com/changepassword/'+info.email+'/'+language
                       return resolve(info)
                    }
                   
                }
            
            }
        })
       })
        
    },
    updateProfession:(id,tigrina)=>{
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE professions SET tigrina=? where id=?",[tigrina,id],function(error,row){
                if(!!error){
                   console.log(error)
                   return reject("there was something wrong")
                }else{
                   return resolve("successfully updated")
                }
            })
        })
    },
    updateDescription:(professionDescription,userId)=>{
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE users SET professionDescription=? where id=?",[professionDescription,userId],function(error,row){
                if(!!error){
                   console.log(error)
                   return reject("there was something wrong")
                }else{
                    return resolve("successfully updated")
                }
            })
        })
        
    },
    getWord:(fromLanguage,text,toLanguage)=>{
        let info={}
        info.fromLanguage=fromLanguage;
        info.toLanguage=toLanguage;
        info.word=text;
        return new Promise((resolve,reject)=>{
            if(fromLanguage=='en' && toLanguage=='Tgr'){
                translationDbConnection.query("select id,english,word_tigrina,description from english_tigrina_words where english=? group by word_tigrina",text,function(error,row){
                    if(!!error){
                        console.log(error)
                        return reject("there was something wrong")
                    }else{
                        let collectionOfTranslatedWord=[]
                        for(key in row){
                            collectionOfTranslatedWord.push(row[key].word_tigrina) 
                        }
                        info.translatedWord=collectionOfTranslatedWord.toString()
                        insertWordToSearchedwordsDictionary(info)
                        return resolve(row)
                    }
                })
            }else if(fromLanguage=='Tgr' && toLanguage=='en'){
                translationDbConnection.query("select english,word_tigrina,description from english_tigrina_words where word_tigrina=? group by english",text,function(error,row){
                    if(!!error){
                        console.log(error)
                        return reject("there was something wrong")
                    }else{
                        let collectionOfTranslatedWord=[]
                        for(key in row){
                            collectionOfTranslatedWord.push(row[key].english) 
                        }
                        info.translatedWord=collectionOfTranslatedWord.toString()
                        insertWordToSearchedwordsDictionary(info)
                        return resolve(row)
                    }
                })
            }else if(fromLanguage=='Tgr' && toLanguage!=='en'){
                translationDbConnection.query("select id,english,word_tigrina,description from english_tigrina_words where word_tigrina=? group by english",text,function(error,row){
                    if(!!error){
                        console.log(error)
                        return reject("there was something wrong")
                    }else{
                        var myarray=[]
                        for(key in row){
                            myarray.push(row[key].english)
                        }
                        var translationPackage={}
                        translate(myarray, toLanguage)
                        .then(function (result) {
                            console.log("result...")
                            console.log(result);
                            
                            translationPackage.word_tigrina=result.textArray
                            var data1=[]
                            for(var i = 0; i < result.textArray.length; i++)
                            {
                                data1.push({english:result.textArray[i]});
                            }
                            const unique = [...new Set(data1.map(item =>item.english))];
                            var data2=[]
                            for(var i = 0; i < unique.length; i++)
                            {
                                data2.push({english:unique[i]});
                            }
                            console.log("data2")
                            console.log(data2)
                            let collectionOfTranslatedWord=[]
                            for(key in data2){
                                collectionOfTranslatedWord.push(data2[key].english)
                            }
                            info.translatedWord=collectionOfTranslatedWord.toString()
                            if(data2.length==0){
                                return resolve("no result")
                            }else{
                                insertWordToSearchedwordsDictionary(info)
                                return resolve(data2)
                            }
                            
                            
                        })
                        .catch(function (error) {
                            console.log("errorrooo..."+error)
                            return reject("there was something wrong")
                        });
                    }
                })
            }else if(fromLanguage!=='en' && toLanguage=='Tgr'){
                translate(text, 'en')
                        .then(function (result) {
                        console.log("result.textArray;") // [ 'Hallo', 'Welt' ]
                        console.log(result.textArray.join(''))
                        translationDbConnection.query("select id,english,word_tigrina,description from english_tigrina_words where english=?",result.textArray.join(''),function(error,row){
                                if(!!error){
                                    console.log(error)
                                    return reject("there was something wrong")
                                }else{
                                    let collectionOfTranslatedWord=[]
                                    for(key in row){
                                        collectionOfTranslatedWord.push(row[key].word_tigrina) 
                                    }
                                    if(row.length==0){

                                    }else{
                                        info.translatedWord=collectionOfTranslatedWord.toString()
                                        insertWordToSearchedwordsDictionary(info) 
                                    }
                                   
                                    return resolve(row)
                                }
                            })
                        })
                        .catch(function (error) {
                        console.log(error);
                        res.json(error)
                        });
            }
        })
    },
    getTigrinaTranslation:(inputWord)=>{
        return new Promise((resolve,reject)=>{
            translationDbConnection.query("select * from english_tigrina_words where english like '"+inputWord+"%'",function(error,row){
                if(!!error){
                   console.log(error)
                   return reject("there was something wrong")
                }else{
                //   res.json(row)
                  return resolve(row)
                }
            })
        })
    },
    updateTranslation:(id,english)=>{
        return new Promise((resolve,reject)=>{
            translationDbConnection.query("UPDATE english_tigrina_words SET  english='"+english+"' where id=?",id,function(error,row){
                if(!!error){
                  console.log(error)
                  return reject("there was something wrong")
                }else{
                    return resolve("successfully updated")
                }
            })
        })
    },
    getRegisteredJobs:()=>{
        return new Promise((resolve,reject)=>{
            connection.query(`select jobs.id as id,jobs.sector as sector,professions.tigrina as profession,
                        jobs.locations as locations,jobs.url as url,jobs.description as description,jobs.registrationTime as registrationTime
                         from jobs inner join professions on professions.id=jobs.profession  ORDER BY jobs.id  DESC
            `,function(error,row){
                if(!!error){
                    return reject("there was something wrong")
                }else{
                    return resolve(row)
                }
            })
        })
    },
    getPermissions:(user)=>{
         return new Promise((resolve,reject)=>{
             connection.query("select id from permissions where permissionName=?",user,function(error,row){
                if(!!error){
                    console.log(error)
                     return reject("there was something wrong")
                }else{
                    return resolve(row[0].id)
                }
             })
             
         })
    },
    getSearchedWords:()=>{
        return new Promise((resolve,reject)=>{
            translationDbConnection.query(`
            select * from searchedwords ORDER BY id desc
            `,function(error,row){
                if(!!error){
                    reject("there was something wrong")
                }else{
                    return resolve(row)
                }
            })
        })
    },
    getJobDescription:(id,language)=>{
        return new Promise((resolve,reject)=>{
            if(language=='Tigrina'){
                connection.query(`
                select jobs.id as id,jobs.sector as sector,professions.profession as profession,
                jobs.locations as locations,jobs.url as url,jobs.description as description,
                jobs.registrationTime as registrationTime,jobs.jobDescriptionTitle as jobDescriptionTitle,
                jobs.companyName as companyName,jobs.jobPosterIsEmployer as jobPosterIsEmployer,
                jobs.isJobRemoteWork as isJobRemoteWork,jobs.email as email,
                jobs.jobPosterName as jobPosterName,jobs.jobPosterTelephone as jobPosterTelephone,
                branches.tigrina as companyBranche,jobs.numberOfEmployeesInTheCompany as numberOfEmployeesInTheCompany,
                jobs.salary as salary,jobs.addtionalReimbursements as addtionalReimbursements
                from yourhelplab.jobs 
                inner join yourhelplab.professions on professions.id=jobs.profession 
                inner join yourhelplab.branches on branches.id=jobs.companyBranche
                where jobs.id=?`,id,function(error,row){
                    if(!!error){
                        console.log(error)
                        return reject("there was something wrong")
                    }else{
                        console.log("row..")
                        console.log(row)
                        return resolve(row)
                    }
                })
            }else{
                connection.query(`
                select jobs.id as id,jobs.sector as sector,professions.profession as profession,
                jobs.locations as locations,jobs.url as url,jobs.description as description,
                jobs.registrationTime as registrationTime,jobs.jobDescriptionTitle as jobDescriptionTitle,
                jobs.companyName as companyName,jobs.jobPosterIsEmployer as jobPosterIsEmployer,
                jobs.isJobRemoteWork as isJobRemoteWork,jobs.email as email,
                jobs.jobPosterName as jobPosterName,jobs.jobPosterTelephone as jobPosterTelephone,
                branches.branch as companyBranche,jobs.numberOfEmployeesInTheCompany as numberOfEmployeesInTheCompany,
                jobs.salary as salary,jobs.addtionalReimbursements as addtionalReimbursements
                from yourhelplab.jobs 
                inner join yourhelplab.professions on professions.id=jobs.profession 
                inner join yourhelplab.branches on branches.id=jobs.companyBranche
                where jobs.id=?`,id,function(error,row){
                    if(!!error){
                        console.log(error)
                        return reject("there was something wrong")
                    }else{
                        console.log("row..")
                        console.log(row)
                        return resolve(row)
                    }
                })
            }
            
        })
    },
    getJobInfoOnUserApply:(id)=>{
        console.log("id....",id)
        return new Promise((resolve,reject)=>{
            connection.query(`select jobs.id as id,jobs.email as email,jobs.sector as sector,professions.tigrina as profession,
            jobs.locations as locations,jobs.url as url,jobs.description as description,jobs.registrationTime as registrationTime,
            jobs.jobDescriptionTitle as jobDescriptionTitle from jobs inner join professions on professions.id=jobs.profession 
             where jobs.id=?`,id,function(error,row){
                if(!!error){
                   return reject("there was something wrong")
                }else{
                   return resolve(row)
                }
            })
        })
    },
    updateUserCv:(info)=>{
        return new Promise((resolve,reject)=>{
            connection.query(`select cv from users where id=? limit 1`,info.userId,function(error,row){
                if(!!error){
                   return reject("there was something wrong")
                }else{
                    console.log("info on update")
                    console.log(info)
                  if(row.length==1){
                      removeFile(row[0].cv,function(error,result){
                        console.log(result)
                        connection.query(`UPDATE users Set cv=? where id=?`,[info.cvId,info.userId],function(error,row){
                            if(!!error){
                              console.log(error)
                              return reject("there was something wrong")
                            }else{
                                console.log("row....",row)
                               return resolve(row)
                            }
                        })
                      })
                  }else{
                    connection.query(`UPDATE users Set cv=? where id=?`,[info.cvId,info.userId],function(error,row){
                        if(!!error){
                          console.log(error)
                          return reject("there was something wrong")
                        }else{
                           return resolve(row)
                        }
                    }) 
                  }
                }
            })
            
        })
    },
    getMyCv:(userId)=>{
        return new Promise((resolve,reject)=>{
            connection.query("select cv from users where id=?",userId,function(error,row){
                if(!!error){
                     return reject("there was something wrong")
                }else{
                    return resolve(row)
                }
            })
        })
    },
    updateLocation:(info)=>{
        return new Promise((resolve,reject)=>{
            connection.query('update users set location=? where id=?',[info.location,info.userId],function(error,row){
                if(!!error){
                    console.log("error",error)
                    return reject("there was something wrong")
                }else{
                    return resolve(row)
                }
            })
        })
    },
    updateProfessionAtUserSettings:(userId,profession)=>{
        console.log("userprofe")
        console.log(userId,profession)
        return new Promise((resolve,reject)=>{
            connection.query(`UPDATE users set profession=? where id=?`,[profession,userId],function(error,row){
                if(!!error){
                    return reject("there was something wrong")
                }else{
                    return resolve(row)
                }
            })
        })
    },
    getBranches:()=>{
        return new Promise((resolve,reject)=>{
            connection.query(`select * from branches`,function(error,row){
                if(!!error){
                    return reject("there was something wrong")
                }else{
                    return resolve(row)
                }
            })
        })
    }

}
function insertWordToSearchedwordsDictionary(info){
    translationDbConnection.query(`select * from searchedwords 
    where fromLanguage=? and toLanguage=?
     and translatedWord=? and word=?`,
    [info.fromLanguage,info.toLanguage,info.translatedWord,info.word],function(error,row){
      if(!!error){

      }else{
          if(row.length==0){
            translationDbConnection.query('INSERT INTO searchedwords SET ?',info,function(error,row){
                if(!!error){
                   console.log("error on inserting searched words",error)
                }else{
                    console.log("inserted to searchedwords")
                }
            })
          }else{
            console.log("this word is already searched")
          }
      }

    })
}
function removeFile(fileName,callback){
   fs.unlink('./public/cv/'+fileName, function(err) {
        if(err && err.code == 'ENOENT') {
            callback(err,null)
        } else if (err) {
            callback(error,null)
        } else {
            callback(null,"deleted")
        }
    });
}
function getAllProfessions(){
    let profession=[]
    connection.query("select id,profession from professions",function(error,row){
        for(key in row){
            profession.push({1:row[key].id,english:row[key].profession})
        }
        console.log("profession")
        console.log(profession)
    })
}
function getProfessionId(profession,language,callback){
    if(language=='Tigrina'){
        connection.query("select id from professions where tigrina=? limit 1",profession,function(error,row){
            if(!!error){
                callback(error,null)
            }else{
                callback(null,row[0].id)
            }
        })
    }else{
        connection.query("select id from professions where profession=? limit 1",profession,function(error,row){
            if(!!error){
               callback(error,null)
            }else{
                callback(null,row[0].id)
            }
        })
    }
    
}
let convertNamesToTigrina=(name)=>{
    let arrayA=[]
    let splitedName=name.split('')
    splitedName.filter((data,index)=>{
        let alphabetsInfoForConversionToTigrina={}
        if(data=='a'){
            let beforeA=name[index-1]
            if(beforeA==undefined || beforeA==' '){
                alphabetsInfoForConversionToTigrina.order=index
                alphabetsInfoForConversionToTigrina.combinedLetters=data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }else if(beforeA=='u'){
            }
            else{
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=beforeA+data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }
        }else if(data=='e'){
            let beforeE=name[index-1]
            if(beforeE==undefined || beforeE==' '){
                alphabetsInfoForConversionToTigrina.order=index
                alphabetsInfoForConversionToTigrina.combinedLetters=data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }else if(beforeE=='i'){
            }else{
                beforeE=name[index-1]
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=beforeE+data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }
            
        }else if(data=="i"){
            let beforeI=name[index-1]
            let afterI=name[index+1]
            if(beforeI==' ' || beforeI==undefined){
                console.log('......')
                if(afterI=='e'){
                    alphabetsInfoForConversionToTigrina.order=index
                    alphabetsInfoForConversionToTigrina.combinedLetters='ie'
                    arrayA.push(alphabetsInfoForConversionToTigrina)
                }else{
                    alphabetsInfoForConversionToTigrina.order=index
                    alphabetsInfoForConversionToTigrina.combinedLetters=data
                    arrayA.push(alphabetsInfoForConversionToTigrina)
                }
            }else if(afterI=='e'){
                    let sixth=beforeI+data+'e'
                    alphabetsInfoForConversionToTigrina.order=index-1
                    alphabetsInfoForConversionToTigrina.combinedLetters=beforeI+'ie'
                    arrayA.push(alphabetsInfoForConversionToTigrina)
            }else{
                
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=beforeI+data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }
        }else if(data=='o'){
            let beforeO=name[index-1]
            if(beforeO==undefined || beforeO==' '){
                alphabetsInfoForConversionToTigrina.order=index
                alphabetsInfoForConversionToTigrina.combinedLetters=data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }else{
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=beforeO+data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }
            
        }else if(data=='u'){
            let beforeU=name[index-1]
            let afterU=name[index+1]
            if(beforeU==undefined || beforeU==' '){
                alphabetsInfoForConversionToTigrina.order=index
                alphabetsInfoForConversionToTigrina.combinedLetters=data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }else if(afterU=='a'){
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=beforeU+data+'a'
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }else if(afterU=='o'){
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=beforeU+data+'o'
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }else{
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=beforeU+data
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }
        }else{
            let consenant=name[index]
            let nextToConsenant=name[index+1]
            if(nextToConsenant=='a' || nextToConsenant=='e' || nextToConsenant=='i' || nextToConsenant=='o' || nextToConsenant=='u'){
            }else{
                alphabetsInfoForConversionToTigrina.order=index-1
                alphabetsInfoForConversionToTigrina.combinedLetters=consenant
                arrayA.push(alphabetsInfoForConversionToTigrina)
            }
            
        }
    })
    let translatedAlphabets=[]
    //check if there is any duplicates
    let nonDuplicatedResult=arrayA.filter((v,i,a)=>a.findIndex(t=>(t.order === v.order))===i)
    for(key in tigrinaEnglishAphabets){
        for(key2 in nonDuplicatedResult){
            if(nonDuplicatedResult[key2].combinedLetters==tigrinaEnglishAphabets[key].value){
                translatedAlphabets.push({key:tigrinaEnglishAphabets[key].key,order:nonDuplicatedResult[key2].order})
            }
        }
    }
    let translatedAlphabetOrders= translatedAlphabets.sort( compare );
    let finalNameTranslationCollector=[]
    for(key in translatedAlphabetOrders){
       finalNameTranslationCollector.push(translatedAlphabetOrders[key].key)
    }
    let englishAlphabetToTigrinaAlphabet=finalNameTranslationCollector.join('')
    return englishAlphabetToTigrinaAlphabet
}
function compare( a, b ) {
    if ( a.order < b.order ){
      return -1;
    }
    if ( a.order > b.order ){
      return 1;
    }
    return 0;
}
// function isCharacterALetter(char) {
//     return (/[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(char)
// }
// function tigrinaToEnglishAlphabet(term){
//       tigrinaDataArray=[]
//      term.split('').filter((data,index)=>{
//          tigrinaDataArray.push({order:index,combinedLetters:data})
//      })
//      let translatedAlphabets=[]
//      for(key in tigrinaEnglishAphabets){
//         for(key2 in tigrinaDataArray){
//             if(tigrinaDataArray[key2].combinedLetters==tigrinaEnglishAphabets[key].key){
//                 translatedAlphabets.push({tigrina:tigrinaEnglishAphabets[key].value,order:tigrinaDataArray[key2].order})
//             }
//         }
//      }
//     let convertedWord=translatedAlphabets.sort(compare)
//     let collectedTigrina=[]
//     for(key in convertedWord){
//         collectedTigrina.push(convertedWord[key].tigrina)
//     }
//     return collectedTigrina.join('')
// }
// function codeCalculator(text){
//     let myword=text
//     let myword2
//     if(myword!==null){
//         myword2=myword.split('')
//     }
//     let theIndexes=[]
//     let myindex
//     for(key in myword2){
//         if(alphabetsWithComma.indexOf(myword2[key])===-1){
//             myindex='-'
//         }else{
//             myindex=alphabetsWithComma.indexOf(myword2[key])
//         }
//         theIndexes.push(myindex)
//     }
//     let wordCode=  theIndexes.join('')
//     let info={}
//     info.wordCode=wordCode
//     if(info.wordCode.substr(0,6)=='154180'|| info.wordCode.substr(0,6)=='122180' || info.wordCode.substr(0,6)=='126180'){
//         info.attachment='not'
//     }else{
//         info.attachment=''
//     }
//     return info
// }
// let tigrinaCodeCalculator=codeCalculator("ኣይጽሬት")
// let tigrina_englishLetter=tigrinaToEnglishAlphabet("ጽሬት")
// let english_tigrina_letters=convertNamesToTigrina('xriet')