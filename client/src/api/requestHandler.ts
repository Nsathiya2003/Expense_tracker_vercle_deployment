// // src/api/requestHandler.ts
// import { AxiosError, type AxiosResponse } from "axios";

// interface ApiError {
//   status?: number;
//   message: string;
//   data?: unknown;
// }

// export const handleRequest = async <T>(
//   promise: Promise<AxiosResponse<T>>
// ): Promise<T> => {
//   try {
//     const res = await promise;
//     return res.data;
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       const status = error.response?.status;
//       const message =
//         (error.response?.data as { message?: string })?.message ||
//         error.message ||
//         "Something went wrong";

//       throw {
//         status,
//         message,
//         data: error.response?.data,
//       } as ApiError;
//     }
//     throw {
//       message: "Unexpected error occurred",
//     } as ApiError;
//   }
// };

// src/api/requestHandler.ts
import { AxiosError, type AxiosResponse } from "axios";

export interface ApiError {
  status?: number;
  message: string;
  data?: unknown;
}

export const handleRequest = async <T>(
  promise: Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const res = await promise;
    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      const message =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Something went wrong";

      // ✅ Throw custom ApiError
      throw {
        status,
        message,
        data: error.response?.data,
      } as ApiError;
    }

    throw {
      message: "Unexpected error occurred",
    } as ApiError;
  }
};
