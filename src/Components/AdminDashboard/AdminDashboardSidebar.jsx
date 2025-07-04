import {
  BadgePercent,
  BellRing,
  // Captions,
  ChevronDown,
  CircleHelp,
  Grid2x2Check,
  Keyboard,
  LayoutDashboard,
  List,
  // ListTodo,
  MessageCircleQuestion,
  // MonitorCog,
  Signpost,
  UserCog,
  BrickWall,
  SearchCode,
  Rss,
  StickyNote
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
  useSidebar,
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
  // {
  //   title: "Categories",
  //   url: "/admin-dashboard/categories",
  //   icon: ListTodo,
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
      // {
      //   title: "Subjects",
      //   url: "/admin-dashboard/quiz-manage/subjects",
      //   icon: Captions,
      // },
    ],
  },
  {
    title: "Users Manage",
    url: "/admin-dashboard/users-manage",
    icon: UserCog,
  },
  // {
  //   title: "Quiz Configuration",
  //   url: "/admin-dashboard/quiz-configuration",
  //   icon: MonitorCog,
  // },
  {
    title: "Subscription Manage",
    url: "/admin-dashboard/subscription-manage",
    icon: BadgePercent,
  },
  {
    title: "Activation Manage",
    url: "/admin-dashboard/activation-manage",
    icon: Keyboard,
  },
  {
    title: "Notification Manage",
    url: "/admin-dashboard/notification-manage",
    icon: BellRing,
  },
  {
    title: "Chat Manage",
    url: "/admin-dashboard/chat-manage",
    icon: MessageCircleQuestion,
  },


  {
    title: "Customization",
    url: "/admin-dashboard/customization",
    dropdown: true,
    icon: BrickWall,
    dropdownItem: [
      {
        title: "SEO Settings",
        url: "/admin-dashboard/customization/seo-settings",
        icon: SearchCode,
      },

    ],
  },
  {
    title: "Blogs",
    url: "/admin-dashboard/blogs",
    dropdown: true,
    icon: Rss,
    dropdownItem: [
      {
        title: "Posts",
        url: "/admin-dashboard/blogs/posts",
        icon: StickyNote,
      },
      {
        title: "Category",
        url: "/admin-dashboard/blogs/category",
        icon: StickyNote,
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
  const [blogsDropdown, setBlogsDropdown] = useState(false);
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
              {items.map((item) =>
                item?.dropdown ? (
                  <Collapsible key={item?.title} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => {
                            if (item?.title === "Blogs") {
                              setBlogsDropdown(!blogsDropdown)
                            } else {

                              setQuizManageDropdown(!quizManageDropdown)
                            }
                          }
                          }
                          className={`hover:bg-[#EBF2FB] py-2.5 px-3 rounded-sm text-secondaryText hover:text-secondary h-10 ${currentPath === item.url.split("/")[2] &&
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
              {
                              item?.title === "Blogs" ? <ChevronDown
                                className={`size-5 ${blogsDropdown && "rotate-180"}`}
                              /> : <ChevronDown
                                className={`size-5 ${quizManageDropdown && "rotate-180"}`}
                              />
              }
                          
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="mt-2">
                          {item?.dropdownItem?.map((i, index) => (
                            <Link
                              onClick={() => setOpenMobile(false)}
                              key={index + 1}
                              to={`${i?.url}`}
                            >
                              <SidebarMenuSubItem
                                as={Link}
                                className={`hover:bg-[#EBF2FB] py-1.5 px-1.5 rounded-sm text-secondaryText hover:text-secondary ${dropdownPath === i?.url.split("/")[3] &&
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
                  <Link
                    onClick={() => setOpenMobile(false)}
                    key={item.title}
                    to={item.url}
                  >
                    <SidebarMenuItem
                      className={`hover:bg-[#EBF2FB]   py-2.5 px-3 rounded-sm text-secondaryText hover:text-secondary ${currentPath === item.url.split("/")[2] &&
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
        <Link
          className="flex items-center gap-2 w="
          to="/admin-dashboard/settings"
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
