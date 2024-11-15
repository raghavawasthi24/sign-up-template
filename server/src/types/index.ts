import { Document } from "mongoose";

export interface UserSchema extends Document {
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  phoneNo: string;

  accNum: string;
  ifsc: string;
  bankHolderName: string;
  bankName: string;

  relocation: string;
  noticePeriod: string;
  hearAboutUs: string;
  currentLocation: string;
}
