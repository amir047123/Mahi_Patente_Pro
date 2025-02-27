import { EyeIcon, MoreVertical, PencilIcon, TrashIcon } from "lucide-react";
import img from "@/assets/UserDashboard/demo-chapeter-img.svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "react-router-dom";

const AdminChapterCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden flex items-start w-full">
      {/* Left section with car icon */}
      <img src={img} alt="img" />

      {/* Right section with text */}
      <div className="flex-1 p-6 h-full">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-secondaryText text-sm mb-1">Chapter 1</p>
            <h2 className="font-bold text-primaryText text-lg mb-1">
              Road, vehicles, driver duties
            </h2>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-secondaryText focus:outline-none">
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <Link to="/admin-dashboard/quiz-manage/chapters/id">
                <DropdownMenuItem className="flex gap-2 py-2 cursor-pointer">
                  <EyeIcon className="h-5 w-5 text-gray-700" />
                  <span className="text-gray-700 font-medium">Open</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="flex gap-2 py-2 cursor-pointer">
                <PencilIcon className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 py-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
                <TrashIcon className="h-5 w-5" />
                <span className="font-medium">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-secondaryText text-sm mt-2">
          5 Subject · 18 Questions added
        </p>
      </div>
    </div>
  );
};

export default AdminChapterCard;
