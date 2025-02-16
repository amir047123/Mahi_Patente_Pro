import {
  LayoutDashboard,
  List,
  MessageCircleQuestion,
} from "lucide-react";
import logo from "@/assets/Navbar/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/user-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Theory",
    url: "/user-dashboard/theory",
    icon: List,
  },
  {
    title: "Quiz",
    url: "/user-dashboard/quiz",
    icon: MessageCircleQuestion,
  },
  
];

export function UserDashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="h-16 border-b">
            <div className="flex items-center gap-2 w-fit mx-auto">
              <img className="w-10" src={logo} alt="logo" />
              <Link to="/">
                <p className="text-lg font-bold text-gray-900 font-mono">
                  Mahi
                </p>

                <div className="flex">
                  <p className="text-lg font-bold bg-gradient text-transparent bg-clip-text font-mono -mt-1.5">
                    Patente{" "}
                  </p>
                  <p className="text-gray-600 -mt-4 font-semibold">Pro</p>
                </div>
              </Link>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3 ">
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem
                  className="hover:bg-[#EBF2FB]   py-2.5 px-3 rounded-sm text-secondaryText hover:text-secondary"
                  key={item.title}
                >
                  <Link className="flex items-center gap-2" to={item.url}>
                    <item.icon className="size-4" />
                    <span className="text-[16px] ml-1.5 font-medium ">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <SidebarMenuItem
          className="hover:bg-[#EBF2FB]  py-2.5 px-3  flex rounded-sm text-secondaryText hover:text-secondary"
          key="Settings"
        >
          <Link className="flex items-center gap-2" to="settings">
            <IoSettingsOutline className="" />
            <span className="text-[16px] ml-1.5 font-medium ">Settings</span>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem
          className="hover:bg-[#EBF2FB]  py-2.5 px-3  flex rounded-sm text-secondaryText hover:text-secondary"
          key="Settings"
        >
          <Link className="flex items-center gap-2" to="settings">
            <MdOutlineLogout />
            <span className="text-[16px] ml-1.5 font-medium ">Logout</span>
          </Link>
        </SidebarMenuItem>
      </div>
    </Sidebar>
  );
}
