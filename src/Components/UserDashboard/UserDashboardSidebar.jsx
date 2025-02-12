import { Calendar,  Inbox, LayoutDashboard, Search, Settings } from "lucide-react";
import logo from "@/assets/Navbar/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/user-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
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
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">Eric Frusciante</strong>

              <span> eric@frusciante.com </span>
            </p>
          </div>
        </a>
      </div>
    </Sidebar>
  );
}
