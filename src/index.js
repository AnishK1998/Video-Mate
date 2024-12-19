import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { DB_NAME } from "./constants.js";

dotenv.config({
  path: "./env",
});
const app = express();

connectDB()
  .then(() => {
    console.log("mongoDB connected and called from index.js");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error in DB connection ", error);
  });
