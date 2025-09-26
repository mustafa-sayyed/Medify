import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import httpStatusCodes from "../utils/httpStatusCode.utils.js";
import jwt from "jsonwebtoken";

const authenticate = asyncHandler(async (req, _, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(httpStatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError(httpStatusCodes.UNAUTHORIZED, "Expired Token");
    }

    const user = await User.findById(decodedToken._id).lean().select("-password");

    if (!user) {
      throw new ApiError(httpStatusCodes.UNAUTHORIZED, "User does not exist");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    throw new ApiError(httpStatusCodes.UNAUTHORIZED, error?.message || "Invalid or Expired Token");
  }
});

export default authenticate;
