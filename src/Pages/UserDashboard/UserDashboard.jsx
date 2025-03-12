import UserDashboardHeader from "@/Components/UserDashboard/UserDashboardHeader";
import UserDashboardLayout from "@/Layout/UserDashboardLayout";
import { Outlet } from "react-router-dom";


export default function UserDashboard() {
  return (
    <div>
      <UserDashboardLayout>
        <UserDashboardHeader />
        <div className="max-w-screen-max_screen mx-auto w-[97%] py-4">
          <Outlet />
        </div>
      </UserDashboardLayout>
    </div>
  );
}
