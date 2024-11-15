import { Document } from "mongoose";

export interface UserSchema extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dob: Date;
}
