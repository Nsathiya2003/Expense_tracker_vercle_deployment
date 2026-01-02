import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useDeleteNotifications,
  useMarkNotificationAsRead,
  useNotificationFilter,
} from "../../api/notification/notification-hooks";

type TabType = "all" | "unread" | "read";

interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  fullMessage: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const navigate = useNavigate();

  /* ----------------------------------
     FILTER PAYLOAD (same as list page)
  ----------------------------------- */
  const filterPayload = useMemo(() => {
    if (activeTab === "read") return { page: 1, limit: 5, read: true };
    if (activeTab === "unread") return { page: 1, limit: 5, read: false };
    return { page: 1, limit: 5 };
  }, [activeTab]);

  const { data, isLoading, refetch } = useNotificationFilter(filterPayload);

  const notifications: NotificationItem[] = data?.data || [];

  const markAsReadMutation = useMarkNotificationAsRead();
  const deleteNotificationsMutation = useDeleteNotifications();

  /* ----------------------------------
     REFRESH WHEN DIALOG OPENS
  ----------------------------------- */
  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  const handleExpand = (item: NotificationItem) => {
    const isOpening = expandedId !== item._id;
    setExpandedId(isOpening ? item._id : null);

    if (isOpening && !item.read) {
      markAsReadMutation.mutate([item._id], {
        onSuccess: () => refetch(),
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteNotificationsMutation.mutate([id], {
      onSuccess: () => refetch(),
    });
  };

  const handleViewAll = () => {
    navigate("/notification");
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/40 backdrop-blur-sm data-[state=open]:animate-fadeIn d
        ata-[state=closed]:animate-fadeOut"
        />

        <Dialog.Content
          className={`absolute top-[60px] right-[8px] bg-[#2E2E48] text-white p-6 rounded-md 
          shadow-2xl border border-gray-700 w-[450px]
          data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Notifications
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 border-b border-gray-700 mb-4">
            {(["all", "unread", "read"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setExpandedId(null);
                }}
                className={`capitalize pb-2 px-10 text-sm font-medium transition ${
                  activeTab === tab
                    ? "border-b-2 border-[#54af54] text-[#54af54]"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {isLoading && (
              <p className="text-center text-gray-400 text-sm py-6">
                Loading notifications...
              </p>
            )}

            {!isLoading &&
              notifications.map((item) => {
                const isExpanded = expandedId === item._id;

                return (
                  <div
                    key={item._id}
                    onClick={() => handleExpand(item)}
                    className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-all
                      ${
                        item.read
                          ? "bg-[#2d2d50]/70 border-[#3e3e66] opacity-80"
                          : "bg-[#3d3d6b] border-[#6ee7b7]/30"
                      } hover:brightness-110`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        {!item.read && (
                          <div className="w-2 h-2 mt-2 rounded-full bg-[#6ee7b7] animate-pulse" />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-300 mt-1">
                            {item.message}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Delete notification"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-2 border-t border-[#3e3e66]/60 pt-2 text-xs text-gray-300 leading-relaxed animate-fadeIn">
                        {item.fullMessage}
                      </div>
                    )}
                  </div>
                );
              })}

            {!isLoading && notifications.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-6 italic">
                No notifications found.
              </p>
            )}
          </div>

          {/* View All */}
          <div className="flex justify-center mt-5">
            <button
              onClick={handleViewAll}
              className="text-[#54af54] text-sm font-medium hover:underline"
            >
              View All Notifications
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
