import { baseURL } from "@/Config";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

async function handleFetchResponse(response) {
  if (!response.ok) {
    let message = "An unknown error occurred";
    try {
      const errorBody = await response.json();
      if (errorBody && typeof errorBody.message === "string") {
        message = errorBody.message;
      }
    } catch {
      message = await response.text();
    }
    throw new Error(`${message}`);
  }

  return response.json();
}

export function useCrudOperations(endpoint) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const useFetchEntities = (filters) => {
    return useQuery({
      queryKey: [
        endpoint,
        filters?.currentPage,
        filters?.itemPerPage,
        filters?.searchText,
        filters?.status,
        filters?.email,
        filters?.userId,
        filters?.withSubCategories,
        filters?.id,
      ],
      queryFn: async () => {
        const queryParams = new URLSearchParams();
        if (filters?.currentPage)
          queryParams.append("page", filters?.currentPage.toString());
        if (filters?.itemPerPage)
          queryParams.append("limit", filters?.itemPerPage.toString());
        if (filters?.searchText)
          queryParams.append("search", filters?.searchText);
        if (filters?.status) queryParams.append("status", filters?.status);
        if (filters?.email) queryParams.append("email", filters?.email);
        if (filters?.userId) queryParams.append("userId", filters?.userId);
        if (filters?.withSubCategories)
          queryParams.append("withSubCategories", filters?.withSubCategories);
        if (filters?.id) queryParams.append("id", filters?.id);

        const response = await fetch(
          `${baseURL}/${endpoint}?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        return handleFetchResponse(response);
      },
      placeholderData: keepPreviousData,
    });
  };

  const useEntityById = (id) => {
    return useQuery({
      queryKey: [endpoint, id],
      queryFn: async () => {
        const response = await fetch(`${baseURL}/${endpoint}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        return handleFetchResponse(response);
      },
      enabled: !!id,
      placeholderData: keepPreviousData,
    });
  };

  const createEntity = useMutation({
    mutationFn: async (newEntity) => {
      const response = await fetch(`${baseURL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntity),
        credentials: "include",
      });
      return handleFetchResponse(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });

  const updateEntity = useMutation({
    mutationFn: async (updatedEntity) => {
      const response = await fetch(
        `${baseURL}/${endpoint}/${updatedEntity._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEntity),
          credentials: "include",
        }
      );
      return handleFetchResponse(response);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      queryClient.invalidateQueries({ queryKey: [endpoint, variables._id] });
    },
  });

  const deleteEntity = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${baseURL}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      return handleFetchResponse(response);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      queryClient.invalidateQueries({ queryKey: [endpoint, variables] });
    },
  });

  return {
    useFetchEntities,
    useEntityById,
    createEntity,
    updateEntity,
    deleteEntity,
  };
}
