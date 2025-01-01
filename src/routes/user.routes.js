import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";

const userRouter = Router();
//http://localhost:3000/api/v1/user/register for this route registerUser controller is getting called
userRouter.route("/register").post(registerUser)

export default userRouter;