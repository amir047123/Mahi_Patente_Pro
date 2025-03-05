import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import HorizontalScroll from "@/Shared/HorizontalScroll";
import { addDays, format } from "date-fns";
import { CalendarIcon, ListFilter, Search, UserRoundPen } from "lucide-react";
import { useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import demoUser from "@/assets/AdminDashboard/demo-user.svg";
import { Link } from "react-router-dom";

const AdminDashboardUsersManage = () => {
  const [searchText, setSearchText] = useState("");

  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const userData = [
    {
      id: 1,
      img: demoUser,
      name: "Ashikul islam ifty",
      email: "ifty@gmail.com",
      joinedDate: "16 Feb 2025",
      progress: "86%",
      lastLogin: "04-Mar-2025",
    },
    {
      id: 2,
      img: demoUser,
      name: "Ashikul islam ifty",
      email: "ifty@gmail.com",
      joinedDate: "16 Feb 2025",
      progress: "86%",
      lastLogin: "04-Mar-2025",
    },
  ];
  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Users Manage", path: "users-manage" }]}
      />

      <HorizontalScroll className="flex gap-5 items-center justify-between w-full my-5 bg-white p-5 rounded-2xl border">
        <div className="flex items-center gap-3">
          {/* Date Range Button */}

          <div className={cn("grid gap-2 ")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-[250px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span className="whitespace-nowrap">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Sort Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-gray-500  border-gray-200 rounded-full border">
            <ListFilter size={18} />
            <span className="text-sm font-medium whitespace-nowrap">
              Sort by progress
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block min-w-[150px] max-w-xs w-full py-2 pl-8 pr-3 text-sm text-gray-700 bg-transparent  border border-gray-200 rounded-full  focus:outline-none "
              placeholder="Find User"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </HorizontalScroll>

      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#EAF2FA] rounded-full ">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap  uppercase tracking-wider">
                User ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Profile Image
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Joined On
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Progress(%)
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Last Login
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {userData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b">
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {user.id}
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText whitespace-nowrap">
                  <img className="w-10 rounded-full" src={user?.img} alt="" />
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText ">
                  {user.name}
                </td>
                <td className="py-4 px-4 text-sm text-green-600 ">
                  {user.email}
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText font-medium">
                  {user.joinedDate}
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {user.progress}
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {user.lastLogin}
                </td>
                <td className="py-4 px-4 text-sm text-blue-600 flex justify-center gap-2">
                  <Link className="flex gap-2 items-center" to={`/admin-dashboard/users-manage/${user.id}`}>
                    <UserRoundPen size={20} /> View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-10">
          <ItemPerPage />
          <PaginationCompo />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardUsersManage;
