const bcrypt = require("bcrypt")
const database  = require("../config/db.config")
const passenger = require("../entities/passenger")
const jwt = require("jsonwebtoken")
exports.register = async(req,res)=>{
    const {passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password,passenger_identification,passenger_post_code,profile_picture} = req.body
    const salt  =  await bcrypt.genSalt();
    const hashedPassword =  await bcrypt.hash(passenger_password,salt);
    const newPassenger = {
        passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password:hashedPassword,passenger_identification,passenger_post_code,profile_picture
    }
    console.log(req.body.passenger_name)
    const user =  ( passenger.create(newPassenger).
    then(result=>console.log(result)).catch(err=>console.log(err)))
    
   if(user){
    res.status(200).send("user added successfully")
   }
  
}
exports.login = async(req,res)=>{
    const{passenger_mobile_no,passenger_password} = req.body
    const user = await passenger.findOne({where:{passenger_mobile_no}})
    if(user){
        const compare_password = await bcrypt.compare(passenger_password,user.passenger_password)
        if(compare_password){
            token = jwt.sign({"ID":user.ID,"passenger_mobile_no":user.passenger_mobile_no,"passenger_name":user.passenger_name,"role":user.role},"secret")
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