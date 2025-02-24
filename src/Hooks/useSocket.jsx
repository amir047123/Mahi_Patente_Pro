import { useEffect, useState } from "react";
import socket from "@/socket";
import { useAuthContext } from "@/Context/AuthContext";

const useSocket = () => {
  const { user } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState();

  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");

      if (user && user._id) {
        socket.emit("userLogin", {
          userId: user?._id,
          role: user?.profile?.role,
        });
      }
    });

    socket.on("updateOnlineUsers", (onlineUserData) => {
      if (user && user?.profile?.role === "admin") {
        setOnlineUsers(onlineUserData);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.disconnect();
    };
  }, [user, setOnlineUsers]);

  // user?.profile?.role === "admin" && console.log(onlineUsers);

  return { socket, onlineUsers };
};

export default useSocket;
