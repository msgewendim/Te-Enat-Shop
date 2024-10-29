import { PackageService } from "../Service/PackageService";
import express, { Request, Response } from "express";
import PackageDal from "../Dal/PackageDal";
import { PackageController } from "../controllers/PackegeController";

const router = express.Router();
const packageController = new PackageController(
  new PackageService(new PackageDal())
);

router.get(
  "/",
  async (req: Request, res: Response) =>
    await packageController.getAllPackages(req, res)
);
router.get(
  "/:_id",
  async (req: Request, res: Response) =>
    await packageController.getPackage(req, res)
);
router.post(
  "/",

  async (req: Request, res: Response) =>
    await packageController.addPackage(req, res)
);
router.delete(
  "/:_id",
  async (req: Request, res: Response) =>
    await packageController.deletePackage(req, res)
);
router.put(
  "/:_id",
  async (req: Request, res: Response) =>
    await packageController.updatePackage(req, res)
);

export default router;
