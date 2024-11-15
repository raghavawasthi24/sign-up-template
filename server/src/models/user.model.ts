import mongoose from "mongoose";
import { UserSchema } from "../types";

const userSchema = new mongoose.Schema<UserSchema>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    phoneNo: { type: String, required: true },
    accNum: { type: String, required: true },
    ifsc: { type: String, required: true },
    bankHolderName: { type: String, required: true },
    bankName: { type: String, required: true },
    relocation: { type: String, required: true },
    noticePeriod: { type: String, required: true },
    hearAboutUs: { type: String, required: true },
    currentLocation: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserSchema>("User", userSchema);

export default UserModel;
