import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { ListFilter, Search } from "lucide-react";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AdminChapterCard from "@/Components/AdminDashboard/AdminChapterCard";
import HorizontalScroll from "@/Shared/HorizontalScroll";
import AdminAddChapterCard from "@/Components/AdminDashboard/AdminAddChapterCard";
import { useParams } from "react-router-dom";
import Typography from "@/Components/Typography";
import img from "@/assets/UserDashboard/demo-chapeter-img.svg";
import AdminSubjectCard from "@/Components/AdminDashboard/AdminSubjectCard";
import AdminAddSubjectModal from "./AdminAddSubjectModal";

const AdminDashboardChapterDetails = () => {
    const {id}=useParams();
  const [searchText, setSearchText] = useState("");

  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[
          { name: "Chapters", path: "quiz-manage/chapters" },
          { name: "Details", path: id },
        ]}
      />

      <div className=" gap-4 flex items-center justify-between py-5 border-b mb-5">
        <div className="gap-4 flex items-center">
          <img
            className="h-[100px] object-cover rounded-xl"
            src={img}
            alt="image"
          />

          <div>
            <Typography.Body variant="medium" className="text-secondaryText">
              Chapter 1
            </Typography.Body>
            <Typography.Heading4
              className="text-primaryText leading-7 mt-2 line-clamp-1"
              variant="semibold"
            >
              Road, vehicles, driver duties
            </Typography.Heading4>
            <p className="text-secondaryText text-sm mt-2">
              5 Subject - 18 Question
            </p>
          </div>
        </div>

        <AdminAddSubjectModal>
          <button className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
            Add a Subject
          </button>
        </AdminAddSubjectModal>
      </div>

      <HorizontalScroll className="flex gap-5 items-center justify-between w-full my-5 bg-white p-5 rounded-2xl border">
        <Typography.Heading4
          className="text-primaryText leading-7 "
          variant="semibold"
        >
          Subjects
        </Typography.Heading4>
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
              Sort by A-Z
            </span>
          </button>

          {/* Search Input */}
          <div className="relative flex-grow mx-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block min-w-[150px] max-w-xs w-full py-2 pl-8 pr-3 text-sm text-gray-700 bg-transparent  border border-gray-200 rounded-full  focus:outline-none "
              placeholder="Find Chapter"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </HorizontalScroll>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
        <AdminSubjectCard />
        <AdminSubjectCard />
        <AdminSubjectCard />
        <AdminSubjectCard />

        <AdminAddChapterCard />
      </div>
    </>
  );
};

export default AdminDashboardChapterDetails;
