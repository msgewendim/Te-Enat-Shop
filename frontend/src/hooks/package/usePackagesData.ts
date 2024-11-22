import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addPackage,
  deletePackage,
  getPackageById,
  getPackages,
  getRandomPackages,
  getRelatedItems,
  updatePackage,
} from "../../providers/api/Packages";
import { query } from "../../providers/interface/context";
import { Package } from "../../client";
import { UpdateHookProps } from "../../providers/interface/general.props";

function useGetPackages(query: query) {
  return useQuery({
    queryKey: ["packages", query],
    queryFn: () => getPackages(query),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}

function useGetRandomPackages(query: query) {
  return useQuery({
    queryKey: ["randomPackages", "topPackages", query],
    queryFn: () => getRandomPackages<Package>(query),
    placeholderData: (previousData) => previousData,
  });
}
function useGetRelatedItems(query: query) {
  return useQuery({
    queryKey: ["relatedPackages", query],
    queryFn: () => getRelatedItems(query),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}
function useGetPackageById(id: string) {
  return useQuery({
    queryKey: ["package", id],
    queryFn: () => getPackageById(id),
  });
}

function useAddPackageMutation() {
  return useMutation({
    mutationFn: (packageData: Partial<Package>) => addPackage(packageData),
    onSuccess: (data) => {
      console.log("Package added successfully", data);
    },
    onError: (error) => {
      console.error("Failed to add packages", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useDeletePackageMutation() {
  return useMutation({
    mutationFn: (packageId: string) => deletePackage(packageId),
    onSuccess: (data) => {
      console.log("Package deleted successfully", data);
    },
    onError: (error) => {
      console.error("Failed to delete packages", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

function useUpdatePackageMutation() {
  return useMutation({
    mutationFn: (data: UpdateHookProps<Package>) =>
      updatePackage(data.itemId, data.itemData),
    onSuccess: (data) => {
      console.log("Package updated successfully", data);
    },
    onError: (error) => {
      console.error("Failed to update packages", error);
    },
    onSettled: () => {
      console.log("Mutation finished");
    },
  });
}

export {
  useGetPackages,
  useGetPackageById,
  useAddPackageMutation,
  useDeletePackageMutation,
  useUpdatePackageMutation,
  useGetRandomPackages,
  useGetRelatedItems,
};
