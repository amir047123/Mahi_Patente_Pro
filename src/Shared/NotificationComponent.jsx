import Spinner from "@/Components/ui/Spinner";
import { useAuthContext } from "@/Context/AuthContext";
import { useNotificationsContext } from "@/Context/NotificationsContext";
import { CheckCheck } from "lucide-react";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import coin from "@/assets/Navbar/coin-notification.svg";
import quiz from "@/assets/Navbar/quiz-notification.svg";
import leaderboard from "@/assets/Navbar/leaderboard-notification.svg";

const NotificationComponent = () => {
  const { notifications, loading, error, lastNotificationRef, markAllAsRead } =
    useNotificationsContext();
  const { user } = useAuthContext();
  const role = user?.profile?.role;

  return (
    <div className="min-w-80 max-w-[395px] py-2 bg-[#ECF2F8] border-2 rounded-lg shadow-xl absolute top-8 -right-20 lg:-right-32 z-[9999] mx-auto">
      <div className="">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-secondary">
            Notifications
          </h2>
          <button
            type="button"
            className="flex gap-2 text-primary hover:text-primary/80 text-xs"
            onClick={markAllAsRead}
          >
            <CheckCheck size={16} />
            <span>Mark all as read</span>
          </button>
        </div>
        <div className="max-h-[450px] overflow-y-auto">
          <div className="">
            {notifications?.length > 0 ? (
              notifications?.map((notification, index) => {
                const isLast = notifications?.length === index + 1;
                const handleUrl = () => {
                  let url = window.location.href;
                  if (role === "admin") {
                    switch (notification?.type) {
                      case "quiz":
                        url = "/admin-dashboard/quiz";
                        break;
                      default:
                        url = window.location.href;
                    }
                  } else {
                    switch (notification?.type) {
                      case "quiz":
                        url = `/${role}-dashboard/quiz`;
                        break;
                      default:
                        url = window.location.href;
                    }
                  }
                  return url;
                };
                return (
                  <div
                    ref={isLast ? lastNotificationRef : null}
                    key={notification?._id}
                    className="mb-2"
                  >
                    <Link
                      className={`flex items-center gap-3 p-2 mx-4 my-2 rounded-xl bg-white hover:bg-gray-50 transition-colors ${
                        !notification.read ? "bg-red-50" : ""
                      }`}
                      to={handleUrl()}
                    >
                      {notification?.type === "quiz" ? (
                        <img src={quiz} className="" alt="quiz notification" />
                      ) : notification?.type === "coin" ? (
                        <img src={coin} className="" alt="coin notification" />
                      ) : notification?.type === "leaderboard" ? (
                        <img
                          src={leaderboard}
                          className=""
                          alt="leaderboard notification"
                        />
                      ) : (
                        <FaBell className="p-2 rounded-full size-12 bg-gray-100 text-gray-600" />
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notification?.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          <time>
                            {new Date(notification?.createdAt).toLocaleString(
                              "en-GB",
                              {
                                timeZone: "Europe/Rome",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </time>
                          ,{" "}
                          <time>
                            {new Date(notification?.createdAt).toLocaleString(
                              "en-GB",
                              {
                                timeZone: "Europe/Rome",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              }
                            )}
                          </time>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-sm">
                <span>No notifications available</span>
              </div>
            )}
          </div>
          {loading && (
            <div className="flex items-center justify-center py-4">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="text-center py-2 text-sm text-red-500">
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
