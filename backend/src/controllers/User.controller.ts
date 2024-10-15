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
      return res.status(401).json({ message: "log in to proceed" });
    }
    const userInfo = await getUserInfo(accessToken);

    if (!userInfo) {
      return res.status(401).json({ message: "invalid access token" });
    }
    const { userId } = req.params;
    const updatedUser = await this.userService.updateUserWithAuth(req.body);
    res.status(200).json({ message: "User updated successfully", updatedUser });
  }

  async createUserWithoutAuth(req: Request, res: Response) {}

  async addToCart(req: Request, res: Response) {}

  async clearCart(req: Request, res: Response) {}

  async getCart(req: Request, res: Response) {}

  async getUser(req: Request, res: Response) {}

  async placeOrder(req: Request, res: Response) {}
}
