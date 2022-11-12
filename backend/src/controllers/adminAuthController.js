const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const database  = require("../config/db.config")




exports.register = async(req,res)=>{
    const {admin_name,admin_email,admin_password} = req.body
    const salt  =  await bcrypt.genSalt();
    const hashedPassword =  await bcrypt.hash(admin_password,salt);
    const newAdmin = {
        admin_name,admin_email,admin_password:hashedPassword
    }
  
}
exports.login = async(req,res)=>{
    const{admin_email,admin_password} = req.body
    
   
}