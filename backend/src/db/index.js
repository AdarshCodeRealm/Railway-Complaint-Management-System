import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

const connectDB = async () =>{
    try {
        const coneectioni = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(coneectioni.connection.host,coneectioni.connection.name); 
    } catch (error) {
        console.log("mongodb connection error",error);
        process.exit(1);
    }
}
export default connectDB