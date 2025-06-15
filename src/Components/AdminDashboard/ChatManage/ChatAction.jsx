import { RiDeleteBin6Line, RiSpam3Fill } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import {
  IoCheckmarkDoneCircleOutline,
  IoMailUnreadOutline,
} from "react-icons/io5";
import { baseURL } from "@/Config/config";
import toast from "react-hot-toast";
import useChatStore from "../../../Store/useChatStore";
import { DropdownMenuItem } from "@/Components/ui/dropdown-menu";

const ChatAction = ({ id, getAllChats }) => {
  const token = localStorage.getItem("token");
  const { userListTab, activeChat, setActiveChat } = useChatStore();

  const updateCategory = async (category) => {
    const toastId = toast.loading("Updating category...");
    try {
      const response = await fetch(`${baseURL}/chat/change-category/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        toast.success("Category updated successfully!");
        getAllChats();
      } else {
        throw new Error("Failed to update category");
      }
    } catch (error) {
      toast.error(error.message || "Error updating category.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const deleteChat = async () => {
    const toastId = toast.loading("Deleting chat...");
    try {
      const response = await fetch(`${baseURL}/chat/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Chat deleted successfully!");
        getAllChats();
        if (id === activeChat?._id) {
          setActiveChat(null);
        }
      } else {
        throw new Error("Failed to delete chat");
      }
    } catch (error) {
      toast.error(error.message || "Error deleting chat.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      <DropdownMenuItem
        className="border mb-1 hover:!text-primary text-[#64748B] flex items-center gap-2"
        key="Spam"
        onClick={() => updateCategory("Spam")}
        disabled={userListTab === "Spam"}
      >
        <RiSpam3Fill className="text-[16px]" />
        Move to Spam
      </DropdownMenuItem>
      <DropdownMenuItem
        className="border mb-1 hover:!text-primary text-red-600 flex items-center gap-2"
        key="Delete Chat"
        onClick={() => deleteChat()}
      >
        <RiDeleteBin6Line className="text-[16px]" /> Delete Chat
      </DropdownMenuItem>
      <DropdownMenuItem
        className="border mb-1 hover:!text-primary text-[#64748B] flex items-center gap-2"
        key="Follow Up"
        onClick={() => updateCategory("Follow Up")}
        disabled={userListTab === "Follow Up"}
      >
        <CiStar className="text-[18px]" /> Mark as follow up
      </DropdownMenuItem>
      <DropdownMenuItem
        className="border mb-1 hover:!text-primary text-[#64748B] flex items-center gap-2"
        key="Unread"
        onClick={() => updateCategory("Unread")}
        disabled={userListTab === "Unread"}
      >
        <IoMailUnreadOutline className="text-[16px]" /> Mark as unread
      </DropdownMenuItem>
      <DropdownMenuItem
        className="border mb-1 hover:!text-primary text-[#64748B] flex items-center gap-2"
        key="Done"
        onClick={() => updateCategory("Done")}
        disabled={userListTab === "Done"}
      >
        <IoCheckmarkDoneCircleOutline className="text-[18px]" /> Move to done
      </DropdownMenuItem>
    </>
  );
};

export default ChatAction;
