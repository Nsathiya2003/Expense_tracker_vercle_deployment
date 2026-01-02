import React, { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import { useGetUser } from "../api/users/user-hooks";
import { baseImgUrl } from "../api/apiClient";

export function AppProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
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
        console.log("baseImgUrl---", baseImgUrl);
        setPreviewUrl(`${baseImgUrl}${userData?.data?.file_path}`);
      }
    }
  }, [userData]);
  return (
    <AppContext.Provider value={{ open, setOpen, data, previewUrl }}>
      {children}
    </AppContext.Provider>
  );
}
