import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    const portnumber = process.env.PORT || 3000
    app.on("error",()=>{
        console.log("express error")
    })
    app.listen(portnumber,()=>{
        console.log(`Server is running at port ${portnumber}`)
        
    })

    app.get('/', (req, res) => {
        res.send('Welcome to Rail Madad Dashboard!');
    });
})
.catch((err)=>{
    console.log("MongoDB connection not happend",err)
})