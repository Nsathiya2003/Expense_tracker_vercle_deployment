import { apiClient } from "../apiClient";
import { handleRequest } from "../requestHandler";

export interface CreateUserPayload {
  username: string;
  lastName: string;
  emailId: string;
  password: string;
  mobileNumber: string;
}

export interface LoginUserPayload {
  emailId: string;
  password: string;
}

export interface ForgotUserPayload {
  emailId: string;
}

export interface ResetPasswordPayload {
  emailId: string;
  password: string;
  otp: string;
}

export interface UpdateUserPayload {
  user_profile: File;
  username: string;
  lastName: string;
  emailId: string;
  mobileNumber: string;
  age?: number;
  gender?: string;
  address?: string;
}

export const UserApi = {
  createUser: (body: CreateUserPayload) =>
    handleRequest(apiClient.post("/api/user/create", body)),
  loginUser: (body: LoginUserPayload) =>
    handleRequest(apiClient.post("/api/user/login", body)),
  forgotPassword: (body: ForgotUserPayload) =>
    handleRequest(apiClient.post("/api/user/forgot-password", body)),
  resetPassword: (body: ResetPasswordPayload) =>
    handleRequest(apiClient.post("/api/user/reset-password", body)),
  updateUser: (body: FormData, userId: string | null) =>
    handleRequest(apiClient.put(`/api/user/update/${userId}`, body)),
  getUser: (userId: string | null) =>
    handleRequest(apiClient.get(`/api/user/get/${userId}`)),
};
