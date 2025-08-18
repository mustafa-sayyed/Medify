import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import httpStatusCodes from "../utils/httpStatusCode.utils.js";
import { getToken } from "../utils/getToken.utils.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "User does not exist");
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Password does not match");
  }

  const token = getToken(user);

  res.status(httpStatusCodes.OK).json({
    success: true,
    message: "Login Successfull",
    user,
    token,
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Account already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = getToken(user);

  res.status(httpStatusCodes.CREATED).json({
    success: true,
    message: "Accout Created Successfully",
    user,
    token,
  });
});

const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).lean();

  res.status(httpStatusCodes.OK).json({
    success: true,
    user,
  });

});


export {loginUser, registerUser, currentUser}


