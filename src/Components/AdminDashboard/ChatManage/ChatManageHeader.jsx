import { BiMessageRoundedDots } from "react-icons/bi";
import Typography from "@/Components/Typography";
import { FaUsers } from "react-icons/fa6";
import {
  // MdAdminPanelSettings,
  // MdOutlineSupportAgent,
  MdVisibility,
} from "react-icons/md";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import useChatStore from "../../../Store/useChatStore";

const ChatManageHeader = () => {
  const { tab, setTab } = useChatStore();
  const activeBtn = "bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]";
  const norBtn = `bg-gray-300`;
  return (
    <header className="flex items-center gap-5 justify-between bg-white  p-5 shadow-sm rounded sticky top-0 z-[11]">
      <div className="flex items-center gap-7">
        <Typography.Heading4
          className="bg-title_gradient bg-clip-text text-transparent w-fit whitespace-nowrap"
          variant="semibold"
        >
          Chat Manage
        </Typography.Heading4>

        <div className="flex items-center gap-3">
          <div
            className={`p-[2px] rounded-[8px] w-fit ${
              tab === "all" ? activeBtn : norBtn
            }`}
          >
            <button
              onClick={() => setTab("all")}
              className="flex items-center gap-2 bg-white rounded-md px-4 py-1.5"
            >
              <BiMessageRoundedDots
                className={`text-xl ${
                  tab === "all" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`font-medium hidden 2xl:block  whitespace-nowrap ${
                  tab === "All Chats"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                All Chats
              </span>
            </button>
          </div>

          <div
            className={`p-[2px] rounded-[8px] w-fit ${
              tab === "user" ? activeBtn : norBtn
            }`}
          >
            <button
              onClick={() => setTab("user")}
              className="flex items-center gap-2 bg-white rounded-md px-4 py-1.5"
            >
              <FaUsers
                className={`text-xl ${
                  tab === "user" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`hidden 2xl:block font-medium whitespace-nowrap ${
                  tab === "user"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Users
              </span>
            </button>
          </div>

          <div
            className={`p-[2px] rounded-[8px] w-fit ${
              tab === "visitors" ? activeBtn : norBtn
            }`}
          >
            <button
              onClick={() => setTab("visitors")}
              className="flex items-center gap-2 bg-white rounded-md px-4 py-1.5"
            >
              <MdVisibility
                className={`text-xl ${
                  tab === "visitors" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`hidden 2xl:block font-medium whitespace-nowrap ${
                  tab === "visitors"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Visitor
              </span>
            </button>
          </div>

          {/* <div
            className={`p-[2px] rounded-[8px] w-fit ${
              tab === "Admins" ? activeBtn : norBtn
            }`}
          >
            <button
              onClick={() => setTab("Admins")}
              className="flex items-center gap-2 bg-white rounded-md px-4 py-1.5"
            >
              <MdAdminPanelSettings
                className={`text-xl ${
                  tab === "Admins" ? "text-[#4B2BB2]" : "text-gray-500"
                }`}
              />
              <span
                className={`hidden 2xl:block font-medium whitespace-nowrap ${
                  tab === "Admins"
                    ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                    : "text-gray-500"
                }`}
              >
                Admins
              </span>
            </button>
          </div> */}
        </div>
      </div>

      <div className="flex gap-3 items-center border-l pl-5">
        {/* <div
          className={`p-[2px] rounded-[8px] w-fit ${
            tab === "System Support" ? activeBtn : norBtn
          }`}
        >
          <button
            onClick={() => setTab("System Support")}
            className="flex items-center gap-2 bg-white rounded-md px-4 py-1.5"
          >
            <MdOutlineSupportAgent
              className={`text-xl ${
                tab === "System Support" ? "text-[#4B2BB2]" : "text-gray-500"
              }`}
            />
            <span
              className={`hidden 2xl:block font-medium whitespace-nowrap ${
                tab === "System Support"
                  ? " text-transparent bg-clip-text bg-gradient-to-r from-[#4B2BB2] to-[#B262B2]"
                  : "text-gray-500"
              }`}
            >
              System Support
            </span>
          </button>
        </div> */}

        <Link
          className="flex items-center gap-2 px-5 rounded-md bg-accent text-white py-1.5 hover:bg-accent/90"
          to="/admin-dashboard"
        >
          <IoChevronBackCircleOutline className="text-lg" />
          Back
        </Link>
      </div>
    </header>
  );
};

export default ChatManageHeader;
