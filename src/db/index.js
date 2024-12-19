import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
  try{
    await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
    console.log("MongoDb connected on host ");
  }catch(error){
    console.log("error in DB connection ",error);
    throw new Error(error);
    
  }
}

export default connectDB;