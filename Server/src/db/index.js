import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI, process.env.DB_NAME);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    
    console.log(
      `MongoDB Connected. Host: ${connectionInstance.connection.host}`
    );
    console.log(`Database: ${connectionInstance.connection.name}`);
    
  } catch (error) {
    console.log(`MongoDB Connection Failed: ${error}`);
    process.exit(1);
  }
};
