import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: String,
  pincode: Number,
  country: String,
  state: String,
  city: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    // Optional: On Boarding flow
    dob: {
      type: Date,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    profileImage: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    address: {
      type: addressSchema,
    },

    // onboarding Tracking
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    onBoardingStep: {
      type: Number,
      default: 1,
    },

    // Passwod Reset
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

export const User = mongoose.model("User", userSchema);
