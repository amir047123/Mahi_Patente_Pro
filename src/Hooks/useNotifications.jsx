import { baseURL } from "@/Config";
import { useState, useRef, useEffect } from "react";

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef(null);
  const token = localStorage.getItem("token");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseURL}/notification/get-notifications?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const { data } = result;

      setUnreadCount(data?.unreadCount);

      setNotifications((prev) => {
        const existingIds = new Set(
          prev.map((notification) => notification._id),
        );
        const newNotifications = data.notifications.filter(
          (notification) => !existingIds.has(notification._id),
        );

        return [...prev, ...newNotifications].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      });

      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);

      if (data.currentPage === data.totalPages) {
        setError("No more notifications");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const lastNotificationRef = (node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && currentPage < totalPages) {
        fetchNotifications(currentPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    fetchNotifications(1);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );

    if (unreadCount === 0) return;

    try {
      const response = await fetch(`${baseURL}/notification/mark-as-read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        setUnreadCount(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    notifications,
    loading,
    error,
    lastNotificationRef,
    markAllAsRead,
    onlineUsers,
    setOnlineUsers,
    visitors,
    setVisitors,
    fetchNotifications,
    unreadCount,
  };
};
