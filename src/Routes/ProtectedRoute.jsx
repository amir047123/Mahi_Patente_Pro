import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "@/Context/AuthContext";
import { LoaderCircle } from "lucide-react";

const ProtectedRoute = ({ roles }) => {
  const { user, loading, fetchAuthenticatedUser } = useAuthContext();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsChecking(false);
        return;
      }

      if (!user) {
        await fetchAuthenticatedUser();
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [user, fetchAuthenticatedUser]);

  if (loading || isChecking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderCircle size={60} className="animate-spin text-green-600" />
      </div>
    );
    // return <LinearLoader />;
  }

  if (!user || (roles && !roles.includes(user?.profile?.role))) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
