import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    //step-1 get user details from req.body 

    //step-2 do validation of frontend data based on user model schema

    //step-3 check if user already exist or not

    //step-4 check for avatar and check for images are they present or not

    //step-5 upload into cloudinary and check for avatar once again and get the link if images and url and url are present

    //step-6 create user object in db - create entry in DB

    //step-7 remove password and refresh token from response of db, bcz we don't want it to send to frontend

    //step-8 check whether user is created successfully or not

    //step-9 send response if user is created successfully other wise send error message
    
  res.status(200).json({
    message: "User registered successfully",
  });
});

export { registerUser };
