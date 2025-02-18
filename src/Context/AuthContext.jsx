import { createContext, useContext } from "react";
import { useAuth } from "../Hooks/useAuth";

// Create context with null initial value
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Get all auth related values and functions from useAuth hook
  const auth = useAuth();

  // Provide all auth values to children components
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  // Add error handling for when context is used outside of provider
  if (context === undefined || context === null) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  
  return context;
};

// Optional: Export the raw context if needed elsewhere
export default AuthContext;