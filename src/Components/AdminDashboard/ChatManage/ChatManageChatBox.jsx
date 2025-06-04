import { IoMdArrowDropdown } from "react-icons/io";
import demoImg from "@/assets/Navbar/logo.svg";
import { RiMore2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Send } from "lucide-react";
import ReceiverChat from "./ReceiverChat";
import SenderChat from "./SenderChat";
import AssignConversation from "./AssignConversation";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  Popover,
  PopoverTrigger,
} from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import ChatAction from "./ChatAction";
import { baseURL } from "@/Config/config";
import socket from "@/socket";
import { useAuthContext } from "../../../Context/AuthContext";
import { FaPaperclip } from "react-icons/fa";
import useImageUploader from "../../../Hooks/useImageUploader";
import toast from "react-hot-toast";
import { useNotificationsContext } from "../../../Context/NotificationsContext";
import { CircularProgress } from "@mui/material";
import CustomIcon from "@/Ui/CustomIcon";
import useChatStore from "../../../Store/useChatStore";
import Typography from "@/Components/Typography";

const ChatManageChatBox = ({ allAdmins, getAllChats }) => {
  const {
    adminChats,
    activeChat,
    setActiveChat,
    fullActiveChat,
    setFullActiveChat,
  } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { uploadImage, uploading } = useImageUploader();
  const [fileUrl, setFileUrl] = useState(null);
  const token = localStorage.getItem("token");
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);
  const { user } = useAuthContext();
  const { visitors, onlineUsers } = useNotificationsContext();
  const [isActive, setIsActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [scrollToBottomMessage, setScrollToBottomMessage] = useState(false);
  const [previousHeight, setPreviousHeight] = useState(0);
  const [disableJoin, setDisableJoin] = useState(false);
  const chatBoxRef = useRef(null);
  const setFullActiveChatRef = useRef(setFullActiveChat);

  useEffect(() => {
    if (!activeChat) return;

    const chatBox = chatBoxRef.current;
    const textArea = textareaRef.current;

    const readMessages = () => {
      const chat = adminChats?.find((chat) => chat?._id === activeChat?._id);
      if (chat && chat?.adminUnreadCount > 0 && chat?.admin === user?._id) {
        socket.emit("read_message", {
          chatroomId: chat?._id,
          role: user?.profile?.role || "visitor",
        });
      }
    };

    if (chatBox && fullActiveChat) {
      chatBox.addEventListener("focus", readMessages);
    }

    if (textArea && fullActiveChat) {
      textArea.addEventListener("focus", readMessages);
    }

    return () => {
      if (chatBox) {
        chatBox.removeEventListener("focus", readMessages);
      }
      if (textArea) {
        textArea.removeEventListener("focus", readMessages);
      }
    };
  }, [fullActiveChat, adminChats, activeChat, user]);

  useEffect(() => {
    const isUserActive =
      onlineUsers?.length > 0 &&
      onlineUsers?.some((user) => user?._id === activeChat?.user?._id);
    const isVisitorActive =
      visitors?.length > 0 &&
      visitors?.some((visitor) => visitor === activeChat?.fingerprint);
    setIsActive(isUserActive || isVisitorActive || false);
  }, [visitors, onlineUsers, activeChat]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const fetchFullActiveChat = async (page) => {
    if (!activeChat?._id) return;
    try {
      page === 1 && setIsLoading(true);
      const response = await fetch(
        `${baseURL}/chat/messages/${activeChat?._id}?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );
      const data = await response.json();

      setMessages((prev) => {
        const newMessages = Array.isArray(data?.data?.data?.messages)
          ? data?.data?.data?.messages
          : [];

        const filteredMessages = newMessages.filter(
          (newMessage) =>
            !prev.some(
              (prevMessage) =>
                new Date(prevMessage.timestamp).getTime() ===
                new Date(newMessage.timestamp).getTime(),
            ),
        );
        const updatedChats = [...prev, ...filteredMessages];

        return updatedChats.sort((a, b) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateA - dateB;
        });
      });

      setFullActiveChat(data?.data?.data);
      setCurrentPage(data?.data?.currentPage);
      setTotalPages(data?.data?.totalPages);
    } catch {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeChat) {
      setMessages([]);
      fetchFullActiveChat(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat]);

  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
    if (currentPage === 1 || scrollToBottomMessage) {
      scrollToBottom();
      setScrollToBottomMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    setFullActiveChatRef.current = setFullActiveChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullActiveChat, messages]);

  const setActiveChatRef = useRef(setActiveChat);
  const activeChatRef = useRef(activeChat);

  useEffect(() => {
    setActiveChatRef.current = setActiveChat;
    activeChatRef.current = activeChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullActiveChat, messages, activeChat]);

  useEffect(() => {
    const handleNewMsg = (chatMessage) => {
      if (
        chatMessage?.type === "admin_join" &&
        !activeChatRef.current?._id &&
        chatMessage?.admin?._id === activeChatRef.current?.admin?._id
      ) {
        setFullActiveChatRef.current({
          ...activeChatRef.current,
          admin: chatMessage?.message?.sender,
          fingerprint: chatMessage?.fingerprint,
          user: activeChatRef.current.user,
          _id: chatMessage?._id,
        });

        setActiveChatRef.current({
          ...activeChatRef.current,
          admin: chatMessage?.message?.sender,
          fingerprint: chatMessage?.fingerprint,
          user: activeChatRef.current.user,
          _id: chatMessage?._id,
        });

        toast.success(
          `${chatMessage?.message?.sender?.profile?.username} Joined Chat : ${chatMessage?._id} `,
        );
        setDisableJoin(false);
      }

      if (
        activeChatRef.current &&
        activeChatRef.current?._id === chatMessage?._id
      ) {
        setMessages(() => {
          const isDuplicate = messagesRef.current.some(
            (message) =>
              new Date(message.timestamp).getTime() ===
              new Date(chatMessage?.message.timestamp).getTime(),
          );

          const updatedChats = isDuplicate
            ? messagesRef.current
            : [...messagesRef.current, chatMessage.message];
          setScrollToBottomMessage(true);
          return updatedChats;
        });

        if (chatMessage?.type === "admin_join") {
          setFullActiveChatRef.current({
            ...activeChatRef.current,
            admin: chatMessage?.message?.sender,
            fingerprint: chatMessage?.fingerprint,
            user: activeChatRef.current.user,
            _id: chatMessage?._id,
          });

          setActiveChatRef.current({
            ...activeChatRef.current,
            admin: chatMessage?.message?.sender,
            fingerprint: chatMessage?.fingerprint,
            user: activeChatRef.current.user,
            _id: chatMessage?._id,
          });

          toast.success(
            `${chatMessage?.message?.sender?.profile?.username} Joined Chat : ${chatMessage?._id} `,
          );
          setDisableJoin(false);
        }
      }
    };

    socket.on("admin_message", handleNewMsg);
    socket.on("admin_join", handleNewMsg);

    return () => {
      socket.off("admin_message", handleNewMsg);
      socket.off("admin_join", handleNewMsg);
    };
  }, [activeChat]);

  const adminJoin = () => {
    socket.emit("admin_join_chat", {
      chatroomId: activeChat?._id,
      userId: activeChat?.user?._id,
      adminId: user?._id,
      timestamp: new Date().toISOString(),
    });

    setDisableJoin(true);
  };

  const handleSendMessage = () => {
    if (!inputText.trim() && !fileUrl) return;

    socket.emit("admin_message", {
      userId: user?._id,
      chatroomId: activeChat?._id,
      message: { message: inputText, file: fileUrl },
    });

    setInputText("");
    setFileUrl(null);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Uploading file...");

    const newImageUrl = await uploadImage(file);

    toast.dismiss(toastId);

    if (!newImageUrl) {
      toast.error("Failed to upload file");
      return;
    }

    setFileUrl(newImageUrl);
    toast.success("File uploaded successfully.");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const newRows = Math.floor(newHeight / lineHeight);
      setRows(newRows < 4 ? newRows : 4);
    }

    if (!inputText || !inputText?.length) {
      setRows(1);
    }
  }, [inputText]);

  const handleScroll = useCallback(async () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight } = containerRef.current;
      if (scrollTop === 0 && activeChat && currentPage < totalPages) {
        await fetchFullActiveChat(currentPage + 1);
        setPreviousHeight(scrollHeight);
        containerRef.current.scrollTo({
          top: scrollHeight - previousHeight,
          behavior: "smooth",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat, fetchFullActiveChat]);
  // console.log(fullActiveChat)
  // console.log(messages)
  // console.log(activeChat)

  return (
    <div
      className="2xl:col-span-3 bg-white mt-5 rounded-lg border border-gray-100 shadow-md p-5 relative"
      ref={chatBoxRef}
      tabIndex={0}
    >
      <div className="flex justify-between gap-5 items-center border-b pb-3 border-b-gray-200">
        <div className="flex items-center gap-[16px]">
          <Popover backdrop="opaque" showArrow offset={10} placement="bottom">
            <PopoverTrigger>
              <Button
                className="relative px-0 py-0 w-fit h-fit bg-transparent "
                isDisabled={!activeChat}
              >
                <img
                  src={activeChat?.user?.profilePicture || demoImg}
                  alt="User avatar"
                  className="rounded-full w-12 2xl:w-14 border"
                />
                {isActive && (
                  <div className="absolute bottom-0 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </Button>
            </PopoverTrigger>
            <ProfileCard chat={activeChat} />
          </Popover>

          <div>
            <div className="flex items-center gap-4">
              <Typography.Title
                variant="semibold"
                className="!text-[16px] 2xl:!text-[20px]"
              >
                {activeChat
                  ? activeChat?.user?.profile?.name || "Anonymous"
                  : "Select a chat"}
              </Typography.Title>

              {activeChat && (
                <span
                  className={`${
                    activeChat?.user?.profile?.role === "user"
                      ? "bg-[#2D68F8]"
                      : activeChat?.user?.profile?.role === "admin"
                      ? "bg-primary"
                      : "bg-[#E10E0E]"
                  } px-3 text-[12px] py-0.5 rounded-full text-white capitalize font-semibold`}
                >
                  {activeChat?.user?.profile?.role || "Visitor"}
                </span>
              )}
            </div>

            {/* assign conversation */}
            {/* <Popover
              isOpen={isOpen}
              backdrop="opaque"
              showArrow
              offset={10}
              placement="bottom"
              onOpenChange={(open) => setIsOpen(open)}
            >
              <PopoverTrigger>
                <Button
                  className="relative px-0 py-0 w-fit h-fit bg-transparent"
                  isDisabled={!activeChat}
                >
                  {" "}
                  <Typography.Base
                    variant="normal"
                    className=" flex items-center gap-2 !text-[12px] 2xl:!text-[14px] text-gray-600"
                  >
                    Assign this conversation{" "}
                    <IoMdArrowDropdown className="text-2xl" />
                  </Typography.Base>
                </Button>
              </PopoverTrigger>
              <AssignConversation
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                allAdmins={allAdmins}
                chat={fullActiveChat}
                refetch={fetchFullActiveChat}
              />
            </Popover> */}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="relative px-0 py-0 w-fit h-fit bg-transparent bg-[#F2F2F2] p-2 rounded-lg min-w-0"
                isDisabled={!activeChat}
              >
                <RiMore2Fill className="text-xl text-gray-500" />
              </Button>
            </DropdownTrigger>
            <ChatAction id={activeChat?._id} getAllChats={getAllChats} />
          </Dropdown>

          <Popover backdrop="opaque" showArrow offset={10} placement="bottom">
            <PopoverTrigger>
              <Button
                className="relative px-0 py-0 w-fit h-fit bg-transparent min-w-0 outline-none bg-[#F2F2F2] p-2 rounded-lg text-gray-500 flex gap-2 items-center text-sm"
                isDisabled={!activeChat}
              >
                <CgProfile className="text-lg text-gray-500" />{" "}
                <span className="hidden 2xl:block">See Profile</span>
              </Button>
            </PopoverTrigger>
            <ProfileCard chat={activeChat} />
          </Popover>
        </div>
      </div>

      {/* chats */}
      <div
        className={`pt-5 ${
          fileUrl ? "pb-24" : "pb-8"
        } h-[55vh] overflow-y-scroll scroll-smooth mb-5 ${
          !activeChat ? "flex items-center justify-center" : ""
        } `}
        onScroll={handleScroll}
        ref={containerRef}
      >
        {!activeChat ? (
          <Typography.Base
            variant="normal"
            className="text-gray-500 !text-center mb-10"
          >
            Select a chat to start messaging
          </Typography.Base>
        ) : isLoading ? (
          <div className="my-20 text-center">
            <CircularProgress size={50} />
          </div>
        ) : fullActiveChat && messages?.length > 0 ? (
          <>
            {messages?.map((message, index) => {
              const isLast = messages?.length === index + 1;

              return (
                <div key={index}>
                  {isLast && <div ref={lastMessageRef}></div>}

                  {message?.eventType === "admin_join" ? (
                    <p className="text-[12px] text-gray-500 text-center my-4">
                      <time
                        className={`${
                          new Date(message?.timestamp).toDateString() !==
                          new Date().toDateString()
                            ? ""
                            : "hidden"
                        }`}
                      >
                        {new Date(message?.timestamp).toLocaleString("en-GB", {
                          timeZone: "Europe/Rome",
                          // weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>{" "}
                      <time>
                        {new Date(message?.timestamp || "").toLocaleString(
                          "en-GB",
                          {
                            timeZone: "Europe/Rome",
                            // weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          },
                        )}
                      </time>
                      <br />
                      <span className="font-semibold text-primary">
                        {message?.sender?.profile?.username ||
                          "Mahi Patente Pro Admin"}{" "}
                      </span>
                      has joined the chat
                    </p>
                  ) : message?.sender?.profile?.role === "admin" ? (
                    <SenderChat message={message} />
                  ) : (
                    <ReceiverChat message={message} />
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <Typography.Base
            variant="normal"
            className="text-gray-500 !text-center mt-8 mb-16"
          >
            Get Started With Sending A Message
          </Typography.Base>
        )}
      </div>
      {/* text input field */}

      {!fullActiveChat?.admin || !fullActiveChat?._id ? (
        <div className="flex gap-2 items-center absolute bottom-5 left-5 right-5">
          <div className="relative flex items-center justify-center rounded-lg bg-secondary w-full">
            {activeChat && (
              <Button
                isDisabled={!activeChat || disableJoin || isLoading}
                className="py-2 text-white"
                onPress={adminJoin}
                color="success"
              >
                {disableJoin ? (
                  <CircularProgress size={20} style={{ color: "white" }} />
                ) : (
                  "Start Converstaion"
                )}
              </Button>
            )}
          </div>
        </div>
      ) : fullActiveChat?.admin?._id === user?._id ? (
        <div className="absolute bottom-5 left-5 right-5 bg-white pt-3 border-t">
          {fileUrl && (
            <div className="relative w-fit">
              <img
                src={fileUrl}
                alt="Uploaded File"
                className="h-12 rounded-md mx-2 mb-3 cursor-pointer"
                onClick={() => window.open(fileUrl, "_blank")}
              />
              <button
                type="button"
                onClick={() => setFileUrl(null)}
                className="text-white absolute right-2 top-0 z-10 rounded-lg"
              >
                <CustomIcon size={24} name={"CircleX"} color="red" />
              </button>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <div
              className={`flex-1 relative flex items-center rounded-lg border-1 border-primary py-3 ${
                !activeChat || isLoading
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-white"
              }`}
            >
              <label className="cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors mx-2">
                <input
                  name="uploadedFile"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {uploading ? (
                  <div className="size-6 flex items-center justify-center">
                    <CircularProgress size={24} />
                  </div>
                ) : (
                  <FaPaperclip size={20} />
                )}
              </label>
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!activeChat || isLoading}
                onKeyUp={handleKeyPress}
                rows={rows}
                placeholder="Type your message..."
                className="w-full ml-1 focus:outline-none resize-none disabled:bg-gray-100 disabled:cursor-not-allowed pr-2"
              ></textarea>
            </div>

            <Button
              isDisabled={!activeChat || isLoading}
              className="px-5 rounded-lg bg-violet-500 hover:bg-violet-600 transition-colors w-fit min-w-0"
              aria-label="Send message"
              onPress={handleSendMessage}
              size="lg"
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center absolute bottom-5 left-5 right-5">
          <div className="relative flex items-center justify-center rounded-lg border border-gray-200 bg-white w-full">
            <Typography.Base
              variant="normal"
              className="text-gray-500 !text-center px-4 py-2"
            >
              <span className="font-semibold">
                {fullActiveChat?.admin?.profile?.username}
              </span>{" "}
              is active in this conversation...
            </Typography.Base>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatManageChatBox;
