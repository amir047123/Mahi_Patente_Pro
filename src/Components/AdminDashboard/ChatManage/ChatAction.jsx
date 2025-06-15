import { DropdownItem, DropdownMenu } from "@nextui-org/react";
import { RiDeleteBin6Line, RiSpam3Fill } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import {
  IoCheckmarkDoneCircleOutline,
  IoMailUnreadOutline,
} from "react-icons/io5";
import { baseURL } from "@/Config/config";
import toast from "react-hot-toast";
import useChatStore from "../../../Store/useChatStore";

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
      <DropdownMenu
        className="bg-white p-2 shadow rounded-md"
        aria-label="Dropdown menu with icons"
        variant="flat"
        disabledKeys={[userListTab]}
      >
        <DropdownItem
          className="border mb-1 hover:!text-primary text-[#64748B]"
          key="Spam"
          startContent={<RiSpam3Fill className="text-[16px]" />}
          onPress={() => updateCategory("Spam")}
        >
          Move to Spam
        </DropdownItem>
        <DropdownItem
          className="border mb-1 hover:!text-primary text-red-600"
          key="Delete Chat"
          startContent={<RiDeleteBin6Line className="text-[16px]" />}
          onPress={() => deleteChat()}
        >
          Delete Chat
        </DropdownItem>
        <DropdownItem
          className="border mb-1 hover:!text-primary text-[#64748B]"
          key="Follow Up"
          startContent={<CiStar className="text-[18px]" />}
          onPress={() => updateCategory("Follow Up")}
        >
          Mark as follow up
        </DropdownItem>
        <DropdownItem
          className="border mb-1 hover:!text-primary text-[#64748B]"
          key="Unread"
          startContent={<IoMailUnreadOutline className="text-[16px]" />}
          onPress={() => updateCategory("Unread")}
        >
          Mark as unread
        </DropdownItem>
        <DropdownItem
          className="border mb-1 hover:!text-primary text-[#64748B]"
          key="Done"
          startContent={
            <IoCheckmarkDoneCircleOutline className="text-[18px]" />
          }
          onPress={() => updateCategory("Done")}
        >
          Move to done
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};

export default ChatAction;
