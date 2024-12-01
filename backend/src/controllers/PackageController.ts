import mongoose from "mongoose";
import { Response, Request, NextFunction } from "express";
import { PackageService } from "../Service/PackageService";
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/customErrors";
import {
  validateAddPackage,
  validateUpdatePackage,
} from "../validators/package";
import { validateObjectId } from "../validators";

export class PackageController {
  private packageService: PackageService;

  constructor(PackageService: PackageService) {
    this.packageService = PackageService;
  }

  async getPackage(req: Request, res: Response, next: NextFunction) {
    const packageId = req.params._id;
    if (!validateObjectId(packageId)) {
      console.log("invalid id");
      return next(new BadRequestError("Invalid package ID format"));
    }
    try {
      const packageData = await this.packageService.getPackage(packageId);
      if (!packageData) {
        throw new NotFoundError(`Package with id: ${packageId} not found`);
      }
      res.status(200).json({
        success: true,
        message: "Package fetched successfully",
        data: packageData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPackages(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query;
      const packages = await this.packageService.getAllPackages(
        Number(page),
        Number(limit)
      );
      if (!packages) {
        throw new NotFoundError("No packages found");
      }
      res.status(200).json({ success: true, data: packages });
    } catch (error) {
      next(error);
    }
  }

  async addPackage(req: Request, res: Response, next: NextFunction) {
    const packageData = req.body;
    const { error } = validateAddPackage(packageData);
    if (error) {
      return next(new ValidationError(error.message));
    }
    try {
      const newPackage = await this.packageService.addPackage(packageData);
      res.status(201).json({
        success: true,
        message: "Package Added to DB!",
        data: newPackage,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePackage(req: Request, res: Response, next: NextFunction) {
    const packageId = req.params._id;
    if (!validateObjectId(packageId)) {
      return next(new BadRequestError("Invalid package ID format"));
    }
    try {
      await this.packageService.deletePackage(packageId);
      res.status(200).json({
        success: true,
        message: "Package Deleted from DB!",
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePackage(req: Request, res: Response, next: NextFunction) {
    const packageId = req.params._id;
    const packageData = req.body;
    if (!validateObjectId(packageId)) {
      return next(new BadRequestError("Invalid package ID format"));
    }
    const { error } = validateUpdatePackage(packageData);
    if (error) {
      return next(new ValidationError(error.message));
    }
    try {
      const updatedPackage = await this.packageService.updatePackage(
        packageId,
        packageData
      );
      res.status(200).json({
        success: true,
        message: "Package Updated!",
        data: updatedPackage,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRandomPackages(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 3 } = req.query;
    try {
      const randomPackages = await this.packageService.getRandomPackages(
        Number(page),
        Number(limit)
      );
      res.status(200).json({
        success: true,
        message: "Random packages fetched successfully",
        data: randomPackages,
      });
    } catch (error) {
      next(error);
    }
  }
}
