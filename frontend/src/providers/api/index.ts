import axios from "axios";
import { BASE_API_URL } from "../../utils/env.config";
import { query } from "../interface/context";

const axiosInstance = axios.create({ baseURL: BASE_API_URL });

const getRelatedItems = async <T>(query: query): Promise<T[]> => {
  return (
    await axiosInstance.get(`/${query.type}`, {
      params: { query },
    })
  ).data;
};
export { axiosInstance, getRelatedItems };
