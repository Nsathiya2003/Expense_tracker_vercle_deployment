import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  expenseApi,
  type CheckBudgetLimitPayload,
  type CreateExpensePayload,
  type filterExpensePayload,
} from "./expenseApi";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export interface updateExpensePayload extends CreateExpensePayload {
  id: string;
}

export const useCreateExpense = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateExpensePayload) => expenseApi.createExpense(body),

    onSuccess: (data) => {
      toast.success(data?.message || "Expense added successfully");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      queryClient.invalidateQueries({ queryKey: ["expenseFilter"] });
      queryClient.invalidateQueries({ queryKey: ["incomeBalance"] });
      queryClient.invalidateQueries({
        queryKey: ["unread-notification-count"],
      });
      queryClient.invalidateQueries({ queryKey: ["spendHistory"] });
      queryClient.invalidateQueries({ queryKey: ["monthlyExpenseIncome"] });
      queryClient.invalidateQueries({
        queryKey: ["dashboardSummaryCards"],
      });

      resetForm();
    },

    onError: (error: unknown) => {
      const apiError = error as {
        message?: string;
        status?: number;
      };

      toast.error(apiError?.message || "Something went wrong");
    },
  });
};

export const useGetExpense = () => {
  return useQuery({
    queryKey: ["expense"],
    queryFn: () => expenseApi.getExpense(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useGetExpenseById = (id: string | null) => {
  return useQuery({
    queryKey: ["expenseById", id],
    queryFn: () => expenseApi.getExpenseById(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useUpdateExpense = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: updateExpensePayload) =>
      expenseApi.updateExpense(body, body?.id),

    onSuccess: (data) => {
      toast.success(data?.message || "Expense updated successfully");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
      queryClient.invalidateQueries({ queryKey: ["expenseFilter"] });
      queryClient.invalidateQueries({ queryKey: ["expenseById"] });
      queryClient.invalidateQueries({ queryKey: ["incomeBalance"] });
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
          "Failed to update expense. Please try again."
      );
    },
  });
};

export const useDeleteExpense = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => expenseApi.deleteExpense(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Expense deleted successfully");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["expense"] });
        queryClient.invalidateQueries({ queryKey: ["expenseFilter"] });
        queryClient.invalidateQueries({ queryKey: ["incomeBalance"] });
      }, 300);
      if (onSuccess) onSuccess();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete expense. Please try again."
      );
    },
  });
};

export const useExpenseFilter = (filters: filterExpensePayload) => {
  return useQuery({
    queryKey: ["expenseFilter", filters],
    queryFn: () => expenseApi.useFilterExpense(filters),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useCheckBudgetLimit = () => {
  return useMutation({
    mutationFn: (body: CheckBudgetLimitPayload) =>
      expenseApi.checkBudgetLimit(body),
  });
};
