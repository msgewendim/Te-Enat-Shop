import { PackageService } from "../Service/PackageService";
import express, { NextFunction, Request, Response } from "express";
import PackageDal from "../Dal/PackageDal";
import { PackageController } from "../controllers/PackageController";
import jwtCheck from "../utils/middleware/auth.config";

const router = express.Router();
const packageController = new PackageController(
  new PackageService(new PackageDal())
);

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) =>
    await packageController.getAllPackages(req, res, next)
);
router.get(
  "/random",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("packagesRoute: random request started");
    await packageController.getRandomPackages(req, res, next);
  }
);

router.get(
  "/:_id",
  async (req: Request, res: Response, next: NextFunction) =>
    await packageController.getPackage(req, res, next)
);
router.post(
  "/",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await packageController.addPackage(req, res, next)
);
router.delete(
  "/:_id",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await packageController.deletePackage(req, res, next)
);
router.put(
  "/:_id",
  jwtCheck,
  async (req: Request, res: Response, next: NextFunction) =>
    await packageController.updatePackage(req, res, next)
);

export default router;
