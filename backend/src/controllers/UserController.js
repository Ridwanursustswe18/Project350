const { json } = require("sequelize")

const database  = require("../config/db.config")

const bcrypt = require("bcrypt")

exports.updateProfile = async(req,res)=>{

    const ID = req.params.ID
    const user = req.user
   
    const {passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password,passenger_identification,passenger_post_code} = req.body
    const profile_picture = req.file
    const salt  = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(passenger_password,salt);
    
    
    
    const newPassenger = {
      passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password:hashedPassword,passenger_identification,passenger_post_code,profile_picture
  }
 
  let query1 = "SELECT * FROM `passenger` WHERE passenger_id = ?"
  database.query(query1,[ID],(err,results)=>{
    if(results && results[0].passenger_id === user.ID ){
      const query2 = "UPDATE `passenger` SET `passenger_email`=?,`passenger_name`=?,`passenger_mobile_no`=?,`passenger_address`=?,`passenger_password`=?,`passenger_identification`=?,`passenger_post_code`=?,`profile_picture`=? WHERE passenger_id = ?"
      database.query(query2,[newPassenger.passenger_email,newPassenger.passenger_name,newPassenger.passenger_mobile_no,newPassenger.passenger_address,newPassenger.passenger_password,newPassenger.passenger_identification,newPassenger.passenger_post_code,newPassenger.profile_picture,ID],(err,results)=>{
        if(!err){
          if(results.affectedRows === 0){
              return res.status(404).json({message:"User does not exist"})
          }
        return res.status(200).json({message:"User updated successfully"})
      }
      else{
        return res.status(500).json(err)
      }
    })
  }
  else{
    return res.status(400).json(err)
  }
      })
    }
 
exports.getSingleUser = async(req,res)=>{
  const ID = req.params.ID
  const user = req.user
  let query1 = "SELECT * FROM `passenger` WHERE passenger_id = ?"
  database.query(query1,[ID],(err,results)=>{
   console.log(results)
    if(results && results[0].passenger_id === user.ID ){
      let query2 = "SELECT `passenger_id`, `role`, `passenger_email`, `passenger_name`, `passenger_mobile_no`, `passenger_address`, `passenger_password`, `passenger_NID`, `passenger_post_code`, `profile_picture` FROM `passenger` WHERE passenger_id = ?" 
      database.query(query2,[ID],(err,results)=>{
        if(!err){
          return res.status(200).json(results)
        }
        else{
          return res.status(500).json(err)
        }
      })

  }
  else{
    return res.status(401).json({message:"not recognized"})
  }
})
}