import mongoose from "mongoose";
import { UserSchema } from "../types";

const userSchema = new mongoose.Schema<UserSchema>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserSchema>("User", userSchema);

export default UserModel;
