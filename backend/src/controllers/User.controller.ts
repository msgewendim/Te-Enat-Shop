import { Response, Request, NextFunction } from "express";
import { getUserInfo } from "../utils/middleware/auth.config";
import { UserService } from "../Service/UserService";

export class UseController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
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

}
