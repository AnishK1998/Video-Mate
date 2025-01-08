import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadFileInCloudinary } from "../utils/Cloudinary.FileUploadConfiguration.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //note:- here for this case the data from frontend is coming in req.body bcz data is formdata

  //step-1 get user details from req.body
  const {
    userName,
    fullName,
    email,
    avatar,
    coverImage,
    watchHistory,
    password,
    refreshToken,
  } = req.body;

  //step-2 do validation of frontend data based on user model schema
  if (
    [
      userName,
      fullName,
      email,
      avatar,
      coverImage,
      watchHistory,
      password,
      refreshToken,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  //step-3 check if user already exist or not

  const isUserExist = await User.findOne({
    //$or method se we will check either of these field's found in db then we should throw error
    $or: [{ email }, { userName }],
  });

  if (isUserExist)
    throw new ApiError(
      409,
      "User already exist with given email id and userName"
    );

  //step-4 check for avatar and check for cover image, are they present or not
  const localAvatarFilePath = req.files?.avatar[0]?.path;
  const localCoverImageFilePath =
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files?.coverImage[0]?.path; //localCoverImageFilePath is not mandatory

  if (!localAvatarFilePath) {
    throw new ApiError(400, "Avatar image file is required");
  }

  //step-5 upload  avatar and coverImage into cloudinary and check for avatar once again and get the link if images and url are present
  const uploadedAvatarRef = await uploadFileInCloudinary(localAvatarFilePath);
  const uploadedCoverImageRef = await uploadFileInCloudinary(
    localCoverImageFilePath
  );

  if (!uploadedAvatarRef) {
    throw new ApiError(400, "Avatar file failed to get uploaded in cloudinary");
  }

  //step-6 create user object in db - create entry in DB

  const createdUserResponse = await User.create({
    userName,
    fullName,
    email,
    avatar: uploadedAvatarRef?.url,
    coverImage: uploadedCoverImageRef?.url || "",
    password,
  });

  //step-7 remove password and refresh token from response of db, bcz we don't want it to send to frontend
  // &&&&&&&&&
  //step-8 check whether user is created successfully or not
  const isUserCreated = await User.findById(createdUserResponse._id).select(
    "-password -refreshToken"
  );

  if (!isUserCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //step-9 send response if user is created successfully other wise send error message

  res
    .status(201)
    .json(
      new ApiResponse(201, isUserCreated, "User is registered successfully")
    );
});

export { registerUser };
