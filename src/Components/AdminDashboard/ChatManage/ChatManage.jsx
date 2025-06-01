import { useEffect, useRef, useState } from "react";
import ChatManageHeader from "./ChatManageHeader";
import ChatManageUserList from "./ChatManageUserList";
import ChatManageChatBox from "./ChatManageChatBox";
import axios from "axios";
import useChatStore from "../../../Store/useChatStore";
import socket from "@/socket";
import { baseURL } from "@/Config/config";

const ChatManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allAdmins, setAllAdmins] = useState([]);
  const {
    adminChats,
    setAdminChats,
    tab,
    userListTab,
    activeChat,
    setActiveChat,
  } = useChatStore();
  const tabRef = useRef(tab);

  const getAllChats = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseURL}/chat/all-chats?category=${userListTab}&type=${tab}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const chats = response?.data?.data.sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      });

      setAdminChats(chats);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllAdmins = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/user-query/all-admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setAllAdmins(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    tabRef.current = tab;
  }, [tab]);

  const getAllChatsRef = useRef(getAllChats);
  const activeChatRef = useRef(activeChat);
  const adminChatsRef = useRef(adminChats);

  useEffect(() => {
    activeChatRef.current = activeChat;
  }, [activeChat]);

  useEffect(() => {
    adminChatsRef.current = adminChats;
  }, [adminChats]);

  const sortAndUpdateChats = (chatMsg, type) => {
    const isDuplicate = adminChatsRef.current.some(
      (chat) => chat._id === chatMsg._id
    );

    const updatedChats = isDuplicate
      ? adminChatsRef.current.map((chat) =>
          chat._id === chatMsg._id
            ? {
                ...chat,
                ...chatMsg,
                ...(type === "read_message" ||
                chatMsg?.message?.sender?.role === "admin"
                  ? { adminUnreadCount: 0 }
                  : { adminUnreadCount: (chat?.adminUnreadCount || 0) + 1 }),
                // ...(type === "read_message" && { message: chat?.message }),
              }
            : chat
        )
      : [chatMsg, ...adminChatsRef.current];

    const newChats = updatedChats.sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA;
    });

    setAdminChats(newChats);
  };

  useEffect(() => {
    getAllAdmins();

    const newChatroom = (chatroom) => {
      if (tabRef.current === "user" && chatroom?.user?._id) {
        sortAndUpdateChats(chatroom);
      } else if (tabRef.current === "visitors" && chatroom?.user === null) {
        sortAndUpdateChats(chatroom);
      } else if (tabRef.current === "all") {
        sortAndUpdateChats(chatroom);
      }
    };

    const adminMessageSortList = (chatMessage) => {
      if (tabRef.current === "user" && chatMessage?.user?._id) {
        sortAndUpdateChats(chatMessage);
      } else if (tabRef.current === "visitors" && chatMessage?.user === null) {
        sortAndUpdateChats(chatMessage);
      } else if (tabRef.current === "all") {
        sortAndUpdateChats(chatMessage);
      }
    };

    const readMessage = (chatMessage) => {
      if (tabRef.current === "user" && chatMessage?.user?._id) {
        sortAndUpdateChats(chatMessage, "read_message");
      } else if (tabRef.current === "visitors" && chatMessage?.user === null) {
        sortAndUpdateChats(chatMessage, "read_message");
      } else if (tabRef.current === "all") {
        sortAndUpdateChats(chatMessage, "read_message");
      }
    };

    const deleteChat = (chatroom) => {
      getAllChatsRef.current();
      if (activeChatRef && activeChatRef?._id === chatroom?._id) {
        setActiveChat(null);
      }
    };

    const assignChat = (updatedChatRoom) => {
      const chat = adminChatsRef.current.find(
        (chat) => chat._id === updatedChatRoom._id
      );
      if (chat) {
        chat.admin = updatedChatRoom.admin;
      }
    };

    socket.on("new_chatroom", newChatroom);
    socket.on("admin_message_sort_list", adminMessageSortList);
    socket.on("read_message", readMessage);
    socket.on("deleteChat", deleteChat);
    socket.on("assignChat", assignChat);

    return () => {
      socket.off("new_chatroom", newChatroom);
      socket.off("admin_message_sort_list", adminMessageSortList);
      socket.off("deleteChat", deleteChat);
      socket.off("read_message", readMessage);
      socket.off("assignChat", assignChat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userListTab, tab]);

  return (
    <div className=" min-h-screen">
      <ChatManageHeader />

      <div className="grid md:grid-cols-2 2xl:grid-cols-5 gap-4">
        <ChatManageUserList getAllChats={getAllChats} isLoading={isLoading} />
        <ChatManageChatBox allAdmins={allAdmins} getAllChats={getAllChats} />
      </div>
    </div>
  );
};

export default ChatManage;
