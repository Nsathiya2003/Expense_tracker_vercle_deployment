import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreateUserPayload,
  ForgotUserPayload,
  LoginUserPayload,
  ResetPasswordPayload,
} from "./userApi";
import { toast } from "react-toastify";
import { UserApi } from "./userApi";
import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../../context/AppContext";

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: CreateUserPayload) => UserApi.createUser(body),

    onSuccess: (data) => {
      toast.success(`${data?.message}` || "Account registered successfully");
      //after some seconds navigate
      setTimeout(() => {
        navigate("/");
      }, 4000);
    },

    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  // const { setErrorMsg } = useAppContext();
  return useMutation({
    mutationFn: (body: LoginUserPayload) => UserApi.loginUser(body),

    onSuccess: (data) => {
      toast.success(`${data.message}` || "Your account logged successfully");

      //set auth token...
      localStorage.setItem("authToken", data?.data?.access_token);
      localStorage.setItem("user_id", data?.data?.data?._id);
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    },

    onError: (error) => {
      JSON.stringify(error);
      // setErrorMsg(JSON.stringify(error));
      toast.error(`${error.message}` || "something went wrong");
    },
  });
};

export const useSendForgotEmail = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: ForgotUserPayload) => UserApi.forgotPassword(body),

    onSuccess: (data) => {
      toast.success(`${data.message}` || "Otp send your emailId");
      setTimeout(() => {
        navigate("/reset-password");
      }, 4000);
    },

    onError: (error) => {
      toast.error(`${error.message}` || "something went wrong");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: ResetPasswordPayload) => UserApi.resetPassword(body),

    onSuccess: (data) => {
      toast.success(`${data.message}` || "password reset successfully");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    },

    onError: (error) => {
      toast.error(`${error.message}` || "something went wrong");
    },
  });
};

export const useUpdateUser = (userId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: FormData) => UserApi.updateUser(body, userId),

    onSuccess: (data) => {
      toast.success(`${data?.message}` || "User update successfully");
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }, 500);
    },

    onError: (error) => {
      toast.error(`${error?.message}` || "something went wrong");
    },
  });
};

export const useGetUser = (userId: string | null) => {
  return useQuery({
    queryKey: ["user"],

    queryFn: () => UserApi.getUser(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};
