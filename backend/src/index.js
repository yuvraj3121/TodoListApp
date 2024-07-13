import connectDB from "./db/index.db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection fail !!", err);
  });
