import { RiMore2Fill } from "react-icons/ri";
import demoImg from "@/assets/Navbar/logo.svg";
import Typography from "@/Components/Typography";
import {
  Dropdown,
  DropdownTrigger,
  Popover,
  PopoverTrigger,
} from "@nextui-org/react";
import ChatAction from "./ChatAction";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";
import { useNotificationsContext } from "../../../Context/NotificationsContext";

const ChatUserOverview = ({ chat, active, getAllChats }) => {
  const { visitors, onlineUsers } = useNotificationsContext();
  const [isActive, setIsActive] = useState(false);
  const [isOld, setIsOld] = useState(false);

  useEffect(() => {
    const isUserActive =
      onlineUsers?.length > 0 &&
      onlineUsers?.some((user) => user?._id === chat?.user?._id);
    const isVisitorActive =
      visitors?.length > 0 &&
      visitors?.some((visitor) => visitor === chat?.fingerprint);
    setIsActive(isUserActive || isVisitorActive || false);

    const messageDate = new Date(chat?.updatedAt).toDateString();
    const currentDate = new Date().toDateString();

    const isOldMessage = messageDate !== currentDate;

    setIsOld(isOldMessage);
  }, [visitors, onlineUsers, chat]);

  return (
    <div
      className={`cursor-pointer rounded-lg hover:bg-gradient-to-r from-[#4B2BB2] to-[#B262B2] group hover:shadow-sm w-full pl-2 ${
        active && " bg-gradient-to-r from-[#4B2BB2] to-[#B262B2] shadow-sm my-5"
      }`}
    >
      <div className="pr-4 pt-4 pb-4 hover:pl-4 duration-300 flex items-center gap-3 w-full">
        <Popover backdrop="opaque" showArrow offset={10} placement="bottom">
          <PopoverTrigger>
            <span className="relative" tabIndex={0}>
              <img
                src={chat?.user?.profilePicture || demoImg}
                alt="User avatar"
                className={`rounded-full w-14 min-w-14 border bg-white ${
                  chat?.adminUnreadCount > 0 && "border-4 border-red-500"
                }`}
              />
              {isActive && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </span>
          </PopoverTrigger>
          <ProfileCard chat={chat} />
        </Popover>

        <div className="w-[85%] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Typography.Base
                variant="semibold"
                className="font-medium text-gray-900 group-hover:text-white"
              >
                {chat?.user?.profile?.name || "Anonymous"}
              </Typography.Base>
              <span
                className={`${
                  chat?.user?.profile?.role === "user"
                    ? "bg-[#2D68F8]"
                    : chat?.user?.profile?.role === "admin"
                    ? "bg-primary"
                    : "bg-[#E10E0E]"
                } px-3 text-[12px] py-0.5 rounded-full text-white !capitalize font-semibold`}
              >
                {chat?.user?.profile?.role || "Visitor"}
              </span>

              {chat?.adminUnreadCount > 0 && (
                <span
                  className={`bg-white px-2 text-[12px] py-0.5 rounded-full text-black !capitalize font-semibold`}
                >
                  {chat?.adminUnreadCount || 0}
                </span>
              )}
            </div>

            <Typography.Base
              variant={chat?.adminUnreadCount > 0 ? "semibold" : "regular"}
              className="text-sm text-gray-500 group-hover:text-gray-300"
            >
              <span className="flex items-center flex-col">
                <time className={`${isOld ? "" : "hidden"}`}>
                  {new Date(chat?.updatedAt || "").toLocaleString("en-GB", {
                    timeZone: "Europe/Rome",
                    // weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>{" "}
                <time>
                  {new Date(chat?.updatedAt || "").toLocaleString("en-GB", {
                    timeZone: "Europe/Rome",
                    // weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </time>
              </span>
            </Typography.Base>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Typography.Base
              variant={chat?.adminUnreadCount > 0 ? "semibold" : "regular"}
              className="text-gray-600 group-hover:text-gray-300 font-[300] text-sm line-clamp-1"
            >
              {/* {chat?.message?.sender?.profile?.role === "admin" ? "Admin" : "User"}{" "} */}
              {chat?.message?.eventType === "admin_join" ? (
                <>
                  <span className="font-semibold">
                    {chat?.message?.sender?.profile?.username}
                  </span>{" "}
                  Joined Chat
                </>
              ) : chat?.message?.content ? (
                chat.message?.content
              ) : chat.message?.file ? (
                "Sent an image"
              ) : (
                "No Messages Sent Yet"
              )}
            </Typography.Base>

            <Dropdown>
              <DropdownTrigger>
                <span tabIndex={0}>
                  <RiMore2Fill className="text-xl cursor-pointer group-hover:text-gray-200" />
                </span>
              </DropdownTrigger>
              <ChatAction id={chat?._id} getAllChats={getAllChats} />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUserOverview;
