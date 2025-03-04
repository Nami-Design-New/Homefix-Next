import clientAxios from "@/app/_lib/clientAxios";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategory(enabled) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await clientAxios.get("/homefix/specialities");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching cities:", error.message);
        throw error;
      }
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error, refetch, isFetched };
}
