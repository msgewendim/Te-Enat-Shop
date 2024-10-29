import { IPackage } from "../utils/interfaces/IPackageDal";
import { Package } from "../../types/product.types";
import packageModel from "../models/PackageSchema";

export class PackageDal implements IPackage<Package> {
  async getPackage(id: string): Promise<Package | null> {
    try {
      const result = (await packageModel.findById(id)) as Package;
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getAllPackages(): Promise<Package[] | unknown[]> {
    try {
      const packages = await packageModel.find();
      return packages;
    } catch (error) {
      throw error;
    }
  }
  async deletePackage(id: string): Promise<void> {
    try {
      await packageModel.deleteOne({
        _id: id,
      });
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
      return updatedPackage;
    } catch (error) {
      throw error;
    }
  }
  async addPackage(data: Package): Promise<Package> {
    try {
      const newPackage = (await packageModel.insertMany(data)) as Package[];
      console.log("Package created successfully", newPackage);
      return newPackage[0];
    } catch (error) {
      throw error;
    }
  }
}

export default PackageDal;
