import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

var whitelist = ["http://example1.com", "http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback( new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json({limit: "160kb"}));
app.use(express.urlencoded({extended:true, limit:"16kb"}));
app.use(express.static("public/temp"));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.routes.js";



//routes declarations
app.use("/api/v1/user", userRouter);   //api/v1/user is the base route for which userRouter controller is called




export default app;
