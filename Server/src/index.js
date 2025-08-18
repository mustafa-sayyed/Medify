import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db/index.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Server error: ${error}`);
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection Failed: ${error}`);
  });
