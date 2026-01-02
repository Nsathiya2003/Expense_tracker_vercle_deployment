import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  notificationApi,
  type filterNotificationPayload,
} from "./notificationApi";
import type { NotificationTypeResponse } from "../../types/response-types";

export interface markNotificationAsReadPayload {
  id: string;
  read: boolean;
}

export const useNotificationFilter = (filters: filterNotificationPayload) => {
  return useQuery<NotificationTypeResponse>({
    queryKey: ["notificationFilter", filters],
    queryFn: () => notificationApi.useNotificationFilter(filters),
    refetchOnMount: "always",

    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await notificationApi.markAsRead({ ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unread-notification-count"],
      });
    },
  });
};

export const useDeleteNotifications = () => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await notificationApi.deleteNotifications({ ids });
    },
  });
};
