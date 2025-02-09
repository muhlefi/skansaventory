import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const BASE_URL = "http://localhost:3000/api/";

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const response = await axios.post<LoginResponse>(`${BASE_URL}auth/login`, { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        queryClient.setQueryData("user", response.data);
      }

      return response.data;
    }
  );
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      localStorage.removeItem("token");
      queryClient.setQueryData("user", null);
    }
  );
};

