
const database  = require("../config/db.config")

 exports.searchTrains = async(req,res)=>{
const{source,destination,trip_date} = req.query
let query = "SELECT * FROM trip,train,seat_class WHERE trip.trainID = train.ID AND train.ID = seat_class.trainID AND trip.source = ? AND trip.destination = ? and trip.trip_date=?  "
database.query(query,[source,destination,trip_date],(err,results)=>{
    if(!err){
        return res.status(200).json(results)
    }
    else{
        return res.status(401).json(err)
    }
})
}
exports.showSeats = async(req,res)=>{
const ID = req.params.ID
const showSeats = await seat_class.findAll({
    where:{
        ID
    },
   include:[{
    model:bogey,
    required:true,
    include:[{
        model:seat,
        required:true,
        include:[{
            model:seat_status,
            required:true
        }]
    }]
   }]
    
})
if(showSeats){
    return res.status(200).json(showSeats)

}
else{
    return res.status(401).json({message:"query unsuccessfull"})
}
}