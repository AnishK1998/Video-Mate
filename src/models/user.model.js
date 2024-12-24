import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true,
      },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//mongoose middle pre is used here to hash the password just before saving in mongodb
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCoorect = async function (userProvidedPassword) {
    return await bcrypt.compare(userProvidedPassword, this.password);
}

userSchema.methods.generateAccessToken = async function (){
    return await jwt.sign({
        _id: this._id,
        userName: this.userName,
        fullName: this.fullName,
        email: this.email
    },
    process.env.ACCESS_TOKEN,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = async function (){
    return await jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema);
