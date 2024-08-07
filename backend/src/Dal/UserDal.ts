import { IUser } from "../../utils/interfaces/IUser";
import { User } from "../../utils/types";
import userModel from "../models/User";

export class UserDal implements IUser<User> {
  async getUserById(_id: string): Promise<User | null> {
    return await userModel.findById(_id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await userModel.findOne({ email: email });
  }
  async createUser(userData: User): Promise<User> {
    const user = await userModel.create(userData);
    return user as User;
  }
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const updatedUser = await userModel
      .findByIdAndUpdate(id, userData, { new: true })
      .exec();
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser as User;
  }
}
