import PackageDal from "../Dal/PackageDal";
import { Package } from "../../types/product.types";
import { RandomItemsResponse } from "../../types";
import { BadRequestError, NotFoundError } from "../utils/customErrors";

export class PackageService {
  private PackageDataAccess: PackageDal;

  constructor(PackageDataAccess: PackageDal) {
    this.PackageDataAccess = PackageDataAccess;
  }

  async getPackage(packageId: string): Promise<Package> {
    try {
      const result = await this.PackageDataAccess.getPackage(packageId);
      if (!result) {
        throw new NotFoundError(`Package with id: ${packageId} not found`);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async addPackage(packageData: Package): Promise<void> {
    try {
      await this.PackageDataAccess.addPackage(packageData);
    } catch (error) {
      throw new BadRequestError(
        "Cannot add Package! " + (error as Error).message
      );
    }
  }

  async getAllPackages(page: number, limit: number): Promise<Package[]> {
    try {
      return (await this.PackageDataAccess.getAllPackages(
        page,
        limit
      )) as Package[];
    } catch (error) {
      throw new BadRequestError(
        "No Packages Found! " + (error as Error).message
      );
    }
  }

  async updatePackage(packageId: string, packageData: Package): Promise<void> {
    try {
      await this.PackageDataAccess.updatePackage(packageId, packageData);
    } catch (error) {
      throw new BadRequestError(
        `Cannot update Package! ${(error as Error).message}`
      );
    }
  }

  async deletePackage(packageId: string): Promise<void> {
    try {
      await this.PackageDataAccess.deletePackage(packageId);
    } catch (error) {
      throw new NotFoundError(
        `Can't delete Package with id: ${packageId}. ${
          (error as Error).message
        }`
      );
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
      throw new BadRequestError(
        `Can't get Random Packages: ${(error as Error).message}`
      );
    }
  }
}
