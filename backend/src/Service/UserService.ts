import {
  DesignProductFormData,
  EarlyAdoptersFormData,
  NewsLetterData,
} from "../../types";
import {
  addToDesignProduct,
  addToEarlyAdapter,
  addToNewsletter,
  addToTobiaWaitList,
} from "../Dal/UserDal";
import { User } from "../models/UserSchema";

export class UserService {

  async addToNewsletter(data: NewsLetterData) {
    try {
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

}
