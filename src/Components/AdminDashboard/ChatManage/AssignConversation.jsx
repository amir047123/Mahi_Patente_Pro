import logo from "@/assets/Navbar/logo.svg";
import { useEffect, useState } from "react";
import { baseURL } from "@/Config";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import { PopoverContent } from "@/Components/ui/popover";

const AssignConversation = ({
  isOpen,
  setIsOpen,
  allAdmins,
  chat,
  refetch,
}) => {
  const [assignedAdmin, setAssignedAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAssignedAdmin(chat?.admin?._id);
  }, [chat]);

  const handleAssign = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/chat/assign`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: chat?._id,
          assignedUser: assignedAdmin,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign conversation");
      }

      setIsOpen(!isOpen);
      refetch();
      toast.success("Conversation assigned successfully!");
    } catch (error) {
      toast.error(error.message || "Error assigning conversation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopoverContent className="max-w-md p-7 bg-white shadow">
      <label className="text-[16px] font-semibold block mb-3 mr-auto">
        Assign to
      </label>

      <select
        className="w-[300px]"
        placeholder="Select someone from your business"
      >
        {allAdmins.map((admin) => (
          <option
            key={admin._id}
            value={admin._id}
            onClick={() => setAssignedAdmin(admin._id)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            selected={admin._id === assignedAdmin}
            style={{
              backgroundColor:
                admin._id === assignedAdmin ? "#f0f0f0" : "transparent",
            }}
          >
            <img
              src={admin?.profile?.profilePicture || logo}
              alt="img"
              className="w-10 rounded-full"
            />{" "}
            {admin?.profile?.username}
          </option>
        ))}
      </select>

      <div className="mt-5 flex items-center w-full gap-5">
        <button
          className="bg-transparent border-2 hover:border-red-400 hover:bg-red-50 px-5 py-2 rounded-lg text-red-600 w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          className="w-full bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? <Spinner size={24} /> : "Assign"}
        </button>
      </div>
    </PopoverContent>
  );
};

export default AssignConversation;
