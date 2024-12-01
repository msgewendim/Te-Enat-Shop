import { IPackage } from "../utils/interfaces/IPackageDal";
import { Package } from "../../types/product.types";
import packageModel from "../models/PackageSchema";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

export class PackageDal implements IPackage<Package> {
  async getPackage(id: string): Promise<Package | null> {
    try {
      const result = (await packageModel.findById(id)) as Package;
      if (!result) {
        throw new NotFoundError(`Package with id: ${id} not found`);
      }
      return result;
    } catch (error) {
      throw new NotFoundError(`Package with id: ${id} not found`);
    }
  }
  async getAllPackages(
    page: number,
    limit: number
  ): Promise<Package[] | unknown[]> {
    try {
      const packages = await packageModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (!packages) {
        throw new NotFoundError("No packages found");
      }
      return packages;
    } catch (error) {
      throw error;
    }
  }
  async deletePackage(id: string): Promise<void> {
    try {
      const result = await packageModel.deleteOne({
        _id: id,
      });
      if (!result.deletedCount) {
        throw new NotFoundError(`Package with id: ${id} not found`);
      }
    } catch (error) {
      throw error;
    }
  }
  async updatePackage(
    id: string,
    packageData: Partial<Package>
  ): Promise<Package> {
    try {
      const updatedPackage = (await packageModel.findByIdAndUpdate(
        id,
        packageData
      )) as Package;
      if (!updatedPackage) {
        throw new NotFoundError(`Package with id: ${id} not found`);
      }
      return updatedPackage;
    } catch (error) {
      throw error;
    }
  }
  async addPackage(data: Package): Promise<Package> {
    try {
      const newPackage = (await packageModel.insertMany(data)) as Package[];
      if (!newPackage) {
        throw new BadRequestError("Failed to add package");
      }
      console.log("Package created successfully", newPackage);
      return newPackage[0];
    } catch (error) {
      throw error;
    }
  }

  async getRandomPackages(page: number, limit: number) {
    try {
      const totalPackages = await packageModel.countDocuments();
      const totalPages = Math.ceil(totalPackages / limit);
      const packages = await packageModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (!packages) {
        throw new NotFoundError("No packages found");
      }
      return {
        items: packages,
        currentPage: page,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default PackageDal;
