// const db=require('./db').connectionInfo
// let data={
//     "id": 19,
//     "email": 'gidesegid@gmail.com',
//     "location": 'Nijmegen, Netherlands',
//     "profession": 'Computer Scientists',
//     "professionDescription": 'this is me .I am a woodworker.  yet more coming'
//   }
//   let result
//   let deleteJob
//   describe('register job', function(){
//     // beforeAll(async () => {
//     //     let info={}
//     //     info.jobtitle="req.body.jobtitle"
//     //     info.professions="Computer Scientists"
//     //     info.locations="req.body.locations"
//     //     info.jobDescriptionTitle="req.body.jobDescriptionTitle"
//     //     info.description="req.body.description"
//     //     info.url="req.body.url"
//     //     info.registrationTime="helper.thisDate+ +helper.thisTime"
//     //     result=await db.registerjob(info)
//     //     deleteJob= await db.deleteRegisteredJob(1)
//     // });
//     // test("ggg",async function(){
//     //     if(result.message=="Job registered successfully"){
//     //         expect(result.message).toBe("Job registered successfully") 
//     //         expect(deleteJob).toBe("Job deleted successfully")
           
//     //     }else if(result.message=="there was something wrong on registering a job into database"){
//     //         expect(result.message).toEqual("there was something wrong on registering a job into database")
//     //     }else if(result.message=="there was something wrong"){
//     //         expect(result.message).toEqual("there was something wrong")
//     //     }
//     // })
//  })
// test('it should show user info',async function(){
//     let result= await db.getUserInfo(19)
//     expect(result[0]).not.toEqual(null)
//  })
//  test('it should show empty result from user info',async function(){
//     let result= await db.getUserInfo(190)
//     expect(result[0]).toEqual(undefined)
//  })
//  test('it should show list of jobs',async function(){
//      let language="en"
//     let result= await db.getJobs(data.profession,language,data.location)
//     expect(result).not.toBe(undefined)
//  })
//  test('it should show list of professions', async function(){
//      let result=db.getListsOfProfessions("metal works","en")
//      expect(result).not.toBe(null)
//  })
//  test('it should show list of all professions',async function(){
//      let result=db.getProfessions()
//      expect(result).not.toBe(null)
//  })
 
// describe('check email',function(){
//     test('check email in database',async function(){
//         expect(await db.checkUserEmail('gidesegid@gmail.com')).toBe('yes')
//     })
//     test('check email in database',async function(){
//         expect(await db.checkUserEmail('gidesegidrrrr@gmail.com')).toBe('no')
//     })
// })
// describe('get list of locations',function(){
//     test('get list of locations should get some data',async function(){
//         expect(await db.getListsOfLocations("Metal Workers","Nijmegen, Gelderland, Netherlands","en")).not.toStrictEqual([{"locations": "No data"}])
//     })
//     // test('get list of locations should get some data',async function(){
//     //     expect(await db.getListsOfLocations("Metal Workers","","en")).toStrictEqual([{"locations": "No data"}])
//     // })
// })


 