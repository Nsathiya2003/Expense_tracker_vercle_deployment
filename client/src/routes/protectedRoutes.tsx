import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");

  console.log("token---", token);

  //  Not authenticated
  if (!token) {
    return <Navigate to="/" replace />;
  }

  //  Authenticated
  return <Outlet />;
};

export default ProtectedRoute;
