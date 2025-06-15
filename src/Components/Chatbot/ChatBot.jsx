/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  FaPaperclip,
  FaPaperPlane,
  FaRegSmile,
  // FaRobot,
  FaUser,
} from "react-icons/fa";
import logo from "@/assets/Navbar/logo.svg";
import { IoMdClose } from "react-icons/io";
import useImageUploader from "../../Hooks/useImageUploader";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useNotificationsContext } from "../../Context/NotificationsContext";
import useChatStore from "@/Store/useChatStore";
import { baseURL } from "@/Config/config";
import socket from "@/socket";
import CustomIcon from "@/Ui/CustomIcon";
import Spinner from "../ui/Spinner";

const ChatBot = () => {
  const {
    fullChat,
    setFullChat,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
  } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const { user, fingerprint } = useAuthContext();
  const [isActive, setIsActive] = useState(false);
  const { onlineUsers } = useNotificationsContext();

  const fileInputRef = useRef(null);
  const { uploadImage, uploading } = useImageUploader();
  const [fileUrl, setFileUrl] = useState(null);

  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const containerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [scrollToBottomMessage, setScrollToBottomMessage] = useState(false);
  const [previousHeight, setPreviousHeight] = useState(0);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const isUserActive =
      onlineUsers?.length > 0 &&
      onlineUsers?.some((user) => user?._id === fullChat?.admin);
    setIsActive(isUserActive || false);
  }, [onlineUsers, user, fullChat]);

  const messagesRef = useRef(messages);
  const setMessagesRef = useRef(setMessages);

  useEffect(() => {
    messagesRef.current = messages;
    setMessagesRef.current = setMessages;
    if (currentPage === 1 || scrollToBottomMessage) {
      scrollToBottom();
      setScrollToBottomMessage(false);
    }
  }, [messages, fullChat, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [isOpen]);

  const getWelcomeMessage = () => ({
    content: "👋 Hi, there!. How can I help you today?",
    text: "👋 Hi, there!. How can I help you today?",
    sender: {
      profile: { role: "admin" },
    },
    timestamp: new Date(),
  });

  const fetchMessages = async (page) => {
    if (!fingerprint || user) return;
    try {
      page === 1 && setIsLoading(true);
      const response = await axios.post(
        `${baseURL}/chat/history`,
        { fingerprint: fingerprint, user: user?._id, page },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        },
      );

      if (response?.data?.data?.data?.messages?.length > 0) {
        const newMessages = Array.isArray(response?.data?.data?.data?.messages)
          ? response?.data?.data?.data?.messages
          : [];

        const filteredMessages = newMessages.filter(
          (newMessage) =>
            !messages.some(
              (prevMessage) =>
                new Date(prevMessage.timestamp).getTime() ===
                new Date(newMessage.timestamp).getTime(),
            ),
        );
        const updatedChats = [...messages, ...filteredMessages];

        const newChats = updatedChats.sort((a, b) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateA - dateB;
        });

        setMessages(newChats);

        setFullChat(response?.data?.data?.data);
        setCurrentPage(response?.data?.data?.currentPage);
        setTotalPages(response?.data?.data?.totalPages);
      } else {
        setMessages([getWelcomeMessage()]);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setMessages([getWelcomeMessage()]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fingerprint) fetchMessages();
  }, [fingerprint]);

  const setFullChatRef = useRef(setFullChat);
  const fullChatRef = useRef(fullChat);

  useEffect(() => {
    setFullChatRef.current = setFullChat;
    fullChatRef.current = fullChat;
  }, [fullChat, messages]);

  useEffect(() => {
    const handleNewMsg = (chatMessage) => {
      setFullChatRef.current({
        ...fullChatRef.current,
        ...(!fullChatRef.current?._id ? chatMessage : {}),
        ...(chatMessage?.type === "admin_join"
          ? {
              admin: chatMessage?.message?.sender,
            }
          : {}),
        ...(chatMessage?.type === "read_message" ||
        chatMessage?.message?.sender?.profile?.role !== "admin"
          ? { unreadCount: 0 }
          : { unreadCount: (fullChatRef.current?.unreadCount || 0) + 1 }),
      });

      chatMessage?.type === "admin_join" &&
        toast.success("A Mahi Patente Pro Admin Joined the Support Chat");

      if (chatMessage?.type !== "read_message") {
        const isDuplicate = messagesRef.current.some(
          (message) =>
            new Date(message.timestamp).getTime() ===
            new Date(chatMessage?.message.timestamp).getTime(),
        );

        const updatedChats = isDuplicate
          ? messagesRef.current
          : [...messagesRef.current, chatMessage.message];
        setScrollToBottomMessage(true);
        updatedChats;
        setMessages(updatedChats);
      }
    };

    const handleDeleteChat = async () => {
      setFullChatRef.current({});
      setMessagesRef.current([]);
      toast.success("Your Chat Has Been Deleted");
    };

    socket.on("connect", () => {
      socket.emit("user_connect", {
        fingerprint: fingerprint || socket.id,
      });
    });

    socket.on("chat_closed", () => {
      setMessages([
        {
          text: "Chat session has been closed.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    });

    socket.on("admin_message", handleNewMsg);
    socket.on("admin_join", handleNewMsg);
    socket.on("deleteChat", handleDeleteChat);
    socket.on("read_message", handleNewMsg);

    return () => {
      socket.off("admin_message", handleNewMsg);
      socket.off("admin_join", handleNewMsg);
      socket.off("chat_closed");
      socket.off("deleteChat", handleDeleteChat);
      socket.off("read_message", handleNewMsg);
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim() && !fileUrl) return;

    socket?.emit("user_message", {
      userId: user?._id,
      fingerprint,
      message: { message: inputText, file: fileUrl },
    });

    setFileUrl(null);
    setInputText("");
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

  const handleScroll = useCallback(async () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight } = containerRef.current;
      if (scrollTop === 0 && currentPage < totalPages) {
        await fetchMessages(currentPage + 1);
        setPreviousHeight(scrollHeight);
        containerRef.current.scrollTo({
          top: scrollHeight - previousHeight,
          behavior: "smooth",
        });
      }
    }
  }, [fetchMessages]);

  useEffect(() => {
    const chatBox = containerRef.current;
    const textArea = textareaRef.current;

    const readMessages = () => {
      if (fullChat && fullChat?.unreadCount > 0) {
        socket.emit("read_message", {
          chatroomId: fullChat?._id,
          role: user?.profile?.role || "visitor",
        });
      }
    };

    if (chatBox) {
      chatBox.addEventListener("focus", readMessages);
    }

    if (textArea) {
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
  }, [fullChat, messages, containerRef, user]);

  // Rest of your component's JSX remains the same, but add loading state handling
  return (
    <div className="fixed lg:bottom-7 lg:right-7 bottom-5 right-5 z-50">
      <AnimatePresence>
        <>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
              isOpen ? "hidden" : ""
            }`}
          >
            {/* <FaRobot size={24} /> */}
            <img src={logo} alt="Mahi Patente Pro Logo" className="w-16 h-16" />
            {fullChat?.unreadCount > 0 && (
              <span className="absolute -top-2 right-0 bg-white text-primary text-sm rounded-full w-6 h-6 flex items-center justify-center">
                {fullChat?.unreadCount || 0}
              </span>
            )}
          </motion.button>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`bg-white rounded-lg shadow-2xl w-96 ${
              fileUrl ? "h-[70vh]" : "h-[65vh]"
            } flex flex-col ${isOpen ? "" : "hidden"}`}
          >
            {/* Header remains the same */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={logo} alt="User avatar" className="w-10" />

                {/* <FaRobot size={20} /> */}
                <h3 className="font-semibold">Mahi Patente Support Chat</h3>
                {isActive && (
                  <div className="size-2 bg-green-500 rounded-full"></div>
                )}

                {fullChat?.unreadCount > 0 && (
                  <span className="bg-white text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {fullChat?.unreadCount || 0}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            {/* Messages section with loading state */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]"
              onScroll={handleScroll}
              ref={containerRef}
              tabIndex={0}
            >
              {isLoading ? (
                <div className="my-20 text-center">
                  <Spinner size={50} />
                </div>
              ) : (
                <>
                  {messages?.length > 0 ? (
                    messages.map((message, index) => {
                      const isLast = messages?.length === index + 1;
                      return (
                        <div key={index}>
                          {isLast && <div ref={lastMessageRef}></div>}
                          {message?.eventType === "admin_join" ? (
                            <p className="text-[12px] text-gray-500 text-center my-4">
                              <time
                                className={`${
                                  new Date(
                                    message?.timestamp,
                                  ).toDateString() !== new Date().toDateString()
                                    ? ""
                                    : "hidden"
                                }`}
                              >
                                {new Date(message?.timestamp).toLocaleString(
                                  "en-GB",
                                  {
                                    timeZone: "Europe/Rome",
                                    // weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </time>{" "}
                              <time>
                                {new Date(
                                  message?.timestamp || "",
                                ).toLocaleString("en-GB", {
                                  timeZone: "Europe/Rome",
                                  // weekday: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: true,
                                })}
                              </time>
                              <br />
                              <span className="font-semibold text-primary">
                                Mahi Patente Pro Admin{" "}
                              </span>
                              has joined the chat
                            </p>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${
                                message?.sender?.profile?.role === "admin"
                                  ? "justify-start"
                                  : "justify-end"
                              }`}
                            >
                              <div
                                className={`flex items-start gap-x-2 max-w-[80%] ${
                                  message?.sender?.profile?.role === "admin"
                                    ? "flex-row"
                                    : "flex-row-reverse"
                                }`}
                              >
                                <div
                                  className={`${
                                    message?.sender?.profile?.role === "admin"
                                      ? "p-2"
                                      : ""
                                  } rounded-full flex items-center justify-center min-w-8 min-h-8 w-8 h-8 ${
                                    message?.sender?.profile?.role
                                      ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                                      : "bg-indigo-100"
                                  }`}
                                >
                                  {message?.sender?.profile?.role ===
                                  "admin" ? (
                                    // <FaRobot className="text-white" size={24} />
                                    <img
                                      src={logo}
                                      alt="Mahi Patente Pro Logo"
                                      className="min-w-6 min-h-6 p-1"
                                    />
                                  ) : user?.profile?.profilePicture ? (
                                    <img
                                      src={user?.profile?.profilePicture}
                                      alt="user"
                                      className="size-8 rounded-full"
                                    />
                                  ) : (
                                    <FaUser
                                      className="text-indigo-600"
                                      size={24}
                                    />
                                  )}
                                </div>
                                <div
                                  className={`p-3 rounded-2xl ${
                                    message?.sender?.profile?.role === "admin"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                  } shadow-md`}
                                >
                                  {message?.file && (
                                    <img
                                      src={message?.file}
                                      alt="file"
                                      className="w-full h-auto object-cover cursor-pointer mb-2 rounded-md"
                                      onClick={() => window.open(message?.file)}
                                    />
                                  )}
                                  <p className="text-sm break-all">
                                    {message?.content}
                                  </p>
                                  <p className="text-xs opacity-50 mt-1">
                                    {message?.timestamp ? (
                                      <time>
                                        {new Date(
                                          message?.timestamp,
                                        ).toLocaleString("en-GB", {
                                          timeZone: "Europe/Rome",
                                          // weekday: "short",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          second: "2-digit",
                                          hour12: true,
                                        })}
                                      </time>
                                    ) : (
                                      "Invalid date"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex justify-start`}
                    >
                      <div
                        className={`flex items-start gap-x-2 max-w-[80%] flex-row`}
                      >
                        <div
                          className={`p-2 rounded-full flex items-center justify-center min-w-8 min-h-8 w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600`}
                        >
                          <img
                            src={logo}
                            alt="Mahi Patente Pro Logo"
                            className="min-w-6 min-h-6 p-1"
                          />
                        </div>
                        <div
                          className={`p-3 rounded-2xl bg-gray-100 text-gray-800 shadow-md`}
                        >
                          <p className="text-sm break-all">
                            👋 Hi, there!. How can I help you today?
                          </p>
                          <p className="text-xs opacity-50 mt-1">
                            <time>
                              {new Date().toLocaleString("en-GB", {
                                timeZone: "Europe/Rome",
                                // weekday: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              })}
                            </time>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef}></div>

                  {/* {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2 text-gray-500"
                    >
                      <div className="flex space-x-1">
                        {[0, 150, 300].map((delay) => (
                          <div
                            key={delay}
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${delay}ms` }}
                          ></div>
                        ))}
                      </div>
                    </motion.div>
                  )} */}
                </>
              )}
            </div>

            {/* Input section */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
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

              <div className="flex space-x-2 items-center">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyUp={handleKeyPress}
                    placeholder="Type your message..."
                    rows={rows}
                    disabled={isLoading}
                    className="w-full border rounded-2xl px-4 py-2 pr-[70px] focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  ></textarea>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2 pb-1">
                    <label className="cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors">
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
                          <Spinner size={24} />
                        </div>
                      ) : (
                        <FaPaperclip size={20} />
                      )}
                    </label>
                    <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <FaRegSmile size={20} />
                    </button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-3 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed size-9 flex items-center justify-center"
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send, Shift + Enter for a new line
              </p>
            </div>
          </motion.div>
        </>
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
