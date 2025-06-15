import { FaRegStar } from "react-icons/fa6";
import { IoMdArchive } from "react-icons/io";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { RiSpam2Fill } from "react-icons/ri";
import useChatStore from "../../../Store/useChatStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/Components/ui/tooltip";

const UserListTab = () => {
  const { userListTab, setUserListTab } = useChatStore();

  const activeBtn = "bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]";
  const norBtn = `bg-gray-300`;
  return (
    <div className="flex items-center gap-3 mt-5 mb-2">
      <div
        className={`p-[2px] rounded-[8px] w-fit ${
          userListTab === "Done" ? activeBtn : norBtn
        }`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setUserListTab("Done")}
              className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5"
            >
              <IoCheckmarkDoneCircle
                className={`text-lg ${
                  userListTab === "Done" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`hidden min-[1800px]:block font-medium whitespace-nowrap text-[12px] ${
                  userListTab === "Done"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Done
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="min-[1800px]:hidden"
          >
            Done
          </TooltipContent>
        </Tooltip>
      </div>

      <div
        className={`p-[2px] rounded-[8px] w-fit ${
          userListTab === "Follow Up" ? activeBtn : norBtn
        }`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setUserListTab("Follow Up")}
              className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5"
            >
              <FaRegStar
                className={`text-lg ${
                  userListTab === "Follow Up"
                    ? "text-[#4B2BB2]"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`hidden min-[1800px]:block font-medium whitespace-nowrap text-[12px] ${
                  userListTab === "Follow Up"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Follow Up
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="min-[1800px]:hidden"
          >
            Follow Up
          </TooltipContent>
        </Tooltip>
      </div>

      <div
        className={`p-[2px] rounded-[8px] w-fit ${
          userListTab === "Archive" ? activeBtn : norBtn
        }`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setUserListTab("Archive")}
              className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5"
            >
              <IoMdArchive
                className={`text-lg ${
                  userListTab === "Archive" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`hidden min-[1800px]:block font-medium whitespace-nowrap text-[12px] ${
                  userListTab === "Archive"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Archive
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="min-[1800px]:hidden"
          >
            Archive
          </TooltipContent>
        </Tooltip>
      </div>

      <div
        className={`p-[2px] rounded-[8px] w-fit ${
          userListTab === "Unread" ? activeBtn : norBtn
        }`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setUserListTab("Unread")}
              className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5"
            >
              <MdMarkUnreadChatAlt
                className={`text-lg ${
                  userListTab === "Unread" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`hidden min-[1800px]:block font-medium whitespace-nowrap text-[12px] ${
                  userListTab === "Unread"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Unread
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="min-[1800px]:hidden"
          >
            Unread
          </TooltipContent>
        </Tooltip>
      </div>

      <div
        className={`p-[2px] rounded-[8px] w-fit ${
          userListTab === "Spam" ? activeBtn : norBtn
        }`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setUserListTab("Spam")}
              className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5"
            >
              <RiSpam2Fill
                className={`text-lg ${
                  userListTab === "Spam" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`hidden min-[1800px]:block font-medium whitespace-nowrap text-[12px] ${
                  userListTab === "Spam"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Spam
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="center"
            className="min-[1800px]:hidden"
          >
            Spam
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserListTab;
