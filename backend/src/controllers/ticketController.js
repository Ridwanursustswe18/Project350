const { query } = require("express")
const database  = require("../config/db.config")
exports.createTicket = async(req,res)=>{
const {passenger_id,trip_id,total_fare} = req.body
const today = new Date()
const issue_date =  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const issue_time =  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const user = req.user
let query1 = "SELECT * FROM `passenger` WHERE passenger_id = ?"
database.query(query1,[user.ID],(err,results)=>{
    
    if(results && results[0].passenger_id === user.ID ){
        
        let query2 = "INSERT INTO `ticket`( `issue_date`, `issue_time`, `passenger_id`, `trip_id`,`total_fare`) VALUES (?,?,?,?,?)"
        database.query(query2,[issue_date,issue_time,passenger_id,trip_id,total_fare],(err,results)=>{
              
            if(!err){
                
                res.status(200).json("added")
            }
            else{
                
                res.status(500).err
            }

        })

        
    }
    else{
        res.status(401).json("not permitted")
    }
    
})
}
