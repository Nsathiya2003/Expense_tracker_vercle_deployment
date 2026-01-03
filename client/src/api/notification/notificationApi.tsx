import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface filterNotificationPayload {
  page: number;
  limit: number;
  read?: boolean;
}

export const notificationApi = {
  useNotificationFilter: (body: filterNotificationPayload) =>
    handleRequest(apiClient.post("/api/notification/findAll", body)),
  markAsRead: (body: { ids: string[] }) =>
    apiClient.put("/api/notification/mark-read", body),
  deleteNotifications: (body: { ids: string[] }) =>
    apiClient.delete("/api/notification/delete", { data: body }),
};
