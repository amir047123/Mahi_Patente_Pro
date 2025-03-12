import { AdminDashboardSidebar } from "@/Components/AdminDashboard/AdminDashboardSidebar";
import { SidebarProvider } from "@/Components/ui/sidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <SidebarProvider className="w-full ">
      <AdminDashboardSidebar />

      <main className="w-full bg-[#ECF2F8]">{children}</main>
    </SidebarProvider>
  );
}
