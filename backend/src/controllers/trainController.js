const { query } = require("express")
const database  = require("../config/db.config")

exports.searchTrains = async(req,res)=>{
const{source,destination,trip_date,class_name} = req.query
let query = "SELECT * FROM trip,train,seat_class WHERE trip.train_id = train.train_id AND train.train_id = seat_class.train_id AND trip.source = ? AND trip.destination = ? and trip.trip_date=? and seat_class.class_name = ?"
database.query(query,[source,destination,trip_date,class_name],(err,results)=>{
    if(!err){
        return res.status(200).json(results)
    }
    else{
        return res.status(401).json(err)
    }
})
}
exports.showSeats = async(req,res)=>{
const seat_class_id = req.query.seat_class_id
const ID = req.params.ID
const user = req.user
let query1 = "SELECT * FROM `passenger` WHERE passenger_id = ?"
database.query(query1,[user.ID],(err,results)=>{
 
    if(results && results[0].passenger_id === user.ID ){
        
    let query2 = "SELECT * FROM seat_class,bogey,seat WHERE seat_class.seat_class_id = bogey.seat_class_id AND bogey.bogey_id = seat.bogey_id AND seat_class.seat_class_id = ?;"
    database.query(query2,[seat_class_id],(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }
        else{
            return res.status(401).json(err)
        }
    })    
}
   
})
}