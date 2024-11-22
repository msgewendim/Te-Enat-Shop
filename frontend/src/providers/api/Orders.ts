import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from ".";
import { Order } from "../../client/types.gen";
import { query } from "./../interface/context";

export const getOrders = async (q: query): Promise<Order[]> => {
  return (await axiosInstance.get("/orders", { params: q })).data;
};

export const useGetOrders = (q: query) => {
  return useQuery({
    queryKey: ["orders", q],
    queryFn: () => getOrders(q),
  });
};
