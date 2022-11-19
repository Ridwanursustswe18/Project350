const { query } = require("express")
const database  = require("../config/db.config")

exports.updateSeatStatus = async(req,res)=>{
    const {seat_id} = req.body
    const user = req.user
    let query1 = "SELECT * FROM `passenger` WHERE passenger_id = ?"

    database.query(query1,[user.ID],(err,results)=>{
   
        if(results && results[0].passenger_id === user.ID ){
            
        let query2 = "UPDATE seat_statuses SET seat_status = true WHERE seat_statuses.seat_id = ?;"

        database.query(query2,[seat_id],(err,results)=>{
            if(!err){
                return res.status(200).json("Seat Status Changed")
            }
            else{
                return res.status(401).json(err)
            }
        })    
    }
       
    })
    }
    