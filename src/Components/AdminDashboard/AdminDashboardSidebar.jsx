import {
  Captions,
  ChevronDown,
  CircleHelp,
  Grid2x2Check,
  LayoutDashboard,
  List,
  ListTodo,
  MessageCircleQuestion,
  Signpost,
} from "lucide-react";
import logo from "@/assets/Navbar/logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useAuthContext } from "@/Context/AuthContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    url: "/admin-dashboard/categories",
    icon: ListTodo,
  },
  // {
  //   title: "Chapters",
  //   url: "/admin-dashboard/chapter",
  //   icon: List,
  // },
  {
    title: "Quiz Manage",
    url: "/admin-dashboard/quiz-manage",
    dropdown: true,
    icon: CircleHelp,
    dropdownItem: [
      {
        title: "Add Quiz",
        url: "/admin-dashboard/quiz-manage/add-quiz",
        icon: MessageCircleQuestion,
      },
      {
        title: "Chapters",
        url: "/admin-dashboard/quiz-manage/chapters",
        icon: List,
      },
      {
        title: "Guess the Signal",
        url: "/admin-dashboard/quiz-manage/guess-the-signal",
        icon: Signpost,
      },
      {
        title: "Choose 4 to 1",
        url: "/admin-dashboard/quiz-manage/choose-4-to-1",
        icon: Grid2x2Check,
      },
      {
        title: "Subjects",
        url: "/admin-dashboard/quiz-manage/subjects",
        icon: Captions,
      },
    ],
  },
];

export function AdminDashboardSidebar() {
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[2];
  const dropdownPath = pathname.split("/")[3];
  const { logout } = useAuthContext();
  const [quizManageDropdown, setQuizManageDropdown] = useState(false);

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
              {items.map((item) =>
                item?.dropdown ? (
                  <Collapsible key={item?.title} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={() =>
                            setQuizManageDropdown(!quizManageDropdown)
                          }
                          className={`hover:bg-[#EBF2FB] py-2.5 px-3 rounded-sm text-secondaryText hover:text-secondary h-10 ${
                            currentPath === item.url.split("/")[2] &&
                            "text-secondary bg-[#EBF2FB]"
                          }`}
                        >
                          <div className="flex items-center gap-2 justify-between w-full">
                            <div className="flex items-center gap-2">
                              <item.icon className="size-4" />
                              <span className="text-[16px] ml-1.5 font-medium ">
                                {item?.title}
                              </span>
                            </div>
                            <ChevronDown
                              className={`size-5 ${
                                quizManageDropdown && "rotate-180"
                              }`}
                            />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="mt-2">
                          {item?.dropdownItem?.map((i, index) => (
                            <Link key={index + 1} to={`${i?.url}`}>
                              <SidebarMenuSubItem
                                as={Link}
                                className={`hover:bg-[#EBF2FB] py-1.5 px-1.5 rounded-sm text-secondaryText hover:text-secondary ${
                                  dropdownPath === i?.url.split("/")[3] &&
                                  "text-secondary bg-[#EBF2FB]"
                                }`}
                              >
                                <div className="flex items-center gap-1 ">
                                  <i.icon className="size-3.5" />
                                  <span className="text-[14px] ml-1.5 font-medium ">
                                    {i?.title}
                                  </span>
                                </div>
                              </SidebarMenuSubItem>
                            </Link>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <Link key={item.title} to={item.url}>
                    <SidebarMenuItem
                      className={`hover:bg-[#EBF2FB]   py-2.5 px-3 rounded-sm text-secondaryText hover:text-secondary ${
                        currentPath === item.url.split("/")[2] &&
                        "text-secondary bg-[#EBF2FB] "
                      }`}
                      key={item.title}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span className="text-[16px] ml-1.5 font-medium ">
                          {item.title}
                        </span>
                      </div>
                    </SidebarMenuItem>
                  </Link>
                )
              )}
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
          key="Logout"
        >
          <button
            onClick={logout}
            className="flex items-center gap-2"
            to="logout"
          >
            <MdOutlineLogout />
            <span className="text-[16px] ml-1.5 font-medium ">Logout</span>
          </button>
        </SidebarMenuItem>
      </div>
    </Sidebar>
  );
}
