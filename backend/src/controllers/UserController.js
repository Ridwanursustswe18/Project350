const { json } = require("sequelize")

const database  = require("../config/db.config")
const passenger = require("../entities/passenger")
const bcrypt = require("bcrypt")

exports.updateProfile = async(req,res)=>{

    const ID = req.params.ID
    const user = req.user
   
    const {passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password,passenger_identification,passenger_post_code} = req.body
    const profile_picture = req.file
    const salt  = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(passenger_password,salt);
    
    
    
    const newUser = {
      passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password:hashedPassword,passenger_identification,passenger_post_code,profile_picture
  }
 
  const validUser = await passenger.findOne({where:{ID}})
  
  if(validUser && validUser.ID === user.ID){
    
    const update = await passenger.update(
      newUser,
      {
        where:{ID:ID}
      }
      )
    
  
  if(update){
    return res.status(200).json({message:"User updated successfully"})
  }
  else{
    return res.status(500).json({message:"invalid entry"})
  }
  }
else{
  return res.status(401).json({message:"unrecognized user"})
}
   

 
}
exports.getSingleUser = async(req,res)=>{
  const ID = req.params.ID
  const user = req.user
  const validUser = await passenger.findOne({where:{ID}})
  if(validUser && validUser.ID === user.ID){
   const profile = await passenger.findOne({where:{ID}})
   if(profile){
    res.status(200).send(profile)
   }
  }
  else{
    return res.status(401).json({message:"unrecognized user"})
  }
}