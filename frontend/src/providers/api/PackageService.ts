// import { Package } from "../../client";
// import useGenericData from "../../hooks/app/useGenericData";

// const endpoint = "/packages";
// const { useGetRandomItems, useGetRelatedItems } =
//   useGenericData<Package>(endpoint);

// const getRandomPackages = async <T>(
//   q: query
// ): Promise<RandomItemsResponse<T>> => {
//   return (
//     await axiosInstance.get("/packages", {
//       params: q,
//     })
//   ).data;
// };
// const getPackages = async (q: query): Promise<Package[]> => {
//   // Fetch data from your API endpoint with the provided query
//   return (await axiosInstance.get("/packages", { params: q })).data.packages;
// };

// const getPackageById = async (id: string): Promise<Package> => {
//   // Fetch data from your API endpoint with the provided ID
//   return (await axiosInstance.get(`/packages/${id}`)).data;
// };

// const addPackage = async (
//   packageData: Partial<Package>,
//   token: string
// ): Promise<Package> => {
//   // Create a new package in your API endpoint with the provided data
//   return (
//     await axiosInstance.post("/packages", packageData, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//   ).data;
// };
// const getRelatedItems = async (
//   query: query
// ): Promise<Package[] | Package[]> => {
//   return (
//     await axiosInstance.get(`/${query.type}`, {
//       params: { query },
//     })
//   ).data;
// };
// const updatePackage = async (
//   id: string,
//   packageData: Partial<Package>,
//   token: string
// ): Promise<Package> => {
//   // Update the package with the provided ID in your API endpoint with the provided data
//   return (
//     await axiosInstance.put(`/packages/${id}`, packageData, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//   ).data;
// };

// const deletePackage = async (id: string, token: string): Promise<void> => {
//   // Delete the package with the provided ID from your API endpoint
//   await axiosInstance.delete(`/packages/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// export {
//   getRelatedItems,
//   getPackages,
//   getPackageById,
//   addPackage,
//   updatePackage,
//   deletePackage,
//   getRandomPackages,
// };
