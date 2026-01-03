import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

//1.Create a query client for implement tanstack-query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 100 * 60 * 5,
    },
  },
});
console.log("baseUrl is----", import.meta.env.VITE_API_BASE_URL);
//2.Interceptors for send tokens..
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

console.log("apiClient---", apiClient);

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//3.handling the global response handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized -redirect to login....");
    }
    return Promise.reject(error);
  }
);

export const baseImgUrl = "http://localhost:3000";
