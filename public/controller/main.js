// var myApp=angular.module('myApp',['autocomplete'])
// myApp.factory('postcodeAddress', function($http,$q, $timeout){
//     var postcodeRetriever = new Object();
//     postcodeRetriever.getPostAddress = function(address) {
//         var data = $q.defer();
//         var datas=null;
//         var dataFromRemote;
//       $http.get('/getpostcode/'+address).then(function(response){
//            dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.Pand_postcode}));
//            var datas=JSON.parse(dataFromRemote);
//           $timeout(function(){
//             data.resolve(datas);
//           },1000);
//         })
//        return data.promise
//     }
//     return postcodeRetriever;
//      });

// myApp.controller('login',function($scope,$http,$window,srvShareData){
//     $scope.username='';
//     $scope.password='';
//     //forget password
//     $scope.forgetPasswordForm=function(){
//         $window.location.href = '/forgetPassword.html';
//     }
//     //login
//     $scope.submitLogin=function(){
//         var loginInfo={}
//         loginInfo.username=$scope.username,
//         loginInfo.password=$scope.password
//         $http.post('/login',loginInfo).then(function(response){
//         })
//     }
//     //register the user
//     // $scope.register=function(){
//     //     var inputData={}
//     //     inputData.username=$scope.username;
//     //     inputData.password=$scope.password;
//     //     inputData.repeatPassword=$scope.repeatPassword
//     //     if(inputData.username=="" || inputData.username==null){
//     //         $scope.result="Fill user name" 
//     //     }else{
//     //         if(inputData.password==inputData.repeatPassword && inputData.password!==null){
//     //             $http.post('/registerUser',inputData).then(function(response){
//     //                 $scope.result=response.data
//     //             })
//     //         }else{
//     //             $scope.result="password mismatch"
//     //         }
//     //     }
//     // }
//     // function checkUserName(){
//     //     $scope.userChecker=""
//     //     var inputData={}
//     //     inputData.username=$scope.username;
//     //     inputData.password=$scope.password;
//     //     $http.post('/checkUserName',inputData).then(function(response){
//     //         if(response.data=='no'){
//     //             $scope.userChecker="There is no such user registered before"
//     //         }else{
//     //             $scope.userChecker=" "
//     //         }
//     //     })
//     // }
//     $scope.changePassword=function(){
//         $scope.userChecker=""
//         var inputData={}
//         inputData.username=$scope.username;
//         inputData.password=$scope.password;
//         $http.post('/checkUserName',inputData).then(function(response){
//             if(response.data=='no'){
//                 $scope.userChecker="There is no such user registered before"
//             }else{
//                 var data={}
//                 data.username=response.data.username;
//                 data.id=response.data.id;
//                 data.password=$scope.password;
//                $http.post('/forgetPassword',data).then(function(response){
//                    if(response.data=="updated"){
//                     $scope.userChecker="password has changed"
//                    }
//                })

//             }
//         })
       

//     }
// })
// myApp.controller('map',function($scope,$http,$window,srvShareData,postcodeAddress){
//         $scope.overviewShow=true;
//         $scope.rechtingClicked=function(){
//             $scope.rechtingShow=true
//             $scope.addUserBoxShow=false
//             $scope.overviewShow=false
//         }
//         $scope.addUserClicked=function(){
//             $scope.rechtingShow=false
//             $scope.addUserBoxShow=true
//             $scope.overviewShow=false
//         }
//         $scope.overViewClicked=function(){
//             $scope.rechtingShow=false
//             $scope.addUserBoxShow=false
//             $scope.overviewShow=true
//         }
//     $scope.fillpostCode=function(){
//         var data=null
//           var dataPromise = postcodeAddress.getPostAddress($scope.postcode);
//             $scope.datas=null;
//             dataPromise.then(function(data){
//             $scope.postcodedata = data;
//            });
//      }
//     $scope.kenmerkInfo=function(){
//         $scope.fileInfo=false;
//         $scope.showkenmerkInfo=!$scope.showkenmerkInfo
//     }
//     $scope.showInfoFromDbclick=function(){
//         $scope.showInfoFromDb=!$scope.showInfoFromDb
//     }
//    $scope.search=function(){
//     $scope.showsearch=!$scope.showsearch; 
//    }
//    $scope.typeVastgoed=function(){
//        $scope.showtypevastgoed=!$scope.showtypevastgoed
//    }
//    $scope.Oppervlakte=function(){
//        $scope.showOppervlakte=!$scope.showOppervlakte
//    }
//    $scope.energielabel=function(){
//        $scope.showenergielabel=!$scope.showenergielabel
//    }
//    $scope.energieIndex=function(){
//        $scope.showenergieIndex=!$scope.showenergieIndex
//    }
//    $scope.kenmerk1=function(){
//        $scope.showkenmerk1=!$scope.showkenmerk1
//    }
//    $scope.kenmerk2=function(){
//        $scope.showkenmerk2=!$scope.showkenmerk2
//    }
//    $scope.eigenaar=function(){
//        $scope.showeigenaar=!$scope.showeigenaar
//    }
//    $scope.loadFileAdvies=function(){
//         $scope.showkenmerkInfo=false;
//         $scope.fileInfo=true;
//         $scope.fileSection="advies"
//     }
//     $scope.Werkomschrijving=function(){
//         $scope.mainFolders=false;
//         $scope.subFolders=true
//     }
//     $scope.backToMainFolders=function(){
//         $scope.mainFolders=true;
//         $scope.subFolders=false
       
//     }
//     $scope.loadFileFoto=function(){
//         $scope.showkenmerkInfo=false;
//         $scope.fileInfo=true;
//         $scope.fileSection="foto"
//     }
//     $scope.loadFileTekeningen=function(){
//         $scope.showkenmerkInfo=false;
//         $scope.fileInfo=true;
//         $scope.fileSection="tekeningen"
//     }
//     $scope.loadFileExel=function(){
//         $scope.showkenmerkInfo=false;
//         $scope.fileInfo=true;
//         $scope.fileSection="excel"
//     }
//     $scope.loadFilePdf=function(){
//         $scope.showkenmerkInfo=false;
//         $scope.fileInfo=true;
//         $scope.fileSection="pdf"
//     }
//     $scope.addPermission=function(){
//         var viewmap='no';
//         var viewfile='no';
//         var downloadfile='no';
//         var deletefile='no';
//         var uploadfile='no';
//         var adduser='no';
//         // var userCanChangeBuildingtype='no';
//         if($scope.viewmap==true){
//             viewmap='yes'
//         }
//         // if($scope.canChangeBuildingtype==true){
//         //     userCanChangeBuildingtype='yes'
//         // }
//         if($scope.viewfile==true){
//             viewfile='yes'
//         }
//         if($scope.downloadfile==true){
//             downloadfile='yes'
//         }
//         if($scope.deletefile==true){
//             deletefile='yes'
//         }
//         if($scope.viewmap==true){
//             uploadfile='yes'
//         }
//         if($scope.adduser==true){
//             adduser='yes'
//         }
//         var info={}
//         info.permissionName=$scope.permissionName;
//         info.viewmap=viewmap;
//         info.viewfile=viewfile;
//         info.downloadfile=downloadfile;
//         info.deletefile=deletefile;
//         info.uploadfile=uploadfile;
//         info.adduser=adduser;
//         // info.userCanChangeBuildingtype=userCanChangeBuildingtype;
//         console.log("$scope.allpermissions")
//         var permissionNameExist;
//         $scope.allpermissions.find((permission)=>{
//             if(permission.permissionName==info.permissionName){
//                 return permissionNameExist="yes"
//             }
//         })
//         if(permissionNameExist=='yes'){
//             $scope.errorMessage="Deze toestemming naam is al geregistreerd"
//             $scope.addedsuccessfully=""
//         }else if(info.permissionName=='' || info.permissionName==null){
//             $scope.errorMessage="Voer de naam van de toestemming in"
//             $scope.addedsuccessfully=""
//         }else{
//             $http.post('/addpermissionlookup',info).then(function(response){
//                 $scope.errorMessage=""
//                 $scope.addedsuccessfully=response.data
//                 $scope.permissionName=""
//                 getPermissions();
//             })
//         }
//     }
   
//     // $scope.addNewPermission=function(permissionName,permission){
//     //    var modificationMessage={}
//     //    var addmessage="yes"
//     //    modificationMessage.permissionName=permissionName;
//     //    modificationMessage.permission=permission;
//     //    modificationMessage.message=addmessage;
//     //    $http.post('/modifyPermission',modificationMessage).then(function(response){
//     //        $scope.modificationInfo=response.data
//     //        getAllPermissions();
//     //    })
//     // }
//     // $scope.deletePermission=function(permissionName,permission){
//     //     var modificationMessage={}
//     //     var deletemessage="no"
//     //     modificationMessage.permissionName=permissionName;
//     //    modificationMessage.permission=permission;
//     //    modificationMessage.message=deletemessage;
//     //    $http.post('/modifyPermission',modificationMessage).then(function(response){
//     //         $scope.modificationInfo=response.data
//     //         getAllPermissions();
//     //     })
//     // }
//     $scope.addCompany=function(){
//         var info={}
//         info.companyName=$scope.companyName
//         info.registeredBy="admin"
//         if($scope.companyName=='' || $scope.companyName==null){
//            $scope.errorMessageCompany="voer bedrijfsnaam in"
//         }else{
//             var companyExist
//             $scope.allCompanies.find((company)=>{
//                 if(company==info.companyName){
//                     companyExist="yes"
//                 }
//             })
//             if(companyExist=='yes'){
//                 $scope.errorMessageCompany="Deze bedrijfsnaam is al geregistreerd"
//                 $scope.addedsuccessfullyCompany=""
//             }else{
//                 $http.post('/addCompanies',info).then(function(response){
//                     $scope.addedsuccessfullyCompany="Bedrijfsnaam succesvol geregistreerd"
//                     $scope.companyName=""
//                     $scope.errorMessageCompany=""
//                     getCompanies()
//                 })
//             }
           
//         }
//     }
//     // $scope.getSingleCompany=function(){
        
//     //  var id=angular.element(document.querySelector('#userId'))
// //    // var id=angular.element($('#myElement'));
// //    var id= angular.element( document.querySelector( '#userId' ) ).input#userId;
//     //    console.log("user id..")
//     //     console.log(id)
//     // }
//     function getCompanies(){
//         $scope.allCompanies=[]
//         $http.get('/getCompanies').then(function(response){
//             $scope.allCompanies=response.data
//         })
//     }
//     getCompanies()
//     function getPermissions(){
//         $scope.allpermissions=[]
//         $http.post('/getPermissions').then(function(response){
//             $scope.allpermissions=response.data
//         })
//     }
//     getPermissions()
//     $scope.addUser=function(){
//         var registrationUserInfo={}
//         registrationUserInfo.userFullName=$scope.userFullName
//         registrationUserInfo.userEmail=$scope.userEmail
//         registrationUserInfo.username=$scope.userUsername
//         registrationUserInfo.userPassword=$scope.userPassword
//         registrationUserInfo.permissionId=$scope.permissionId;
//         registrationUserInfo.companyId=$scope.companyId;
//         registrationUserInfo.companiesUserWorkFor=userWorkForCompaniesId
//         if(registrationUserInfo.userFullName=='' || registrationUserInfo.userFullName==null ||registrationUserInfo.userEmail=='' 
//         || registrationUserInfo.userEmail==null || registrationUserInfo.username=='' || registrationUserInfo.username==null || 
//         registrationUserInfo.userPassword=='' || registrationUserInfo.userPassword==null || registrationUserInfo.permissionId=='' || registrationUserInfo.permissionId==null || registrationUserInfo.companyId=='' || registrationUserInfo.companyId==null){
//             $scope.userAddedErrorMessage="Vul alle velden correct in"
//             $scope.userAddedSuccessfully=""
//         }else{
//             if(userWorkForCompaniesId.length==0){
//                 if(confirm("Weet je zeker dat de gebruiker alleen voor zijn eigen bedrijf werkt?")){
//                     $http.post('/registerSupperAdmin',registrationUserInfo).then(function(response){
//                         $scope.userAddedSuccessfully=response.data
//                         $scope.userFullName=""
//                         $scope.userEmail=""
//                         $scope.userUsername=""
//                         $scope.userPassword=""
//                         $scope.permissionId=""
//                         $scope.companyId=""
//                         $scope.userAddedErrorMessage=""
//                     })
//                 }else{

//                 }
//             }else{
//                 $http.post('/registerSupperAdmin',registrationUserInfo).then(function(response){
//                     $scope.userAddedSuccessfully=response.data
//                     $scope.userFullName=""
//                     $scope.userEmail=""
//                     $scope.userUsername=""
//                     $scope.userPassword=""
//                     $scope.permissionId=""
//                     $scope.companyId=""
//                     $scope.userAddedErrorMessage=""
//                 })
//             }
               
//         }
        
//     }
//     $scope.loadPermissions=function(){
//         getPermissions()
//     }
//   // $scope.showpermissiontext="+ Permissions"
//    if($scope.showPermission==true){
//         $scope.showpermissiontext="- Rechten"
//     }else{
//         $scope.showpermissiontext="+ Rechten"
//     }
//     $scope.showPermissionclick=function(){
//         $scope.showPermission=!$scope.showPermission;
//         if($scope.showPermission==true){
//             $scope.showpermissiontext="- Rechten"
//             getAllPermissions();
//         }else{
//             $scope.showpermissiontext="+ Rechten"
//         }
       
//     }
//     function getAllPermissions(){
//         $http.get('/getAllPermissions').then(function(response){
//             $scope.permissions=response.data
//         })
//     }
//     $scope.deleteUser=function(id){
//         var userInfo={}
//         userInfo.id=id
//         if (confirm("Weet je zeker dat je deze gebruiker moet verwijderen?")) {
//            $http.post('/deleteUser',userInfo).then(function(response){
//             $scope.useraction=response.data
//             getAllUsers();
//         })
//         }else{
           
//         }
//     }
//     // $scope.deleteCompany=function(id){
//     //     var companyInfo={}
//     //     companyInfo.id=id;
//     //     $http.post('/deleteCompany',companyInfo).then(function(response){
//     //         $scope.companyaction=response.data
//     //         getCompanies();
//     //     })
//     // }
//     var userWorkForCompaniesId=[]
//     $scope.test=function(id){
//         if(userWorkForCompaniesId.indexOf(id)>-1){
//                 userWorkForCompaniesId.splice(userWorkForCompaniesId.indexOf(id), 1)
//         }else{
//             userWorkForCompaniesId.push(id)   
//         }
//     }
//     $scope.showAllUsers=function(){
//         $scope.userFilter=""
//         $scope.showUserCompanyWorksForListDiv=false;
//         $scope.showUserCompanyWorksForDiv=false;
//         getAllUsers()
//     }
//     $scope.changeUserCompanyWorksFor=function(fullName){
//         $scope.userFilter=fullName
//         $scope.showUserCompanyWorksForDiv=!$scope.showUserCompanyWorksForDiv
//     }
//     $scope.changeUserCompanyWorkingForClickEvent=function(id){
//         if(userWorkForCompaniesId.length==0){
//             $scope.messageFromUserCompanyWorksForUpdates="Selecteer bedrijf"
//         }else{
//             var userUpdateInfo={}
//             userUpdateInfo.id=id
//             userUpdateInfo.companiesUserWorkFor=userWorkForCompaniesId
//            $http.post('/userCompanyWorkForUpdates',userUpdateInfo).then(function(response){
//               $scope.messageFromUserCompanyWorksForUpdates="Succesvol geupdatet"
//            })
//         }
//     }
    
//   function getAllCompaniesWithData(){
//         userCompanyInfo={
//             infoFrom:'fromAdminPage'
//         }
//         $http.post('/getUserCompanyAdminPage',{
//         userCompanyInfo
//         }).then(function(response){
//                 $scope.allCompaniesWithData=response.data
//         })
//   } 
//   getAllCompaniesWithData()
//     $scope.deleteCompany=function(id){
//         var companyInfo={}
//         companyInfo.id=id;
//             if (confirm("Weet je zeker dat je deze bedrijf moet verwijderen?")) {
//                 $http.post("/deleteCompany",companyInfo).then(function(response){
//                     $scope.companyaction=response.data
//                     $scope.companyactionError=""
//                     getCompanies();
//                })
//             }else{

//             }
//     }
//     if($scope.showUser==true){
//         $scope.showuserstext="- Gebruikers"
//     }else{
//         $scope.showuserstext="+ Gebruikers"
//     }
//     if($scope.showcompanies==true){
//         $scope.showCompaniesText="- Bedrijven"
//     }else{
//         $scope.showCompaniesText="+ Bedrijven"
//     }
//     $scope.showCompaniesClick=function(){
//         $scope.showcompanies=!$scope.showcompanies;
//         if($scope.showcompanies==true){
//             $scope.showCompaniesText="- Bedrijven"
//         }else{
//             $scope.showCompaniesText="+ Bedrijven"
//         } 
//         $http.get('/getAllCompanies').then(function(response){
//             $scope.companies=response.data
//         })
//     }
//     $scope.showCompanyTextForChangingCompanyNameFunc=function(){
//         $scope.showCompanyTextForChangingCompanyName=!$scope.showCompanyTextForChangingCompanyName
//     }
//     $scope.showRechtingChangeFunc=function(){
//         $scope.showRechtingChange=!$scope.showRechtingChange
//     }
//     $scope.showUserclick=function(){
//         $scope.showUser=!$scope.showUser;
//         if($scope.showUser==true){
//             $scope.showuserstext="- Gebruikers"
           
//         }else{
//             $scope.showuserstext="+ Gebruikers"
//         } 
//         getAllUsers()
       
//     }
//     function getAllUsers(){
//         $http.get('/getAllUsers').then(function(response){
//             $scope.users=response.data
//         })
//     }
//     $scope.getUserInfOverCompanyThatWorksFor=function(id,companiesHeWorksFor,fullName){
//         $scope.userFilter=fullName
//         $scope.showUserCompanyWorksForListDiv=!$scope.showUserCompanyWorksForListDiv
//         var info={}
//         info.id=id;
//         info.userCompaniesWorksFor=companiesHeWorksFor
//         $http.post('/getInfOverUserCompaniesWorkingFor',info).then(function(response){
//             $scope.userCompaniesWorkForData=response.data
//             if(response.data=="no data"){
//                 $scope.messageFromUserCompanyWorksFor="Gebruiker werkt voor zijn eigen bedrijf"
//             }
//         })
//     }
//     $scope.selectedUserPermission=function(id,permissionName){
//         if(id!=='' || id!==null){
//             $scope.permissionId=id;
//         }else{
//             alert("Select permission")
//         }
//     }
//     $scope.changeUserPermission=function(permissionId,userId){
//        var info={}
//        info.permissionId=permissionId;
//        info.userId=userId;
//        if(permissionId==undefined){
//         $scope.selectPermissionFirstAlert="Selecteer toestemming uit de lijst"
//        }else{
//         $scope.selectPermissionFirstAlert=""
//         $http.post('/changeUserPermission',info).then(function(response){
//             $scope.useraction=response.data
//             getAllUsers()
//         })
//        }
       
//     }
//     $scope.changeCompanyName=function(userId){
//         // alert(userId)
//         var info={}
//        info.companyId=$scope.companyId;
//        info.userId=userId;
      
//        if($scope.companyId==undefined){
//            $scope.selectCompanyFirstAlert="Selecteer bedrijf"
//        }else{
//           $scope.selectCompanyFirstAlert=""
//           $http.post('/changeUserCompany',info).then(function(response){
//             $scope.useraction=response.data
//             getAllUsers();
//            })
//        }
      
//     }
//     $scope.checkUserEmail=function(){
//         var userInfo={}
//         userInfo.userEmail=$scope.userEmail;
//         $http.post('/checkUserEmail',userInfo).then(function(response){
//             if(response.data=='yes'){
//                 $scope.userEmail=""
//                 $scope.emailAlreadyExist="Deze email is al geregistreerd"
//             }else{
//                 $scope.emailAlreadyExist=""
//             }
//         }) 
//     }
//     $scope.checkUserName=function(){
//         var userInfo={}
//             userInfo.username=$scope.userUsername;
//             $http.post('/checkUserName',userInfo).then(function(response){
//                 if(response.data=='yes'){
//                     $scope.userUsername=""
//                     $scope.userAlreadyExist="Deze gebruiker is al geregistreerd"
//                 }else{
//                     $scope.userAlreadyExist=""
//                 }
//             })
//     }
//     $scope.selectedCompany=function(id,companyName){
//         if(id!=='' || id!==null){
//             $scope.companyId=id;
//             $scope.companyName=companyName;
//         }else{
//             alert("Select  company")
//         }
//     }
// })
// myApp.controller('rolControle', function ($scope,$http) {
//    $scope.send=function(){
      
//        $http.post('/getFiles').then(function(response){
//            $scope.allTables=response.data;
//            console.log($scope.allTables)
//        })
//        $scope.getColumn=function(fileName){
//            var info={}
//            info.fileName=fileName;
//         $http.post('/getColumn',info).then(function(response){
//             $scope.allColumns=response.data;
//         })
//        }
//        var columns=[]
//        var appendedColumnForNewColumns=[]
//        var membersOfNewColumn=[]
//        $scope.chooseThisColumn=function(column,indexId){
//            var columnInfo={};
//            columnInfo.name=column;
//            columnInfo.indexId=indexId
//            columns.push(columnInfo)
//            $scope.choosedColumns=columns;
//        }
//        $scope.appendThisColumn=function(column,indexId){
//            if($scope.newColumn=='' || $scope.newColumn==null){
//                $scope.appendColumn="enter new column name first"
//            }else{
//             var columnInfo={};
//             columnInfo.name=column;
//             columnInfo.indexId=indexId
//             appendedColumnForNewColumns.push(columnInfo)
//             $scope.appendedColumnsToNewColumns=appendedColumnForNewColumns;
//             $scope.appendColumn=""
//            }
           
//        }
//        $scope.createTable=function(){
//            var info={}
//            info.choosedColumns=$scope.choosedColumns
//            info.tableName=$scope.tableName;
//            info.newColumnMembers=membersOfNewColumn
//            if(info.tableName=='' || info.tableName==null){
//             $scope.tableCreated="enter table name"
//            }else{
//             $http.post('/addColumns',info).then(function(response){
//                 $scope.tableCreated=response.data
//                 $scope.tableName=""
//             })
//            }
//        }
//        $scope.removeColumn=function(column){
//            for(key in $scope.choosedColumns){
//               if($scope.choosedColumns[key]==column){
//                 $scope.choosedColumns.splice(key, 1); 
//               }
//            }
//        }
//        $scope.removeAppendedColumn=function(column){
//         for(key in $scope.appendedColumnsToNewColumns){
//            if($scope.appendedColumnsToNewColumns[key]==column){
//              $scope.appendedColumnsToNewColumns.splice(key, 1); 
//            }
//         }
//     }
//        $scope.addExtraColumns=function(){
//          $scope.showExtraColumn=!$scope.showExtraColumn
//        }
//        $scope.finishThisColumn=function(){
//             var columnInfo={};
//             columnInfo.name=$scope.newColumn;
//             columnInfo.indexId=""
//             if($scope.newColumn=='' || $scope.newColumn==null || $scope.appendedColumnsToNewColumns==''){
//                 $scope.appendColumn="enter column name and then append existing column to this new column"
//              }else{
//                 columns.push(columnInfo)
//                 var newColumnInfo={};
//                 newColumnInfo.mainColumnName=$scope.newColumn;
//                 newColumnInfo.memebers=$scope.columnAppendResult
//                 membersOfNewColumn.push(newColumnInfo)
//                 $scope.choosedColumns=columns;
//                 $scope.newColumn="";
//                 appendedColumnForNewColumns=[];
//                 $scope.appendedColumnsToNewColumns=""
//                 $scope.appendColumn="";
//                 $scope.columnAppendResult="";
//              }
//        }
//        var newColumnInfo=[];
//        $scope.addcomma=function(columnIndex,columnName,comma){
//         var data={}
//         data.columnIndex=columnIndex;
//         data.columnName=columnName;
//         data.char=comma;
//         newColumnInfo.push(data)
//         $scope.columnAppendResult=newColumnInfo
//        }
//        $scope.colon=function(columnIndex,columnName,colon){
//         var data={}
//         data.columnIndex=columnIndex;
//         data.columnName=columnName;
//         data.char=colon;
//         newColumnInfo.push(data)
//         $scope.columnAppendResult=newColumnInfo
//        }
//        $scope.slash=function(columnIndex,columnName,slash){
//         var data={}
//         data.columnIndex=columnIndex;
//         data.columnName=columnName;
//         data.char=slash;
//         newColumnInfo.push(data)
//         $scope.columnAppendResult=newColumnInfo
//        }
//        $scope.space=function(columnIndex,columnName,space){
//         var data={}
//         data.columnIndex=columnIndex;
//         data.columnName=columnName;
//         data.char=space;
//         newColumnInfo.push(data)
//         $scope.columnAppendResult=newColumnInfo
//        }
//        $scope.commaspace=function(columnIndex,columnName,comma){
//         var data={}
//         data.columnIndex=columnIndex;
//         data.columnName=columnName;
//         data.char=comma;
//         newColumnInfo.push(data)
//         $scope.columnAppendResult=newColumnInfo
//       }
//     $scope.colonspace=function(columnIndex,columnName,colon){
//         var data={}
//         data.columnIndex=columnIndex;
//         data.columnName=columnName;
//         data.char=colon;
//         newColumnInfo.push(data)
//         $scope.columnAppendResult=newColumnInfo
//     }
//     $scope.slashspace=function(columnIndex,columnName,slash){
//         var data={}
//         data.columnIndex=columnIndex;
//         data.columnName=columnName;
//         data.char=slash;
//         newColumnInfo.push(data)
//         $scope.columnAppendResult=newColumnInfo
//     }
//    }
//    $scope.removechar=function(columnIndex,columnName,char){
//     for(key in $scope.columnAppendResult){
//         console.log("newcoluninfo")
//         console.log($scope.columnAppendResult)
//         if($scope.columnAppendResult[key].columnIndex==columnIndex){
//             $scope.columnAppendResult.splice(key, 1); 
//             // $scope.columnAppendResult=newColumnInfo
//         }
//      }
//    }
   
// });
// //service...............................................................
//       myApp.service('srvShareData', function($window) {
//         var KEY = 'App.SelectedValue';
//         //adding name and id of the user to the sessionStorage
//         var addData = function(newObj) {
//             var mydata = $window.sessionStorage.getItem(KEY);
//             if (mydata) {
//                 mydata = JSON.parse(mydata);
//             } else {
//                 mydata = [];
//             }
//             mydata=[]//clearing the array at every page load, other wise commet this to add things to the array at every page load
//             mydata.push(newObj);
//             $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
//         };


//         var getData = function(){
//             var mydata = $window.sessionStorage.getItem(KEY);
//             if (mydata) {
//                 mydata = JSON.parse(mydata);
//             }
//             return mydata || [];
//         };
//         var clearData=function(){
//           var mydata = [];
//           return mydata
//         }


//         return {
//             addData: addData,
//             getData: getData,
//             clearData:clearData,

//         };
//     });