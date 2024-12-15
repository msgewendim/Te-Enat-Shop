import { Response, Request, NextFunction } from "express";
import { getUserInfo } from "../utils/middleware/auth.config";
import { UserService } from "../Service/UserService";

export class UseController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  async updateUserWithAuth(req: Request, res: Response) {
    const accessToken = req.auth?.token;
    console.log(accessToken, "access token");
    if (!accessToken) {
      throw new Error("Access token not provided");
    }
    const userInfo = await getUserInfo(accessToken);
    console.log("userInfo", userInfo);
    if (!userInfo) {
      throw new Error("Invalid access token");
    }
    const updatedUser = await this.userService.updateUserWithAuth(req.body);
    return updatedUser;
  }

  async addToNewsletter(req: Request, res: Response, next: NextFunction) {
    try {
      const {data} = req.body;
      await this.userService.addToNewsletter(data);
      res.status(201).json({
        success: true,
        message: "Added to newsletter",
      });
    } catch (error) {
      next(error);
    }
  }
  async addToTobiaWaitList(req: Request, res: Response, next: NextFunction) {
    try {
      const {data} = req.body;
      console.log(data)
      await this.userService.addToTobiaWaitList(data);
      res.status(201).json({
        success: true,
        message: "Added to Tobia waitlist",
      });
    } catch (error) {
      next(error);
    }
  }

  async addToEarlyAdapter(req: Request, res: Response, next: NextFunction) {
    try {
      const {data} = req.body;
      await this.userService.addToEarlyAdapter(data);
      res.status(201).json({
        success: true,
        message: "Added to early adapters",
      });
    } catch (error) {
      next(error);
    }
  }

  async addToDesignProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {data} = req.body;
      await this.userService.addToDesignProduct(data);
      res.status(201).json({
        success: true,
        message: "Added to design-product",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response) {}

  async placeOrder(req: Request, res: Response) {}
}
