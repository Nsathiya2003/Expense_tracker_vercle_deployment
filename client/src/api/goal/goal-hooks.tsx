import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GoalApi,
  type CreateGoalPayload,
  type filter_body,
  type UpdateGoalPayload,
} from "./goalApi";
import { toast } from "react-toastify";
import type {
  GoalFilterResponse,
  GoalHistoryFilterResponse,
} from "../../types/response-types";

export const useCreateGoal = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateGoalPayload) => GoalApi.createGoal(body),

    onSuccess: (data) => {
      toast.success(`${data?.message}` || "Your new goal was created");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["goal"] });
      }, 3000);
      resetForm();
    },

    onError: (error) => {
      toast.error(`${error?.message}` || " error creating goal...");
    },
  });
};

export const useFindAllGoal = () => {
  return useQuery({
    queryFn: () => GoalApi.findGoal(),
    queryKey: ["goal"],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useGetGoalById = (id: string | null) => {
  return useQuery({
    queryFn: () => GoalApi.findOne(id!),
    enabled: !!id,
    queryKey: ["findById", id],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateGoal = (resetForm: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateGoalPayload) => GoalApi.updateGoal(body),
    onSuccess: (data) => {
      toast.success(`${data?.message}` || "Your goal was updated successfully");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["goal"] });
      }, 3000);
      resetForm();
    },

    onError: (error) => {
      toast.error(`${error?.message}` || " error updating goal...");
    },
  });
};

export const useDeleteGoal = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => GoalApi.deleteGoal(id),
    onSuccess: (data) => {
      toast.success(`${data?.message}` || "Your goal is deleted");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["goal"] });
      }, 3000);
      if (onSuccess) onSuccess();
    },

    onError: (error) => {
      toast.error(`${error?.message}` || " error deleting goal...");
    },
  });
};

export const useGoalFilter = (filters: filter_body) => {
  return useQuery<GoalFilterResponse>({
    queryKey: ["goal", filters],
    queryFn: () => GoalApi.filterGoal(filters),
    staleTime: 1000 * 60,
  });
};

export const useViewGoalHistory = (filters: filter_body) => {
  return useQuery<GoalHistoryFilterResponse>({
    queryKey: ["goalHistory", filters],
    queryFn: () => GoalApi.ViewGoalHistory(filters),
    staleTime: 1000 * 60,
  });
};
