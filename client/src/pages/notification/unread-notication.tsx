import { useQuery } from "@tanstack/react-query";
import { notificationApi } from "../../api/notification/notificationApi";

export const useUnreadNotification = () => {
  return useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () =>
      notificationApi.useNotificationFilter({
        page: 1,
        limit: 1,
        read: false,
      }),
    // refetchInterval: 300, // ⏱ auto refresh every 30 sec
    refetchOnWindowFocus: true,
  });
};
