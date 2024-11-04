import PackageDal from "../Dal/PackageDal";
import { Package } from "../../types/product.types";

export class PackageService {
  private PackageDataAccess: PackageDal;

  constructor(PackageDataAccess: PackageDal) {
    this.PackageDataAccess = PackageDataAccess;
  }

  async getPackage(packageId: string): Promise<Package> {
    const result = await this.PackageDataAccess.getPackage(packageId);
    if (!result) {
      throw new Error(`Package with id : ${packageId} Not found`);
    }
    return result;
  }

  async addPackage(packageData: Package): Promise<void> {
    try {
      await this.PackageDataAccess.addPackage(packageData);
    } catch (error) {
      console.log(error);
      throw new Error("Can not add Package!");
    }
  }

  async getAllPackages(
    page: number,
    limit: number
  ): Promise<Package[] | unknown> {
    try {
      return (await this.PackageDataAccess.getAllPackages(
        page,
        limit
      )) as Package[];
    } catch (error) {
      throw new Error("NO Packages Found!");
    }
  }

  async updatePackage(packageId: string, packageData: Package): Promise<void> {
    try {
      await this.PackageDataAccess.updatePackage(packageId, packageData);
    } catch (error) {
      throw new Error(`Can not update Package! ${(error as Error).message}`);
    }
  }

  async deletePackage(packageId: string): Promise<void> {
    try {
      await this.PackageDataAccess.deletePackage(packageId);
    } catch (error) {
      throw new Error(`Can't delete Package ${(error as Error).message}`);
    }
  }
}
