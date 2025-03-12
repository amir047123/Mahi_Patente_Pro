import { SidebarProvider } from "@/Components/ui/sidebar";
import { UserDashboardSidebar } from "@/Components/UserDashboard/UserDashboardSidebar";

export default function UserDashboardLayout({ children }) {
  return (
    <SidebarProvider className="w-full ">
      <UserDashboardSidebar />

      <main className="w-full bg-[#ECF2F8]">{children}</main>
    </SidebarProvider>
  );
}
