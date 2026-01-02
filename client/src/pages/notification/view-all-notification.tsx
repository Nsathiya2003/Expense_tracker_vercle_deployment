import { useState, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import {
  useNotificationFilter,
  useMarkNotificationAsRead,
  useDeleteNotifications,
} from "../../api/notification/notification-hooks";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import type { NotificationItem } from "../../types/response-types";

type TabType = "all" | "unread" | "read";
export const ViewAllNotification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<string[]>([]);

  console.log("open and pending---", openDeletePopup, pendingDeleteIds);

  const itemsPerPage = 6;

  /* ---------------- FILTER PAYLOAD ---------------- */
  const filterPayload = useMemo(() => {
    if (activeTab === "read") {
      return { page: currentPage, limit: itemsPerPage, read: true };
    }
    if (activeTab === "unread") {
      return { page: currentPage, limit: itemsPerPage, read: false };
    }
    return { page: currentPage, limit: itemsPerPage };
  }, [activeTab, currentPage]);

  /* ---------------- API ---------------- */
  const { data, isLoading, refetch } = useNotificationFilter(filterPayload);

  const notifications = data?.data || [];
  const pagination = data?.pagination;

  const totalPages = pagination?.totalPages || 1;
  const hasPrevPage = pagination?.hasPrevPage ?? currentPage > 1;
  const hasNextPage = pagination?.hasNextPage ?? currentPage < totalPages;

  const markAsReadMutation = useMarkNotificationAsRead();
  const deleteNotificationsMutation = useDeleteNotifications();

  /* ---------------- HANDLERS ---------------- */

  const handleExpand = async (item: NotificationItem) => {
    const isOpening = expandedId !== item._id;
    setExpandedId(isOpening ? item._id : null);

    if (isOpening && !item.read) {
      markAsReadMutation.mutate([item._id], {
        onSuccess: () => refetch(),
      });
    }
  };

  const handleMarkAsRead = (ids: string[]) => {
    if (!ids.length) return;

    markAsReadMutation.mutate(ids, {
      onSuccess: () => {
        setSelectedIds([]);
        refetch();
      },
    });
  };

  const handleBulkDelete = (ids: string[]) => {
    console.log("ids----", ids);
    if (!ids.length) return;
    setPendingDeleteIds(ids);
    setOpenDeletePopup(true);
  };

  const handleSingleDelete = (id: string) => {
    deleteNotificationsMutation.mutate([id], {
      onSuccess: () => refetch(),
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
    setSelectedIds([]);
  };

  const confirmDelete = () => {
    if (!pendingDeleteIds.length) return;

    deleteNotificationsMutation.mutate(pendingDeleteIds, {
      onSuccess: () => {
        setOpenDeletePopup(false);
        setPendingDeleteIds([]);
        setSelectedIds([]);
        refetch();
      },
    });
  };

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return <p className="p-10 text-gray-400">Loading notifications...</p>;
  }

  return (
    <div className="flex flex-col w-full h-full px-4 sm:px-10 py-6 bg-[#1b1b2f] text-white">
      <h1 className="text-2xl font-semibold text-[#54af54] mb-4 sm:mb-6">
        Notifications
      </h1>

      {/* ---------------- TABS ---------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div className="flex gap-4 overflow-x-auto">
          {(["all", "unread", "read"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
                setExpandedId(null);
                setSelectedIds([]);
              }}
              className={`capitalize pb-2 text-sm flex-shrink-0 ${
                activeTab === tab
                  ? "border-b-2 border-[#54af54] text-[#54af54]"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ---------------- BULK ACTIONS ---------------- */}
        <div className="flex flex-col sm:flex-row gap-2 text-sm w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={() =>
              setSelectedIds(
                selectedIds.length === notifications.length
                  ? []
                  : notifications.map((n: NotificationItem) => n._id)
              )
            }
            className="px-3 py-2 rounded bg-[#2e2e4a] hover:bg-[#3a3a5c] w-full sm:w-auto"
          >
            {selectedIds.length === notifications.length
              ? "Unselect All"
              : "Select All"}
          </button>

          <button
            onClick={() => handleMarkAsRead(selectedIds)}
            disabled={!selectedIds.length}
            className={`px-3 py-2 rounded w-full sm:w-auto ${
              selectedIds.length
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Mark as Read
          </button>

          <button
            onClick={() => handleBulkDelete(selectedIds)}
            disabled={!selectedIds.length}
            className={`px-3 py-2 rounded w-full sm:w-auto ${
              selectedIds.length
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* ---------------- LIST ---------------- */}
      <div className="flex flex-col divide-y divide-gray-700 flex-1">
        {notifications.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-gray-400 italic">
              No Notifications found
            </p>
          </div>
        ) : (
          notifications.map((item: NotificationItem) => {
            const isExpanded = expandedId === item._id;
            const isSelected = selectedIds.includes(item._id);

            return (
              <div
                key={item._id}
                onClick={() => handleExpand(item)}
                className={`group flex flex-col sm:flex-row gap-3 px-3 py-3 cursor-pointer
            ${!item.read ? "bg-[#26265a]" : "bg-[#1f1f3a]"}
            hover:bg-[#2f2f6b]
            ${isSelected ? "ring-1 ring-[#54af54]" : ""}`}
              >
                <div className="flex items-start sm:items-center gap-2">
                  {!item.read && (
                    <div className="w-1 rounded-full bg-[#54af54] mt-1 sm:mt-0" />
                  )}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSelectedIds((prev) =>
                        e.target.checked
                          ? [...prev, item._id]
                          : prev.filter((id) => id !== item._id)
                      );
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start sm:items-center">
                    <p className="truncate font-medium">{item.title}</p>
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 truncate">
                    {item.message}
                  </p>

                  {isExpanded && (
                    <div className="mt-2 sm:mt-1 pl-4 border-l-2 border-[#54af54] text-sm">
                      {item.fullMessage}
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSingleDelete(item._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 mt-1 sm:mt-0"
                >
                  <MdDelete />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-8 overflow-x-auto px-2">
          <button
            onClick={() => hasPrevPage && handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            className={`p-2 rounded-lg ${
              hasPrevPage
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-800 opacity-40 cursor-not-allowed"
            }`}
          >
            <IoIosArrowBack />
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[36px] h-10 rounded-lg text-sm ${
                    currentPage === page
                      ? "bg-[#548f54] text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className={`p-2 rounded-lg ${
              hasNextPage
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-800 opacity-40 cursor-not-allowed"
            }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
      {/* ---------------- DELETE CONFIRMATION MODAL ---------------- */}
      {openDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#1f1f3a] rounded-xl w-[90%] max-w-md p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-2">
              Delete Notification{pendingDeleteIds.length > 1 ? "s" : ""}
            </h2>

            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">
                {pendingDeleteIds.length}
              </span>{" "}
              notification{pendingDeleteIds.length > 1 ? "s" : ""}? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setOpenDeletePopup(false);
                  setPendingDeleteIds([]);
                }}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
