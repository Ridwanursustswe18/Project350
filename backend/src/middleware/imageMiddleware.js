const multer = require("multer");
const path = require("path")
const Storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"/assets/")}
    ,
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
exports.image = async(req,res,next)=>{
 
multer({
    storage:Storage,
    limits:{fileSize:"1000000000"},
    fileFilter:(req,res,cb)=>{
        const filetype = /jpeg|jpg|png/
        const mimtype = filetype.test(file.mimtype) 
        const extname = filetype.test(path.extname(file.originalname))
        if(mimtype && extname){
            return cb(null,true)
        }
        cb("invalid file format")
    }
}).single('profile_picture')
next()
}