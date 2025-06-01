import { useEffect, useState } from "react";
import demoImg from "@/assets/Navbar/logo.svg";

const ReceiverChat = ({ message }) => {
  const [isOld, setIsOld] = useState(false);

  useEffect(() => {
    const messageDate = new Date(message?.timestamp).toDateString();
    const currentDate = new Date().toDateString();

    const isOldMessage = messageDate !== currentDate;

    setIsOld(isOldMessage);
  }, [message]);

  return (
    <div className="flex items-start gap-3 mb-5">
      <img
        src={message?.sender?.profilePicture || demoImg}
        alt="User avatar"
        className="rounded-full w-10 border"
      />

      <div>
        <div className="text-[12px] flex items-center gap-1">
          <p className=" text-primary font-medium">
            {message?.sender?.username || "Anonymous"}
          </p>
          <p className="text-[#64748B]">
            •{" "}
            <time className={`${isOld ? "" : "hidden"}`}>
              {new Date(message?.timestamp).toLocaleString("en-GB", {
                timeZone: "Europe/Rome",
                // weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>{" "}
            <time>
              {new Date(message?.timestamp || "").toLocaleString("en-GB", {
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

        <div className="bg-[#DFE4EA] text-[13px] max-w-[250px] 2xl:max-w-[350px] p-3 rounded-r-2xl rounded-b-2xl w-fit">
          {message?.file && (
            <img
              src={message?.file}
              alt="file"
              className="w-full h-auto object-cover cursor-pointer mb-2 rounded-md"
              onClick={() => window.open(message?.file, "_blank")}
            />
          )}
          {message?.content || ""}
        </div>
      </div>
    </div>
  );
};

export default ReceiverChat;
