const { json } = require("sequelize")
const database  = require("../config/db.config")
const bogey = require("../entities/bogey")
const seat_class = require("../entities/class")
const seat = require("../entities/seat")
const seat_status = require("../entities/seatStatus")
const train = require("../entities/train")
const trip = require("../entities/trip")
 exports.searchTrains = async(req,res)=>{
const{source,destination,trip_date,train_class} = req.query
const search = await trip.findAll({
    where:{
        source,
        destination,
        trip_date,
        train_class
    }
    ,include:[{
        model:train,
        include:[{model:seat_class,required:true}],
        required:true
    }]
   
})
if(search){
    return res.status(200).json(search)

}
else{
    return res.status(401).json({message:"query unsuccessfull"})
}

}
exports.showSeats = async(req,res)=>{
const{bogey_name,tripID} = req.query
const showSeats = await bogey.findAll({
    where:{
        bogey_name,tripID
    },
    include:[{
        model:seat,
        include:[{model:seat_status}],
        required:true
    }]
})
if(showSeats){
    return res.status(200).json(showSeats)

}
else{
    return res.status(401).json({message:"query unsuccessfull"})
}
}