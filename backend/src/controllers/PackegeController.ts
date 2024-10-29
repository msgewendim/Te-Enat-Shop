import { Response, Request } from "express";
import { PackageService } from "../Service/PackageService";

export class PackageController {
  private packageService: PackageService;

  constructor(PackageService: PackageService) {
    this.packageService = PackageService;
  }

  async getPackage(req: Request, res: Response) {
    const packageId = req.params._id;
    try {
      const data = await this.packageService.getPackage(packageId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async getAllPackages(req: Request, res: Response) {
    try {
      const packages = await this.packageService.getAllPackages();
      res.status(200).json(packages);
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async addPackage(req: Request, res: Response) {
    const packageData = req.body;
    console.log(packageData, "package data ");
    try {
      await this.packageService.addPackage(packageData);
      res.status(201).json({ message: "Package Added to DB!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async deletePackage(req: Request, res: Response) {
    const packageId = req.params._id;
    console.log("Package Id to delete: " + packageId);
    try {
      await this.packageService.deletePackage(packageId);
      res.status(200).json({ message: "Package Deleted from DB!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

  async updatePackage(req: Request, res: Response) {
    const packageId = req.params._id;
    const packageData = req.body;
    try {
      await this.packageService.updatePackage(packageId, packageData);
      res.status(201).json({ message: "Package Updated!" });
    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }
}
