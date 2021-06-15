var isAllowed=false
exports.permissionInfo={
    isAdmin:function(user,callback){
        console.log("user...")
        console.log(user)
        try {
            if(user.permission=='admin'){
                isAllowed=true
            }else{
                isAllowed=false
            }
            callback(null,isAllowed)
        } catch (error) {
            callback(error,"")
        }
    }
}