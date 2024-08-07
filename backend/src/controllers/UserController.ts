import { UserService } from "../Service/UserService";
import { Response, Request } from "express";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params._id;
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const createdUser = await this.userService.createUser(userData);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params._id;
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(userId, userData);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}