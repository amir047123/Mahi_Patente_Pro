import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fetchuserData from "./globalUserDataFetching";
import { baseURL } from "@/Config";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [backupUser, setBackupUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { setGlobalContents } = useState();
  const [youtubeToken, setYoutubeToken] = useState(null);

  useEffect(() => {
    fetchAuthenticatedUser();
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
    const savedYoutubeToken = localStorage.getItem("youtubeToken");
    const youtubeRefreshToken = localStorage.getItem("youtubeRefreshToken");

    if (savedYoutubeToken) {
      setYoutubeToken(savedYoutubeToken);
    }

    if (!token) {
      setLoading(false);
      setUser(null);
      setBackupUser(null);
      setYoutubeToken(null);

      return null;
    }

    try {
      if (youtubeRefreshToken) refreshYoutubeAccessToken();
      const response = await fetchuserData(token);
      setUser(response.data?.data?.user);
      setBackupUser(response.data?.data?.user);
      // fetchGlobalContents();
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
      if (response.data.success) {
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
      setUser(response?.data?.data?.user);
      setBackupUser(response?.data?.data?.user);
      setYoutubeToken(null);
      toast.success("Login successful!");
      // fetchGlobalContents();
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP.");
      toast.error(err?.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseURL}/user/create`, formData, {
        withCredentials: true,
      });

      localStorage.setItem("token", response?.data?.data?.token);
      setUser(response?.data?.data?.user);
      setBackupUser(response?.data?.data?.user);
      setYoutubeToken(null);
      toast.success("Login successful!");
      // fetchGlobalContents();
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
      await axios.get(`${baseURL}/user/logout`, { withCredentials: true });
      // for user dashboard popup
      setUser(null);
      setBackupUser(null);
      toast.success("Logged out successfully.");
      localStorage.removeItem("token");
      localStorage.removeItem("popupShown");
      localStorage.removeItem("youtubeToken");
      localStorage.removeItem("youtubeRefreshToken");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setBackupUser(null);
      setYoutubeToken(null);
      setLoading(false);
      setError(null);
      setOtpSent(false);
      localStorage.removeItem("token");
    }
  };

  const ytLogin = useGoogleLogin({
    onSuccess: (response) => {
      exchangeCodeForToken(response.code);
    },
    onError: (error) => {
      toast.error("Authentication failed");
      console.error(error);
    },
    scope: "https://www.googleapis.com/auth/youtube.upload",
    flow: "auth-code",
    access_type: "offline",
    prompt: "consent",
  });

  const ytLogout = () => {
    googleLogout();
    setYoutubeToken(null);
    localStorage.removeItem("youtubeToken");
    localStorage.removeItem("youtubeRefreshToken");
  };

  const refreshYoutubeAccessToken = async () => {
    const refreshToken = localStorage.getItem("youtubeRefreshToken");
    if (!refreshToken) return;

    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
        client_secret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });

      const newAccessToken = response?.data?.access_token;
      setYoutubeToken(newAccessToken);
      localStorage.setItem("youtubeToken", response?.data?.access_token);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const res = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: import.meta.env.VITE_YOUTUBE_CLIENT_ID,
        client_secret: import.meta.env.VITE_YOUTUBE_CLIENT_SECRET,
        redirect_uri: "http://localhost:5173",
        grant_type: "authorization_code",
      });

      setYoutubeToken(res.data.access_token);
      localStorage.setItem("youtubeToken", res.data.access_token);
      localStorage.setItem("youtubeRefreshToken", res.data.refresh_token);

      return res.data;
    } catch (error) {
      toast.error("Token exchange failed:", error.response?.data || error);
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
    createUser,
    backupUser,
    setBackupUser,
    youtubeToken,
    setYoutubeToken,
    ytLogin,
    ytLogout,
    refreshYoutubeAccessToken,
  };
};
