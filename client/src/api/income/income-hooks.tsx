import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  incomeApi,
  type CreateIncomePayload,
  type filterIncomePayload,
} from "./incomeApi";
import { toast } from "react-toastify";
import type { GoalIncomeFilterResponse } from "../../types/response-types";
import type { AxiosError } from "axios";

export interface updateIncomePayload extends CreateIncomePayload {
  id: string;
}

export const useCreateIncome = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateIncomePayload) => incomeApi.createIncome(body),

    onSuccess: (data) => {
      toast.success(data?.message || "Income added successfully");
      // Invalidate income queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["incomeFilter"] });
      queryClient.invalidateQueries({ queryKey: ["incomeBalance"] });
      queryClient.invalidateQueries({
        queryKey: ["unread-notification-count"],
      });
      queryClient.invalidateQueries({
        queryKey: ["goal"],
      });
      queryClient.invalidateQueries({ queryKey: ["spendHistory"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyExpenseIncome"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboardSummaryCards"],
      });
      resetForm();
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add income. Please try again."
      );
    },
  });
};

export const useGetIncome = () => {
  return useQuery({
    queryKey: ["income"],
    queryFn: () => incomeApi.getIncome(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useGetIncomeById = (id: string | null) => {
  return useQuery({
    queryKey: ["incomeById", id],
    queryFn: () => incomeApi.getIncomeById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!id, // Only run query if id exists
  });
};

export const useUpdateIncome = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: updateIncomePayload) =>
      incomeApi.updateIncome(body, body?.id),

    onSuccess: (data) => {
      toast.success(data?.message || "Income updated successfully");
      // Invalidate income queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["incomeFilter"] });
      queryClient.invalidateQueries({ queryKey: ["incomeById"] });
      queryClient.invalidateQueries({ queryKey: ["spendHistory"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyExpenseIncome"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboardSummaryCards"],
      });
      resetForm();
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update income. Please try again."
      );
    },
  });
};

export const useDeleteIncome = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => incomeApi.deleteIncome(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Income deleted successfully");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["income"] });
        queryClient.invalidateQueries({ queryKey: ["incomeFilter"] });
      }, 500);
      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete income. Please try again."
      );
    },
  });
};

export const useIncomeFilter = (filters: filterIncomePayload) => {
  return useQuery<GoalIncomeFilterResponse>({
    queryKey: ["incomeFilter", filters],
    queryFn: () => incomeApi.useFilterIncome(filters),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useIncomeBalance = () => {
  return useQuery({
    queryKey: ["incomeBalance"],
    queryFn: () => incomeApi.getIncomeBalance(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
