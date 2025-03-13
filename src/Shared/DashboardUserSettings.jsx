import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import HorizontalScroll from "@/Shared/HorizontalScroll";
import { useState } from "react";
import ProfileSettings from "../Pages/UserDashboard/UserSettings/ProfileSettings";
import { useAuthContext } from "@/Context/AuthContext";
import AddressSettings from "../Pages/UserDashboard/UserSettings/AddressSettings";
import AccountSettings from "../Pages/UserDashboard/UserSettings/AccountSettings";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { baseURL } from "@/Config";

const DashboardUserSettings = () => {
  const query = useQueryClient();
  const [activeTab, setActiveTab] = useState("profile");
  const { backupUser, setBackupUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
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
        body: JSON.stringify({
          ...data,
          auth: { ...data?.auth, email: undefined },
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setBackupUser((prev) => {
        return {
          ...prev,
          auth: {
            ...prev?.auth,
            ...data?.auth,
          },
          profile: {
            ...prev?.profile,
            ...data?.profile,
          },
          address: {
            ...prev?.address,
            ...data?.address,
          },
        };
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
        role={backupUser?.profile?.role}
        items={[
          {
            name: "Settings",
            path: "settings",
          },
        ]}
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

export default DashboardUserSettings;
