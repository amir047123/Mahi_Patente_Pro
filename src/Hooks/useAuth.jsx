import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fetchuserData from "./globalUserDataFetching";
import { baseURL } from "@/Config";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { setGlobalContents } = useState();

  const setUserFromToken = () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      if (Date.now() > parsedUser?.expiresAt) {
        localStorage.clear();
      } else {
        setUser(parsedUser);
      }
    }
  };

  useEffect(() => {
    setUserFromToken();

    // fetchAuthenticatedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGlobalContents = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseURL}/global-search/get-all-content`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setGlobalContents(response?.data?.data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch search history"
      );
    }
  };

  const fetchAuthenticatedUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setUser(null);
      return null;
    }

    try {
      const response = await fetchuserData(token);
      setUser(response.data?.data?.user);
      fetchGlobalContents();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Error fetching authenticated user"
      );
      // toast.error("Error fetching authenticated user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseURL}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.email) {
        setOtpSent(true);
        toast.success("OTP sent to your email.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Please check your credentials or account status.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    if (!otp || otp.length !== 6) {
      toast.error("Please provide a 6-digit OTP from your email.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${baseURL}/user/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );

      localStorage.setItem("token", response?.data?.data?.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...response?.data?.data?.user,
          expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
        })
      );
      setUser(response?.data?.data?.user);
      toast.success("Login successful!");
      fetchGlobalContents();

      const userRole = response?.data?.data?.user?.role;
      if (userRole === "user") {
        navigate("/user-dashboard", { replace: true });
      } else if (userRole === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP.");
      toast.error(err?.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      await axios.post(
        `${baseURL}/user/refresh-token`,
        {},
        { withCredentials: true }
      );
      // localStorage.setItem("token", response.data.token);
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${baseURL}/user/logout`,
        { userId: user?._id },
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      // for user dashboard popup
      localStorage.removeItem("popupShown");
      setUser(null);
      toast.success("Logged out successfully.");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setLoading(false);
      setError(null);
      setOtpSent(false);
    }
  };

  return {
    user,
    loading,
    setError,
    error,
    otpSent,
    setOtpSent,
    login,
    verifyOtp,
    refreshToken,
    logout,
    fetchAuthenticatedUser,
  };
};
