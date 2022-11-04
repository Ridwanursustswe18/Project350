const express = require("express")
const version = require("./package.json")
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express()
const database = require("./src/config/db.config")
const port = 3000

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())





const authRouter = require("./src/routes/authRoute.js")
const userRouter = require("./src/routes/userRoute.js")
const adminRouter = require("./src/routes/adminRoute")
app.get('/',(req,res)=>{
    res.send("hello")
})
app.use("/api",authRouter)
app.use("/api",userRouter)
app.use("/api/admin",adminRouter)
app.use("/assets/",express.static("/assets/"))
app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})
