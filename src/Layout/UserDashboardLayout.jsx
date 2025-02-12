import { SidebarProvider } from "@/components/ui/sidebar";
import { UserDashboardSidebar } from "@/Components/UserDashboard/UserDashboardSidebar";

export default function UserDashboardLayout({ children }) {
  return (
    <SidebarProvider className="w-full ">
      <UserDashboardSidebar />
        
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
