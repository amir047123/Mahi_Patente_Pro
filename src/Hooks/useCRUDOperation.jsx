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
        filters?.dateRange?.from,
        filters?.dateRange?.to,
        filters?.quizType,
        filters?.order,
        filters?.subject,
        filters?.category,
        filters?.userId,
      ],
      queryFn: async () => {
        const queryParams = new URLSearchParams();
        const adjustDateForQuery = (date, type) => {
          const d = new Date(date);
          const timezoneOffset = d.getTimezoneOffset();

          d.setMinutes(d.getMinutes() - timezoneOffset);

          if (type === "from") {
            d.setUTCHours(0, 0, 0, 0);
          } else if (type === "to") {
            d.setUTCHours(23, 59, 59, 999);
          }

          return d.toISOString();
        };

        if (filters?.currentPage)
          queryParams.append("page", filters?.currentPage.toString());
        if (filters?.itemPerPage)
          queryParams.append("limit", filters?.itemPerPage.toString());
        if (filters?.searchText)
          queryParams.append("search", filters?.searchText);
        if (filters?.status) queryParams.append("status", filters?.status);

        if (filters?.dateRange?.from) {
          queryParams.append(
            "startDate",
            adjustDateForQuery(filters.dateRange.from, "from")
          );
        }
        if (filters?.dateRange?.to) {
          queryParams.append(
            "endDate",
            adjustDateForQuery(filters.dateRange.to, "to")
          );
        }
        if (filters?.quizType)
          queryParams.append("quizType", filters?.quizType);
        if (filters?.order) queryParams.append("order", filters?.order);
        if (filters?.subject) queryParams.append("subject", filters?.subject);
        if (filters?.category)
          queryParams.append("category", filters?.category);
        if (filters?.userId) queryParams.append("userId", filters?.userId);

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
