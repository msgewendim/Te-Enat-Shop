import PackageDal from "../Dal/PackageDal";
import { Package } from "../../types/product.types";
import { RandomItemsResponse } from "../../types";

export class PackageService {
  private PackageDataAccess: PackageDal;

  constructor(PackageDataAccess: PackageDal) {
    this.PackageDataAccess = PackageDataAccess;
  }

  async getPackage(packageId: string): Promise<Package> {
    try {
      return (await this.PackageDataAccess.getPackage(packageId)) as Package;
    } catch (error) {
      throw error;
    }
  }

  async addPackage(packageData: Package): Promise<void> {
    try {
      await this.PackageDataAccess.addPackage(packageData);
    } catch (error) {
      throw error;
    }
  }

  async getAllPackages(page: number, limit: number): Promise<Package[]> {
    try {
      return (await this.PackageDataAccess.getAllPackages(
        page,
        limit
      )) as Package[];
    } catch (error) {
      throw error;
    }
  }

  async updatePackage(packageId: string, packageData: Package): Promise<void> {
    try {
      await this.PackageDataAccess.updatePackage(packageId, packageData);
    } catch (error) {
      throw error;
    }
  }

  async deletePackage(packageId: string): Promise<void> {
    try {
      await this.PackageDataAccess.deletePackage(packageId);
    } catch (error) {
      throw error;
    }
  }

  async getRandomPackages(
    page: number,
    limit: number
  ): Promise<RandomItemsResponse> {
    try {
      const result = await this.PackageDataAccess.getRandomPackages(
        page,
        limit
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
