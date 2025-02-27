import AdminAddChapterModal from "@/Pages/AdminDashboard/AdminAddChapterModal";
import { Image, PlusCircle } from "lucide-react";

const AdminAddChapterCard = () => {
  return (
    <>
      <AdminAddChapterModal>
        <div className="flex items-center w-full h-40 border rounded-lg shadow-sm bg-white">
          {/* Left-side image placeholder */}
          <div className="w-1/3 h-full flex items-center justify-center bg-[#EDEDED] rounded-l-lg">
            <Image className="text-gray-400" />
          </div>

          {/* Right-side add button */}
          <div className="flex flex-col items-center justify-center w-2/3">
            <PlusCircle className="text-gray-500" size={24} />
            <span className="text-gray-500 font-medium mt-2">Add Chapter</span>
          </div>
        </div>
      </AdminAddChapterModal>
    </>
  );
};

export default AdminAddChapterCard;
