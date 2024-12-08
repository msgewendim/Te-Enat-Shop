import {
  DesignProductFormData,
  EarlyAdoptersFormData,
  NewsLetterData,
} from "../../types";
import {
  addToDesignProduct,
  addToEarlyAdapter,
  addToNewsletter,
} from "../Dal/UserDal";
import { User } from "../models/UserSchema";

export class UserService {
  async updateUserWithAuth(user: Partial<User>) {}

  async createUserWithoutAuth(user: Partial<User>) {}

  async addToNewsletter(data: NewsLetterData) {
    try {
      console.log(data, " newsletter data");
      await addToNewsletter(data);
    } catch (error) {
      throw error;
    }
  }

  async addToDesignProduct(data: DesignProductFormData) {
    try {
      await addToDesignProduct(data);
    } catch (error) {
      throw error;
    }
  }

  async addToEarlyAdapter(data: EarlyAdoptersFormData) {
    try {
      await addToEarlyAdapter(data);
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId: string) {
    // Implement logic to fetch user from database
    // Return user object or null if not found
  }

  async placeOrder(userId: string, orderId: string): Promise<void> {
    // Implement logic to place order for user and order
    // Update user's order list with new order ID
  }
}
