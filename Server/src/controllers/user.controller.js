import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import httpStatusCodes from "../utils/httpStatusCode.utils.js";

async function generateAccessAndRefreshToken(user) {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {accessToken, refreshToken};
  } catch (error) {
    console.log(error);

    throw new ApiError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while generating Access and Refresh Token"
    );
  }
}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "User does not exist");
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Password does not match");
  }

  const token = await generateAccessAndRefreshToken(user);

  user = await User.findById(user._id).lean().select("-password");

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

  let user = await User.create({
    name,
    email,
    password,
  });

  const token = await generateAccessAndRefreshToken(user);

  user = await User.findById(user._id).lean().select("-password");

  res.status(httpStatusCodes.CREATED).json({
    success: true,
    message: "Accout Created Successfully",
    user,
    token,
  });
});

const currentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(httpStatusCodes.OK).json({
    success: true,
    message: "User Fetched Successfully",
    user,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findByIdAndUpdate(userId, { refreshToken: "" }, {new:  true});
  console.log(user);
  

  res.status(200).json({
    message: "Logout Successfull",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(httpStatusCodes.UNAUTHORIZED, "Unauthorized Request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedToken) {
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Invalid refresh token");
  }

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new Api(httpStatusCodes.BAD_REQUEST, "Invalid refresh token");
  }

  if(incomingRefreshToken !== user.refreshToken)
    throw new ApiError(httpStatusCodes.BAD_REQUEST, "Invalid or Expired Refresh Token")

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user);

  res.status(httpStatusCodes.OK).json({
    success: true,
    token: accessToken,
    refreshToken,
    message: "Token refreshed successfully",
  });

});

export { loginUser, registerUser, currentUser, logoutUser, refreshAccessToken };
