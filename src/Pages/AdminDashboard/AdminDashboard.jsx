import AdminDashboardHeader from "@/Components/AdminDashboard/AdminDashboardHeader";
import AdminDashboardLayout from "@/Layout/AdminDashboardLayout";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <AdminDashboardLayout>
        <AdminDashboardHeader />
        <div className="max-w-screen-max_screen mx-auto w-[97%] py-4">
          
            <Outlet />
          
        </div>
      </AdminDashboardLayout>
    </div>
  );
}
