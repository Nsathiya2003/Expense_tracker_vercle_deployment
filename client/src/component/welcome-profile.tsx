import React, { useState } from "react";
import { useGetUser } from "../api/users/user-hooks";
import profile from "../assets/images.jpg";

export default function WelcomeProfileComponent() {
  const userId = localStorage.getItem("user_id");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [data, setData] = useState({
    username: "",
  });

  const { data: userData } = useGetUser(userId);
  console.log("userData---", userData);

  React.useEffect(() => {
    if (userData?.data) {
      console.log("userdata is---", userData?.data);
      setData({
        username: userData.data.username || "",
      });
    if (userData.data.file_path) {
        setPreviewUrl(userData.data.file_path); // Cloudinary URL
      }
    }
  }, [userData]);
  return (
    <>
      <div className="flex items-center gap-3 sm:gap-4 px-4 lg:px-6 sm:px-0">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="profile"
            className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#00C8DC]"
          />
        ) : (
          <img
            src={profile}
            alt="profile"
            className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover"
          />
        )}

        <div>
          <h1 className="text-lg sm:text-2xl font-semibold text-white">
            Welcome Back,{" "}
            <span className="text-[#00C8DC]">
              {data?.username.charAt(0).toUpperCase() +
                data?.username.slice(1) || "User"}
            </span>
          </h1>
          <p className="text-md sm:text-sm text-gray-400 mt-1 italic">
            Know your spend. Own your life.
          </p>
        </div>
      </div>
    </>
  );
}
