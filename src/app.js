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
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", cors(corsOptions), (req, res) => {
 return res.send("hello world");
});

export default app;
