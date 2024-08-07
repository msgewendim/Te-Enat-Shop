import { User } from "../../utils/types";
import { UserService } from "../Service/UserService";
import { Response, Request } from "express";

export class AuthController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response): Promise<void> {
  }

  async register(req: Request, res: Response): Promise<void> {
  }

  async loginWithGoogle(req: Request, res: Response): Promise<User>{
    
  }
}