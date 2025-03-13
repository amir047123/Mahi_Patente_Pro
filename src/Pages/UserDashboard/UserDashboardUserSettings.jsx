import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import HorizontalScroll from "@/Shared/HorizontalScroll";
import { useState } from "react";
import ProfileSettings from "./UserSettings/ProfileSettings";
import { useAuthContext } from "@/Context/AuthContext";
import AddressSettings from "./UserSettings/AddressSettings";
import AccountSettings from "./UserSettings/AccountSettings";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { baseURL } from "@/Config";

/*
{
    "auth": {
        "email": "techdevshimul@gmail.com",
        "phone": "01798406411"
    },
    "profile": {
        "name": "Shimul Hossain",
        "role": "user",
        "isOnline": false
    },
    "_id": "67baebb0359fbd8c03e15475",
    "additionalInfo": [],
    "createdAt": "2025-02-23T09:34:40.374Z",
    "updatedAt": "2025-03-13T11:30:20.160Z",
    "__v": 0,
    "id": "67baebb0359fbd8c03e15475"
}
*/

const UserDashboardUserSettings = () => {
  const query = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");
  const { backupUser, setBackupUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(backupUser);
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/user/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setBackupUser((prev) => {
        return { ...prev, ...data };
      });

      toast.success(responseData?.message);
      query.invalidateQueries({
        queryKey: ["user/users"],
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "User Settings", path: "settings" }]}
      />

      <div className="w-full bg-white lg:p-10 p-5 mt-5 rounded-2xl min-h-[500px]">
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <HorizontalScroll>
            <TabsList className="w-full flex justify-between bg-white border-b">
              <TabsTrigger
                value="profile"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "address"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                Address
              </TabsTrigger>
              <TabsTrigger
                value="account"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "account"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                Account
              </TabsTrigger>
            </TabsList>
          </HorizontalScroll>

          <ProfileSettings
            user={backupUser}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
          <AddressSettings
            user={backupUser}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
          <AccountSettings
            user={backupUser}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </Tabs>
      </div>
    </>
  );
};

export default UserDashboardUserSettings;
