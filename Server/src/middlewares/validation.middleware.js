import z from "zod";
import httpStatusCodes from "../utils/httpStatusCode.utils.js";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    res.status(httpStatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation_Error",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }

  req.body = result.data;

  next();
};

export default validate;
