import { FC, ReactNode, createContext, useEffect, useState } from "react";
import authApi from "./api";
import { useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "./type";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { data: verifyToken, refetch: verifyTokenRefetch, isError, error } = useQuery({
    queryKey: ["verifyToken"],
    queryFn: async () => {
      const response = await authApi.verifyToken();
      return response;
    },
    enabled: false,
  });

  useEffect(() => {
    if (verifyToken) {
      setIsAuthenticated(true);
    }
  }, [verifyToken]);

  useEffect(() => {
    if (isError) {
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
