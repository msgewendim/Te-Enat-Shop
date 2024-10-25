import { Response, Request } from "express";
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

  async createUserWithoutAuth(req: Request, res: Response) {}

  async addToCart(req: Request, res: Response) {}

  async clearCart(req: Request, res: Response) {}

  async getCart(req: Request, res: Response) {}

  async getUser(req: Request, res: Response) {}

  async placeOrder(req: Request, res: Response) {}
}
