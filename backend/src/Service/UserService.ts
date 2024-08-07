import { UserDal } from "../Dal/UserDal";
import { User } from "../../utils/types";
import bcrypt from 'bcrypt'


export class UserService {
  private userDal: UserDal;

  constructor(userDal: UserDal) {
    this.userDal = userDal;
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user =  await this.userDal.getUserById(id);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      const {password, ...restData} = user;
      return restData as User;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData: User): Promise<User> {
    try {
      // check if user already exists
      const existingUser = await this.userDal.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error(`User with email ${userData.email} already exists`);
      }
      // create new user && encrypt user password
      const hashedPassword = hashPassword(userData.password);
      userData.password = hashedPassword
      const user =  await this.userDal.createUser(userData);
      if (!user) {
        throw new Error(`Error creating user`);
      }
      // return user info without password
      const {password, ...result} = user
      return result as User;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const user =  await this.userDal.updateUser(id, userData);
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      const {password,...result} = user;
      return result as User;
    } catch (error) {
      throw error;
    }
  }
}


const hashPassword = (password: string) : string => {
  const salt = 10
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}