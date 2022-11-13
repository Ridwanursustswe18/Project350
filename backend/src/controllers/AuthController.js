const bcrypt = require("bcrypt")
const database  = require("../config/db.config")
const { query } = require('express');
const jwt = require("jsonwebtoken")
exports.register = async(req,res)=>{
    const {passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password,passenger_NID,passenger_post_code,profile_picture} = req.body
    const salt  =  await bcrypt.genSalt();
    const hashedPassword =  await bcrypt.hash(passenger_password,salt);
    const newPassenger = {
        passenger_email,passenger_name,passenger_mobile_no,passenger_address,passenger_password:hashedPassword,passenger_NID,passenger_post_code,profile_picture
    }
    console.log(req.body)
    let query ="INSERT INTO passenger( passenger_email, passenger_name, passenger_mobile_no, passenger_address, passenger_password, passenger_NID, passenger_post_code) VALUES (?,?,?,?,?,?,?)"
    database.query(query,[newPassenger.passenger_email,newPassenger.passenger_name,newPassenger.passenger_mobile_no,newPassenger.passenger_address,newPassenger.passenger_password,newPassenger.passenger_NID,newPassenger.passenger_post_code],(err,results)=>{
      console.log(newPassenger.passenger_email)
        if(!err){
            return res.status(200).json({message:"User added succesfully"})
        }
        else{
            return res.status(500).json(err)
          }
    })
  
}
exports.login = async(req,res)=>{
    const{passenger_mobile_no,passenger_password} = req.body
    database.query(`SELECT * FROM passenger WHERE passenger_mobile_no  = ${database.escape(passenger_mobile_no)} `,(err,results)=>{
        if(err){
            return res.status(400).json(err)
         }
         
         bcrypt.compare(passenger_password,results[0]['passenger_password'],(err,result)=>{
            if(err){
               return res.status(401).json({
                  message:"mobile number or password is incorrect"
               })
            }
            if(result){
               const token = jwt.sign({
                  passenger_mobile_no:passenger_mobile_no,
                  ID:results[0].passenger_id
               },"secret",{
                  expiresIn:'7d'
               })
               
               return res.status(200).json({
                  message:"Successfully logged in",
                  token,
                  passenger:results[0],
                  ID:results[0].passenger_id
               })
            }
           
            return res.status(401).json({
               message:"mobile number or password is incorrect .."
            })
         }) 
    })
   
}