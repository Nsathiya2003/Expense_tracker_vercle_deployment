import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface filterNotificationPayload {
  page: number;
  limit: number;
  read?: boolean;
}

export const notificationApi = {
  useNotificationFilter: (body: filterNotificationPayload) =>
    handleRequest(apiClient.post("/notification/findAll", body)),
  markAsRead: (body: { ids: string[] }) =>
    apiClient.put("/notification/mark-read", body),
  deleteNotifications: (body: { ids: string[] }) =>
    apiClient.delete("/notification/delete", { data: body }),
};
