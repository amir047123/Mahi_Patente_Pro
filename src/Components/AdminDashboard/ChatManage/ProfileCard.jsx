import { Button, PopoverContent } from "@nextui-org/react";
import demoImg from "@/assets/Navbar/logo.svg";
import Typography from "@/Components/Typography";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNotificationsContext } from "../../../Context/NotificationsContext";
import { useEffect, useState } from "react";

const ProfileCard = ({ chat }) => {
  const { visitors, onlineUsers } = useNotificationsContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const isUserActive =
      onlineUsers?.length > 0 &&
      onlineUsers?.some((user) => user?._id === chat?.user?._id);
    const isVisitorActive =
      visitors?.length > 0 &&
      visitors?.some((visitor) => visitor === chat?.fingerprint);
    setIsActive(isUserActive || isVisitorActive || false);
  }, [visitors, onlineUsers, chat]);

  return (
    <PopoverContent className="max-w-sm p-7 bg-white shadow">
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={chat?.user?.profilePicture || demoImg}
            alt="User avatar"
            className="rounded-full w-[70px] border"
          />
          {isActive && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <Typography.Heading5 variant="semibold" className="!text-[18px]">
            {chat?.user ? `${chat?.user?.profile?.name}` : "Anonymous"}
          </Typography.Heading5>
          <Typography.Base
            variant="normal"
            className="!text-[14px] text-[#64748B] my-1.5"
          >
            {chat?.user?.profile?.username || "N/A"}
          </Typography.Base>
          <span
            className={`${
              chat?.user?.profile?.role === "user"
                ? "bg-blue-500"
                : "bg-red-500"
            } px-3 text-[12px] py-0.5 rounded-full text-white capitalize font-semibold`}
          >
            {chat?.user?.profile?.role || "Visitor"}
          </span>
        </div>
      </div>
      {chat?.user && (
        <div className="text-[12px] w-full mt-5 space-y-1">
          <div className="flex justify-between w-full">
            <p className=" text-[#64748B]">Email:</p>
            <p className="font-medium">{chat?.user?.email || "Visitor"}</p>
          </div>
          <div className="flex justify-between w-full">
            <p className=" text-[#64748B]">Phone:</p>
            <p className="font-medium">
              {chat?.user?.phoneNumber || "Visitor"}
            </p>
          </div>
          <div className="flex justify-between w-full">
            <p className=" text-[#64748B]">Status: </p>
            <p
              className={`font-medium ${
                chat?.user?.status === "Active"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {chat?.user?.status}
            </p>
          </div>
          <div className="flex justify-between w-full">
            <p className=" text-[#64748B]">Added By: </p>
            <p className="font-medium text-primary">
              {chat?.user?.referralId?.profile?.username} (
              {chat?.user?.referralId?.profile?.role})
            </p>
          </div>
          {/* <div className="flex justify-between w-full">
          <p className=" text-[#64748B]">Location: </p>
          <p className="font-medium">Palma Campania, IT</p>
        </div> */}
        </div>
      )}

      <Button
        as={Link}
        isDisabled={!chat?.user}
        variant="bordered"
        color="primary"
        className="border-1 border-slate-300 flex gap-2 items-center mt-10"
        to={
          chat?.user
            ? `/admin-dashboard/management/users/settings/${chat?.user?._id}`
            : window.location.href
        }
      >
        <BiLinkExternal className="text-lg" />
        Go to Main Profile
      </Button>
    </PopoverContent>
  );
};

export default ProfileCard;
