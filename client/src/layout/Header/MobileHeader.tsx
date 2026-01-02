import { MdMenu } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { IoNotifications } from "react-icons/io5";
import NotificationDialog from "../../pages/notification/notification-dialog";
import { useUnreadNotification } from "../../pages/notification/unread-notication";

export function MobileHeader() {
  const { setOpen, previewUrl } = useAppContext();
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [notifyDialog, setNotifyDialog] = useState(false); // <-- added state

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
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

  /* Logout handler */
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("authToken");

    setLogoutConfirm(false);
    navigate("/", { replace: true });
  };
  const { data: notificationData } = useUnreadNotification();

  const hasUnread = (notificationData?.pagination?.totalPages || 0) > 0;

  return (
    <>
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[#548f54] border-b border-gray-600">
        <div className="flex items-center px-4 h-14 gap-3 relative">
          {/* Menu */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-xl active:scale-95 transition"
          >
            <MdMenu className="text-2xl text-gray-800" />
          </button>

          {/* Title */}
          <h1 className="text-base font-bold text-gray-100 flex-1">
            Expense Tracker
          </h1>

          {/* Notifications */}
          <button
            onClick={() => setNotifyDialog(true)} // <-- open dialog on click
            className="p-2 rounded-xl active:scale-95 transition relative"
          >
            <IoNotifications className="text-xl text-white" />
            {hasUnread && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            )}{" "}
          </button>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="active:scale-95 transition"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <FaRegUserCircle className="w-9 h-9 text-white" />
              )}
            </button>

            {/* Dropdown */}
            {openProfile && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#1f1f2e] border border-gray-700 shadow-xl overflow-hidden">
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
      </header>

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
