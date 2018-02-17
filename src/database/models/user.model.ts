import { Document, Schema, model } from 'mongoose';

export interface User {
  _id?: any;
  name: string;
  email: string;
  password: string;
}

export type UserDocument = Document & User;

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
});

export const UserModel = model<UserDocument>('User', UserSchema);
