/* eslint-disable react-refresh/only-export-components */
import { useNotification } from "@/Hooks/useNotifications";
import { createContext, useContext } from "react";

const NotificationsContext = createContext({});

export const NotificationsProvider = ({ children }) => {
  const notifications = useNotification();

  return (
    <NotificationsContext.Provider value={notifications}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);

  if (context === undefined || context === null) {
    throw new Error(
      "useNotificationsContext must be used within an NotificationsProvider"
    );
  }

  return context;
};

export default NotificationsContext;
