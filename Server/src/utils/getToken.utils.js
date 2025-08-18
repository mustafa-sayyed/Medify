import jwt from "jsonwebtoken";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_TOKEN
  );
};

export { getToken };
