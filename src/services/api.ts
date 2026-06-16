import axios from "axios";
import { storage } from "./storage";
import apiClient from "./apiClient";

const refreshAccessToken = async () => {
  const refresh = storage.getRefreshToken();

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`,
    {
      refresh,
    },
  );

  const newAccess = response.data.access;

  localStorage.setItem("access_token", newAccess);

  return newAccess;
};

// generic method calls

export const getCall = async <TResponse>(url: string) => {
  try {
    const response = await apiClient.get<TResponse>(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error?.response?.data;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occured");
  }
};

// post call
export const postCall = async <TResponse, TBody>(url: string, data: TBody) => {
  try {
    const response = await apiClient.post<TResponse>(url, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error?.response?.data;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occured");
  }
};

// put call

export const putCall = async <Tresponse, TBody>(url: string, data: TBody) => {
  try {
    const response = await apiClient.put<Tresponse>(url, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error?.response?.data;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occured");
  }
};

// patch call

export const patchCall = async <Tresponse, TBody>(url: string, data: TBody) => {
  try {
    const response = await apiClient.patch<Tresponse>(url, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error?.response?.data;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occured");
  }
};

// delete call
export const deleteCall = async <TResponse>(url: string) => {
  try {
    const response = await apiClient.delete<TResponse>(url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error?.response?.data;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occured");
  }
};
