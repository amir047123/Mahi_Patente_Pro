import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import HorizontalScroll from "@/Shared/HorizontalScroll";
import { useState } from "react";
import ProfileSettings from "./UserSettings/ProfileSettings";
import { useAuthContext } from "@/Context/AuthContext";
import AddressSettings from "./UserSettings/AddressSettings";
import AccountSettings from "./UserSettings/AccountSettings";

const UserDashboardUserSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuthContext();
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

          <ProfileSettings user={user} />
          <AddressSettings user={user} />
          <AccountSettings user={user} />
        </Tabs>
      </div>
    </>
  );
};

export default UserDashboardUserSettings;
