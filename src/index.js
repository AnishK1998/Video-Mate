import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("mongoDB connected and called from index.js");

    app.listen(port, () => {
      console.log("Server is running on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error in DB connection ", error);
  });
