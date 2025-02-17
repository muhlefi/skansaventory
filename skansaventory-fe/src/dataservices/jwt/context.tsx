import { FC, ReactNode, createContext, useEffect, useState } from "react";
import authApi from "./api";
import { useQuery } from "@tanstack/react-query";

interface AuthContextProps {
  isAuthenticated: boolean;
  verifyToken: any;
  verifyTokenRefetch: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { data: verifyToken, refetch: verifyTokenRefetch, isError, error } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: async () => {
      const response = await authApi.verifyToken();
      console.log("✅ Response dari verifyToken:", response);
      return response;
    },
    enabled: false,
  });

  useEffect(() => {
    if (verifyToken) {
      console.log("✅ Data verifikasi token berhasil:", verifyToken);
      setIsAuthenticated(true);
    }
  }, [verifyToken]);

  useEffect(() => {
    if (isError) {
      console.error("❌ Error verifikasi token:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  }, [isError, error]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, verifyToken, verifyTokenRefetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
