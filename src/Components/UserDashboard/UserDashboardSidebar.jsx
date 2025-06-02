import {
  Bookmark,
  History,
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
  useSidebar,
} from "@/Components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useAuthContext } from "@/Context/AuthContext";
import { FaWhatsapp } from "react-icons/fa6";

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
  {
    title: "History",
    url: "/user-dashboard/history",
    icon: History,
  },
  {
    title: "Bookmarks",
    url: "/user-dashboard/bookmarks",
    icon: Bookmark,
  },
];

export function UserDashboardSidebar() {
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[2];
  const { logout } = useAuthContext();
  const { setOpenMobile } = useSidebar();

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
                <Link
                  onClick={() => setOpenMobile(false)}
                  key={item.title}
                  to={item.url}
                >
                  <SidebarMenuItem
                    className={`hover:bg-[#EBF2FB]   py-2.5 px-3 rounded-sm text-secondaryText hover:text-secondary ${
                      currentPath === item.url.split("/")[2] &&
                      "text-secondary bg-[#EBF2FB] "
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span className="text-[16px] ml-1.5 font-medium ">
                        {item.title}
                      </span>
                    </div>
                  </SidebarMenuItem>
                </Link>
              ))}

              <a target="_blank"
                href="https://wa.me/+393511032106"
                onClick={() => setOpenMobile(false)}
               
              >
                <SidebarMenuItem
                  className={`hover:bg-[#EBF2FB]   py-2.5 px-3 rounded-sm text-secondaryText hover:text-secondary `}
                >
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="text-[1rem]" />
                    <span className="text-[16px] ml-1.5 font-medium ">
                      Support
                    </span>
                  </div>
                </SidebarMenuItem>
              </a>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <Link
          className="flex items-center gap-2 w="
          to="/user-dashboard/settings"
        >
          <SidebarMenuItem
            className="hover:bg-[#EBF2FB]  py-2.5 px-3  flex rounded-sm text-secondaryText hover:text-secondary w-full"
            key="Settings"
          >
            <div className="flex items-center gap-2">
              <IoSettingsOutline className="" />
              <span className="text-[16px] ml-1.5 font-medium ">Settings</span>
            </div>
          </SidebarMenuItem>
        </Link>
        <SidebarMenuItem
          className="hover:bg-[#EBF2FB]  py-2.5 px-3  flex rounded-sm text-secondaryText hover:text-secondary cursor-pointer"
          key="Logout"
          onClick={logout}
          tabIndex={0}
        >
          <div className="flex items-center gap-2">
            <MdOutlineLogout />
            <span className="text-[16px] ml-1.5 font-medium ">Logout</span>
          </div>
        </SidebarMenuItem>
      </div>
    </Sidebar>
  );
}
