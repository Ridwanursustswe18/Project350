
const authorizeRole = (permission)=>{
    return (req,res,next)=>{
        const userRole = req.body.role
        if(userRole === permission){
            next()
        }
        else{
            console.log(userRole)
            return res.status(401).json("You don't have permission")
        }
    }
    
}
module.exports = authorizeRole