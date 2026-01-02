import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  budgetApi,
  type CreateBudgetPayload,
  type filterBudgetPayload,
} from "./budgetApi";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export interface UpdateBudgetPayload extends CreateBudgetPayload {
  id: string;
}

export const useCreateBudget = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateBudgetPayload) => budgetApi.createBudget(body),

    onSuccess: (data) => {
      toast.success(data?.message || "Budget added successfully");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["budgetFilter"] });

      resetForm();
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add Budget. Please try again."
      );
    },
  });
};

export const useGetBudget = () => {
  return useQuery({
    queryKey: ["budget"],
    queryFn: () => budgetApi.getBudgets(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useGetBudgetById = (id: string | null) => {
  return useQuery({
    queryKey: ["budgetById", id],
    queryFn: () => budgetApi.getBudgetById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useUpdateBudget = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateBudgetPayload) =>
      budgetApi.updateBudget(body, body?.id),

    onSuccess: (data) => {
      toast.success(data?.message || "Budget updated successfully");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["budgetFilter"] });
      queryClient.invalidateQueries({ queryKey: ["budgetById"] });
      resetForm();
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update Budget. Please try again."
      );
    },
  });
};

export const useDeleteBudget = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => budgetApi.deleteBudget(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Budget deleted successfully");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["budget"] });
        queryClient.invalidateQueries({ queryKey: ["budgetFilter"] });
      }, 500);
      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete Budget. Please try again."
      );
    },
  });
};

export const useBudgetFilter = (filters: filterBudgetPayload) => {
  return useQuery({
    queryKey: ["budgetFilter", filters],
    queryFn: () => budgetApi.filterBudget(filters),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
