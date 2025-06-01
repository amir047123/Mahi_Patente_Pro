import { create } from "zustand";

const useChatStore = create((set) => ({
  messages: [],
  isChatOpen: false,
  isFullScreenChatOpen: false,
  fullChat: {},
  isLoading: true,

  // Admin Chats
  adminChats: [],
  adminUnreadChats: [],
  tab: "all",
  userListTab: "Unread",
  activeChat: null,
  fullActiveChat: null,

  setIsChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
  setIsFullScreenChatOpen: (isOpen) => set({ isFullScreenChatOpen: isOpen }),
  setFullChat: (chat) => set({ fullChat: chat }),
  setMessages: (msgs) => set({ messages: msgs }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Admin Chats
  setAdminChats: (chats) => set({ adminChats: chats }),
  setAdminUnreadChats: (chats) => set({ adminUnreadChats: chats }),
  setTab: (tab) => set({ tab }),
  setUserListTab: (tab) => set({ userListTab: tab }),
  setActiveChat: (chat) => set({ activeChat: chat }),
  setFullActiveChat: (chat) => set({ fullActiveChat: chat }),
}));

export default useChatStore;
