import mongoose, { ConnectOptions } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL: string = process.env.DB_URL || "";

mongoose
  .connect(DB_URL, { useNewUrlParser: true } as ConnectOptions)
  .then(() => {
    console.log("Databse connected successfully!");
  })
  .catch((err: Error) => {
    console.log(err.message);
  });
