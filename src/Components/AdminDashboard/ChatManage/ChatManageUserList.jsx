import UserListTab from "./UserListTab";
import ChatUserOverview from "./ChatUserOverview";
import Typography from "@/Components/Typography";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import useChatStore from "../../../Store/useChatStore";

const ChatManageUserList = ({ getAllChats, isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [selectedUser, setSelectedUser] = useState();
  const { user } = useAuthContext();
  const { activeChat, setActiveChat, adminChats, setFullActiveChat } =
    useChatStore();

  useEffect(() => {
    if (selectedUser) {
      const chat = adminChats.find(
        (chat) => chat?.user?._id === selectedUser?.value
      );

      if (chat) {
        setActiveChat(chat);
        setSelectedUser(null);
      } else {
        const newChat = {
          user: {
            _id: selectedUser?.fullData?._id,
            firstName: selectedUser?.fullData?.firstName,
            surname: selectedUser?.fullData?.surname,
            phoneNumber: selectedUser?.fullData?.phoneNumber,
            username: selectedUser?.fullData?.username,
            email: selectedUser?.fullData?.email,
            status: selectedUser?.fullData?.status,
            role: selectedUser?.fullData?.role,
            profilePicture: selectedUser?.fullData?.profilePicture,
            referralId: {
              _id: selectedUser?.fullData?.referralId?._id,
              username: selectedUser?.fullData?.referralId?.username,
              role: selectedUser?.fullData?.referralId?.role || "admin",
            },
          },
          admin: {
            _id: user?._id,
            username: user?.username,
            role: user?.role,
            profilePicture: user?.profilePicture,
          },
          status: "Active",
        };

        setActiveChat(newChat);
        setFullActiveChat(newChat);
        setSelectedUser(null);
      }
    }
  }, [selectedUser, user, setActiveChat, adminChats, setFullActiveChat]);

  useEffect(() => {
    if (id && adminChats && adminChats.length > 0) {
      const chat = adminChats.find((chat) => chat._id === id);
      setActiveChat(chat);

      searchParams.delete("id");
      setSearchParams(searchParams, { replace: true });
    }
  }, [id, adminChats, setActiveChat, searchParams, setSearchParams]);

  return (
    <div className="2xl:col-span-2  pt-4 bg-gray-50 px-5 mt-5 rounded-lg ">

      <UserListTab />

      <div className="max-h-[64vh] overflow-y-scroll scrollbar-hide scroll-smooth">
        {isLoading ? (
          <div className="mt-20 text-center">
            <CircularProgress size={50} />
          </div>
        ) : adminChats && adminChats?.length > 0 ? (
          adminChats?.map((chat, index) => (
            <Button
              fullWidth
              className={`bg-transparent h-fit block px-0 my-2 ${
                activeChat?._id === chat?._id
                  ? "bg-gray-200"
                  : "hover:bg-gray-200"
              }`}
              key={index}
              onPress={() => setActiveChat(chat)}
            >
              <ChatUserOverview chat={chat} getAllChats={getAllChats} />
            </Button>
          ))
        ) : (
          <Typography.Base className="text-center mt-5">
            No Chats
          </Typography.Base>
        )}
      </div>
    </div>
  );
};

export default ChatManageUserList;
