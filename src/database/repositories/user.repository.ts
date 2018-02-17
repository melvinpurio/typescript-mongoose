import { Document, Types } from 'mongoose';

import { UserDocument, UserModel } from '../models/user.model';

interface User {
  name: string;
  email: string;
  password: string;
}

export class UserRepository {

  public async getUserById(id: string): Promise<UserDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      return  null;
    }
    const data = await UserModel.findById(id).exec(); 
    return data;
  }
  public async createUser(data: User): Promise<UserDocument> {
    const user = await UserModel.create(data);
    return user;
  }
  public async getUserByEmail(email: string): Promise<UserDocument | null> {
    const user = await UserModel.findOne({
      email: email
    }).exec();
    return user;
  }
  public async getUsersByName(name: string): Promise<UserDocument[]> {
    const user = await UserModel.find({
      name: name
    }).exec();
    return user;
  }
}

