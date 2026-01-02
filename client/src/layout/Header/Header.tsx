import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import NotificationDialog from "../../pages/notification/notification-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { useUnreadNotification } from "../../pages/notification/unread-notication";
import { useGetUser } from "../../api/users/user-hooks";
import { baseImgUrl } from "../../api/apiClient";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();
  const [notifyDialog, setNotifyDialog] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const userId = localStorage.getItem("user_id");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [data, setData] = useState({ username: "" });

  console.log("data---", data);

  const { data: userData } = useGetUser(userId);
  const { data: notificationData } = useUnreadNotification();
  const hasUnread = (notificationData?.pagination?.totalPages || 0) > 0;

  // Load user info
  useEffect(() => {
    if (userData?.data) {
      setData({ username: userData.data.username || "" });
      if (userData.data.file_path) {
        setPreviewUrl(`${baseImgUrl}${userData.data.file_path}`);
      }
    }
  }, [userData]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("authToken");
    setLogoutConfirm(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="w-full bg-[#2e362e] h-12 px-4 rounded-md flex items-center justify-end gap-2 text-white">
        {/* Notifications */}
        <div
          className="relative cursor-pointer"
          onClick={() => setNotifyDialog(true)}
        >
          <IoNotifications className="w-6 h-6 hover:text-green-400 transition" />
          {hasUnread && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
          )}
        </div>

        {/* Profile */}
        <div className="relative z-50" ref={dropdownRef}>
          <button
            onClick={() => setOpenProfile((prev) => !prev)}
            className="active:scale-95 transition"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-gray-300 mt-1"
              />
            ) : (
              <FaRegUserCircle className="w-6 h-6 text-white mt-1" />
            )}
          </button>

          {/* Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#1f1f2e] border border-gray-700 shadow-xl z-50">
              <button
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/profile-setting");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#26263a]"
              >
                <FiUser className="text-blue-400" />
                My Account
              </button>
              <button
                onClick={() => {
                  setOpenProfile(false);
                  setLogoutConfirm(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-[#26263a]"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notification Dialog */}
      <NotificationDialog
        open={notifyDialog}
        onClose={() => setNotifyDialog(false)}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog.Root open={logoutConfirm} onOpenChange={setLogoutConfirm}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2E2E48] text-white rounded-xl shadow-xl p-6 w-[320px] border border-gray-700">
            <Dialog.Title className="text-lg font-semibold text-center mb-4">
              Confirm Logout
            </Dialog.Title>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
