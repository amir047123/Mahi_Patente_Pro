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
import { CalendarIcon, ListFilter, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import prevImg from "@/assets/AdminDashboard/demo-prev.svg";

const AdminDashboardChooseTheSignalQuestions = () => {
  const [searchText, setSearchText] = useState("");

  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const quizData = [
    {
      id: "#001",
      img: prevImg,
      quizQuestion: "Guess the signal",
      correctAnswer: "Supplementary Panel",
      options:
        "Supplementary Panel, Mandatory Sign, Indicator Sign, Danger Sign",
      lastUpdate: "16 Feb 2025, 12:30 PM",
    },
  ];
  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[
          { name: "Guess the Signal", path: "quiz-manage/guess-the-signal" },
        ]}
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
              Sort by Level
            </span>
          </button>

          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block min-w-[150px] max-w-xs w-full py-2 pl-8 pr-3 text-sm text-gray-700 bg-transparent  border border-gray-200 rounded-full  focus:outline-none "
              placeholder="Find Quiz Question"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin-dashboard/quiz-manage/choose-4-to-1/add-choose-4-to-1"
            className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90"
          >
            Add Choose 4 to 1 Signal Question
          </Link>
        </div>
      </HorizontalScroll>

      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#EAF2FA] rounded-full ">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap  uppercase tracking-wider">
                Quiz ID
              </th>

              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Quiz Question
              </th>

              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Correct Image
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Image Options
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Last Update
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quizData.map((quiz, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {quiz.id}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText line-clamp-2">
                  {quiz.quizQuestion}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText whitespace-nowrap">
                  <img className="w-16 rounded-lg" src={quiz?.img} alt="" />
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText font-medium ">
                  <div className="flex gap-1">
                    <img className="w-16 rounded-lg" src={quiz?.img} alt="" />
                    <img className="w-16 rounded-lg" src={quiz?.img} alt="" />
                    <img className="w-16 rounded-lg" src={quiz?.img} alt="" />
                    <img className="w-16 rounded-lg" src={quiz?.img} alt="" />
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {quiz.lastUpdate}
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText flex justify-center gap-5">
                  <button className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>{" "}
                  </button>
                  <button className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
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

export default AdminDashboardChooseTheSignalQuestions;
