import { IoNotificationsOutline } from "react-icons/io5";
import { SidebarTrigger } from "../ui/sidebar";
import demoUser from "@/assets/UserDashboard/demoUser.png";
import { ChevronDown } from "lucide-react";
import socket from "@/socket";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";
import notificationSound from "/audio/notification.mp3";
import NotificationComponent from "@/Shared/NotificationComponent";
import { useNotificationsContext } from "@/Context/NotificationsContext";
import toast from "react-hot-toast";
import useImageUploader from "@/Hooks/useImageUploader";
import { baseURL } from "@/Config";
import { useQueryClient } from "@tanstack/react-query";
import { FaCamera } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import UserChat from "./UserChat/UserChat";

const UserDashboardHeader = () => {
  const query = useQueryClient();
  const { user, backupUser, setBackupUser, logout } = useAuthContext();
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  const { fetchNotifications, unreadCount } = useNotificationsContext();
  const notiAudio = new Audio(notificationSound);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchNotifications(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  useEffect(() => {
    const handleNotifications = () => {
      notiAudio.play();
      fetchNotifications(1);
    };

    socket.on("newNotification", (notification) =>
      handleNotifications(notification),
    );
    socket.on("userNotification", (notification) =>
      handleNotifications(notification),
    );

    return () => {
      socket.off("newNotification", handleNotifications);
      socket.off("userNotification", handleNotifications);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !event.target.closest(".notification-bell")
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { uploadImage } = useImageUploader();
  const [profilePic, setProfilePic] = useState(
    backupUser?.profile?.profilePicture || demoUser,
  );
  const [isHovered, setIsHovered] = useState(false);
  const handleFileChangeDirectly = async (file) => {
    const toastId = toast.loading("Uploading profile picture...");
    try {
      const uploadedFileUrl = await uploadImage(file);
      if (uploadedFileUrl) {
        setProfilePic(uploadedFileUrl);
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseURL}/user/update`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            profile: { profilePicture: uploadedFileUrl },
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setBackupUser((prev) => {
          return {
            ...prev,
            profile: {
              ...prev?.profile,
              profilePicture: uploadedFileUrl,
            },
          };
        });

        toast.success(responseData?.message);
        query.invalidateQueries({
          queryKey: ["user/users"],
        });
      } else {
        toast.error("Failed to upload file. Please try again.");
      }
    } catch (error) {
      toast.error(
        `An error occurred while uploading: ${
          error instanceof Error ? error.message : error
        }`,
      );
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    setProfilePic(backupUser?.profile?.profilePicture || demoUser);
  }, [backupUser]);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileChangeDirectly(file);
    }
  };

  return (
    <header className=" w-full border-b bg-white">
      <div className="md:h-[71px] h-16 flex  items-center max-w-screen-max_screen mx-auto px-5">
        <SidebarTrigger className="block md:hidden" />

        <div className="flex md:justify-between gap-x-5 justify-end items-center w-full ">
          <div className="relative max-w-sm hidden md:block ">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="Search"
              placeholder="Search for..."
              className="bg-transparent w-full  rounded-full border py-1.5 pe-10 shadow-sm sm:text-sm pl-8 focus:outline-none"
            />
            <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>

          <div className="flex items-center md:gap-x-8 gap-x-6">
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setShowNotification(!showNotification)}
                className="flex relative cursor-pointer justify-center items-center flex-col xl:flex-row"
              >
                <IoNotificationsOutline className="text-2xl text-primaryText" />
                <span className="absolute text-[11px] -top-1 -right-2.5 bg-secondary/20 text-secondary rounded-full px-1.5 font-medium">
                  {unreadCount}
                </span>
              </button>

              {showNotification && (
                <div key="notification">
                  <NotificationComponent />
                </div>
              )}
            </div>

            {/* <button className="flex items-center md:gap-2.5 gap-1.5">
              <img className="w-[22px]" src={languageIcon} alt="icon" />
              EN
            </button> */}
            <UserChat />

            <div className="flex items-center sm:gap-2.5 gap-1">
              <label htmlFor="profilePicture" className="cursor-pointer">
                <div
                  className={`relative object-cover rounded-full cursor-pointer group`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <img
                    className="w-9 rounded-full border"
                    src={
                      profilePic ||
                      backupUser?.profile?.profilePicture ||
                      demoUser
                    }
                    alt="user img"
                  />

                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <FaCamera className="text-white w-4 h-4 opacity-80" />
                  </div>
                </div>
              </label>

              <input
                id={"profilePicture"}
                type="file"
                accept="image/*, application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="hidden sm:block">
                <p className="text-[12px] font-medium text-primaryText">
                  {backupUser?.profile?.name}
                </p>
                <p className="text-secondaryText text-[12px]">
                  {backupUser?.auth?.email}
                </p>
              </div>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="">
                    <ChevronDown size={24} className="text-secondaryText" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-56 text-secondaryText">
                  <DropdownMenuItem onClick={() => setIsOpen(false)}>
                    <Link to="/user-dashboard/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setIsOpen(false)}
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserDashboardHeader;
