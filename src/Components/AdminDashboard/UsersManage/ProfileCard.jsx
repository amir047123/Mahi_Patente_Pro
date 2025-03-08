import { CiMail } from "react-icons/ci";
import demoUser from "@/assets/AdminDashboard/demo-user.svg";
// import demoUser from "@/assets/adminDashboard/demo-user.svg";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlinePhonePaused } from "react-icons/md";
import Typography from "@/Components/Typography";

const ProfileCard = ({ user }) => {
  return (
    <div>
      <Typography.Heading6 variant="bold" className="text-primaryText">
        Profile Details
      </Typography.Heading6>

      <div className="bg-white dark:bg-darkCardBg rounded-2xl  p-4 relative w-full mt-3 h-[190px]">
        <BsInfoCircle className="absolute top-4 right-5" />
        <div className="flex flex-col justify-between  h-full">
          {/* Header with Avatar and Name */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-pink-100 overflow-hidden">
                <img
                  src={user?.profile?.profilePicture || demoUser}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1">
              <Typography.Heading6 className="font-semibold text-black">
                {user?.profile?.name || "N/A"}
              </Typography.Heading6>
              <Typography.Body className="text-teal-500 !text-[14px]">
                {user?.profile?.username
                  ? `@${user?.profile?.username}`
                  : "N/A"}
              </Typography.Body>
            </div>
          </div>

          {/* Referral Section */}
          <div className="flex items-baseline gap-2 mt-2 justify-between">
            <div className="space-y-1 mt-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-white/70">
                <CiMail className="w-3 h-3" />
                <Typography.Body className="!text-[13px]">
                  {user?.auth?.email || "N/A"}
                </Typography.Body>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-white/70">
                <MdOutlinePhonePaused className="w-3 h-3" />
                <Typography.Body className="!text-[13px]">
                  {user?.auth?.phone || "N/A"}
                </Typography.Body>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="bg-orange-500 px-2 flex items-center h-5 rounded-3xl text-[9px] text-white">
                PRO
              </span>
              <span className="bg-green-100 px-2 flex items-center h-5 rounded-3xl text-[9px] text-green-500">
                {user?.profile?.status || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
