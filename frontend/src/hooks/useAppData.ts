import { useQuery } from "@tanstack/react-query";
import { getRelatedItems } from "../providers/api";
import { query } from "../providers/interface/context";

function useGetRelatedItems<T>(query: query) {
  return useQuery({
    queryKey: [`${query.type} RelatedItems`, query],
    queryFn: () => getRelatedItems<T>(query),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });
}

export { useGetRelatedItems };
