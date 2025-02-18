export interface AuthContextProps {
    isAuthenticated: boolean;
    verifyToken: any;
    verifyTokenRefetch: () => void;
  }
  