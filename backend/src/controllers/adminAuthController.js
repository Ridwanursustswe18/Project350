const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const database  = require("../config/db.config")
const admin = require("../entities/admin")

exports.register = async(req,res)=>{
    const {admin_name,admin_email,admin_password} = req.body
    const salt  =  await bcrypt.genSalt();
    const hashedPassword =  await bcrypt.hash(admin_password,salt);
    const newAdmin = {
        admin_name,admin_email,admin_password:hashedPassword
    }
    const user =  admin.create(newAdmin)
    if(user){
        res.status(200).send("admin added successfully")
    }
    else{
        res.status(401).send("invalid request")
    }
}
exports.login = async(req,res)=>{
    const{admin_email,admin_password} = req.body
    const user = await admin.findOne({where:{admin_email}})
    if(user){
        const compare_password = await bcrypt.compare(admin_password,user.admin_password)
        if(compare_password){
            token = jwt.sign({"ID":user.ID,"admin_email":user.admin_email,"admin_name":user.admin_name,"role":user.role},"secret")
            res.status(200).json({token:token,"ID":user.ID,"role":user.role})
        } 
        else{
            res.status(400).json({error:"password incorrect"})
        }
    }
    else{
        res.status(404).json({error:"user does not exist"})
    }
   
}