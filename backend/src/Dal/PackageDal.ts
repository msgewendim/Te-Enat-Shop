import { IPackage } from "../utils/interfaces/IPackageDal";
import { Package } from "../../types/product.types";
import packageModel from "../models/PackageSchema";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

export class PackageDal implements IPackage<Package> {
  async getPackage(id: string): Promise<Package> {
    try {
      const result = (await packageModel.findById(id)) as Package;
      if (!result) {
        throw new NotFoundError(`Package with id: ${id} not found`);
      }
      return result as Package;
    } catch (error) {
      throw error;
    }
  }
  async getAllPackages(page: number, limit: number): Promise<Package[]> {
    try {
      const packages = await packageModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (!packages) {
        throw new NotFoundError("No packages found");
      }
      return packages as Package[];
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
      const updatedPackage = await packageModel.findByIdAndUpdate(
        id,
        packageData
      );
      if (!updatedPackage) {
        throw new NotFoundError(`Package with id: ${id} not found`);
      }
      return updatedPackage as Package;
    } catch (error) {
      throw error;
    }
  }
  async addPackage(data: Package): Promise<Package> {
    try {
      const newPackage = await packageModel.insertMany(data);
      if (!newPackage) {
        throw new BadRequestError("Failed to add package");
      }
      return newPackage[0] as Package;
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
        items: packages as Package[],
        currentPage: page,
        totalPages: totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default PackageDal;
