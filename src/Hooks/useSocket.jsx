import { useEffect } from "react";
import socket from "@/socket";
import { useAuthContext } from "@/Context/AuthContext";
import { useNotificationsContext } from "@/Context/NotificationsContext";

const useSocket = () => {
  const { user, fingerprint } = useAuthContext();
  const { setOnlineUsers, setVisitors } = useNotificationsContext();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      if (!user && fingerprint) {
        socket.emit("visitor", { fingerprint });
      }

      if (user && user?._id) {
        socket.emit("userLogin", {
          userId: user?._id,
          role: user?.profile?.role,
        });
      }
    });

    socket.on("updateOnlineUsers", (onlineUsers, onlineVisitors) => {
      // if (user && user.role === "admin") {
      setOnlineUsers(onlineUsers);
      setVisitors(onlineVisitors);
      // }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, [user, setOnlineUsers, fingerprint, setVisitors]);

  return { socket };
};

export default useSocket;
