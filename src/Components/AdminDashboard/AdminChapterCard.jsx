import { EyeIcon, MoreVertical, PencilIcon, TrashIcon } from "lucide-react";
import img from "@/assets/UserDashboard/demo-chapeter-img.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import AdminEditChapterModal from "@/Pages/AdminDashboard/AdminEditChapterModal";
import { useState } from "react";

const AdminChapterCard = ({
  item,
  index,
  setItemIndex,
  setIsWarningModalOpen,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex items-start w-full">
      {/* Left section with car icon */}
      <img className="h-full" src={item?.image || img} alt="img" />

      {/* Right section with text */}
      <div className="flex-1 flex flex-col justify-between h-full p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-secondaryText text-sm mb-1">
              Chapter {item?.order}
            </p>
            <h2 className="font-bold text-primaryText text-lg mb-1 line-clamp-2">
              {item?.name}
            </h2>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-secondaryText focus:outline-none">
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <Link to={`/admin-dashboard/quiz-manage/chapters/${item?._id}`}>
                <DropdownMenuItem className="flex gap-2 py-2 cursor-pointer">
                  <EyeIcon className="h-5 w-5 text-gray-700" />
                  <span className="text-gray-700 font-medium">Open</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="flex gap-2 py-2 cursor-pointer"
                onClick={() => setIsEditModalOpen(true)}
              >
                <PencilIcon className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setItemIndex(index);
                  setIsWarningModalOpen(true);
                }}
                className="flex gap-2 py-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
              >
                <TrashIcon className="h-5 w-5" />
                <span className="font-medium">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-secondaryText text-sm mt-2">
          {item?.count?.totalSubjects || 0} Subjects added
        </p>
      </div>

      <AdminEditChapterModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        item={item}
      />
    </div>
  );
};

export default AdminChapterCard;
