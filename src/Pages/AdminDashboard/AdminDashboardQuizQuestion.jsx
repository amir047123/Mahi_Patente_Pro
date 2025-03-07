import Typography from "@/Components/Typography";
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
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import img from "@/assets/UserDashboard/demo-chapeter-img.svg";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import AdminEditQuizQuestionModal from "./AdminEditQuizQuestionModal";
import Spinner from "@/Components/ui/Spinner";

const AdminDashboardQuizQuestion = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const { subject } = useParams();
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Chapters", path: "quiz-manage/chapters" },
  ]);

  const { useFetchEntities } = useCrudOperations("quiz");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities({ subject: subject });

  useEffect(() => {
    if (isSuccess && response?.success) {
      setBreadCrumbData([
        { name: "Chapters", path: "quiz-manage/chapters" },
        {
          name: `${response?.data?.chapter?.name}`,
          path: `quiz-manage/chapters/${response?.data?.chapter?._id}`,
        },
        {
          name: `${response?.data?.subject?.name}`,
          path: `quiz-manage/chapters/${response?.data?.chapter?._id}/${response?.data?.subject?._id}`,
        },
      ]);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  useEffect(() => {
    if (!isEditModalOpen) {
      setItem(null);
    }
  }, [isEditModalOpen]);

  return (
    <>
      <DashboardBreadcrumb role="admin" items={breadCrumbData} />

      <div className=" gap-4 flex items-center justify-between py-5 border-b mb-5">
        <div className="gap-4 flex items-center">
          <img
            className="h-[100px] object-cover rounded-xl"
            src={response?.data?.subject?.image || img}
            alt="image"
          />

          <div>
            <Typography.Body variant="medium" className="text-secondary">
              Chapter {response?.data?.chapter?.order} :{" "}
              {response?.data?.chapter?.name}
            </Typography.Body>
            <Typography.Heading4
              className="text-primaryText leading-7 mt-2 line-clamp-1"
              variant="semibold"
            >
              {response?.data?.subject?.name}
            </Typography.Heading4>
            <p className="text-secondaryText text-sm mt-2">
              12 Quiz Questions Added on this Subject
            </p>
          </div>
        </div>

        <Link
          to={`/admin-dashboard/quiz-manage/chapters/${response?.data?.chapter?._id}/${response?.data?.subject?._id}/add-quiz`}
          className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90"
        >
          Add Quiz Question
        </Link>
      </div>

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
          <button className="flex items-center gap-2 px-4 py-2 text-gray-500  border-gray-200 rounded-full border">
            <ListFilter size={18} />
            <span className="text-sm font-medium whitespace-nowrap">
              Quiz Type
            </span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-grow mx-6">
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
      </HorizontalScroll>

      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#EAF2FA] rounded-full ">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap  uppercase tracking-wider">
                Quiz ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Quiz Image
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Quiz Question
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Difficulty
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Answer
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
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center">
                  <div className="flex items-center justify-center">
                    <Spinner size={40} />
                  </div>
                </td>
              </tr>
            ) : response?.data?.questions?.length > 0 ? (
              response?.data?.questions?.map((quiz, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText whitespace-nowrap">
                    <img
                      src={quiz?.media?.image}
                      alt="quiz question"
                      className="h-10 w-full object-scale-down"
                    />
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText line-clamp-2">
                    {quiz?.question}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {quiz?.meta?.difficulty}
                  </td>
                  <td className="py-4 px-4 text-sm text-green-600 font-medium">
                    {quiz?.correctAnswer === "0" ? "True" : "False"}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText text-center">
                    <span className="block">
                      {new Date(quiz?.updatedAt)?.toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>
                      {new Date(quiz?.updatedAt)?.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText flex justify-center gap-5">
                    <button
                      onClick={() => {
                        setItem(quiz);
                        setIsEditModalOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
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
              ))
            ) : (
              <tr className="">
                <td colSpan={7} className="py-4 text-center !text-sm">
                  No Question Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-10">
          <ItemPerPage />
          <PaginationCompo />
        </div>

        <AdminEditQuizQuestionModal
          item={item}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
        />
      </div>
    </>
  );
};

export default AdminDashboardQuizQuestion;
