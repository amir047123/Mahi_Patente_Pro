import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Calendar } from "@/Components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import AdminAddChapterModal from "./AdminAddChapterModal";
import AdminChapterCard from "@/Components/AdminDashboard/AdminChapterCard";
import HorizontalScroll from "@/Shared/HorizontalScroll";
import AdminAddChapterCard from "@/Components/AdminDashboard/AdminAddChapterCard";
import toast from "react-hot-toast";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import WarningModal from "@/Shared/WarningModal";

const AdminDashboardChapters = () => {
  const [searchText, setSearchText] = useState("");

  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [isWarningModalOpen, setIsWarningModalOpen] = useState("");
  const [isDeletingSuccess, setIsDeletingSuccess] = useState(false);
  const [itemIndex, setItemIndex] = useState(-1);

  const query = useQueryClient();

  const { deleteEntity } = useCrudOperations("quiz-chapter");

  const handleDelete = async () => {
    const deleteId = response?.data?.[itemIndex]?._id;

    deleteEntity.mutate(deleteId, {
      onSuccess: (updatedData) => {
        toast.success(updatedData?.message);
        setIsDeletingSuccess(true);
        query.invalidateQueries({
          queryKey: ["quiz-chapter/all"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const { useFetchEntities } = useCrudOperations("quiz-chapter/all");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities();

  useEffect(() => {
    if (isSuccess && response?.success) {
      console.log(response?.data);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <WarningModal
        onConfirm={handleDelete}
        isOpen={isWarningModalOpen}
        setIsOpen={() => {
          setItemIndex(-1);
          setIsWarningModalOpen(false);
          setIsDeletingSuccess(false);
        }}
        isDeleting={deleteEntity.isPending}
        success={isDeletingSuccess}
        closeSuccess={() => {
          setItemIndex(-1);
          setIsDeletingSuccess(false);
        }}
        msg="SUC200 - Chapter Deleted Successfully"
        desc="You are about to delete this chapter with its subjects and questions permanently."
        refetchData={() => {}}
      />

      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Chapters", path: "quiz-manage/chapters" }]}
      />

      <HorizontalScroll className="flex items-center justify-between w-full my-5 bg-white p-5 rounded-2xl border">
        <div className="flex items-center gap-3">
          {/* Date Range Button */}
          <div className={cn("grid gap-2")}>
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
        </div>

        {/* Search Input */}
        <div className="relative flex-grow mx-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block min-w-[150px] w-full py-2 pl-8 pr-3 text-sm text-gray-700 bg-transparent  border border-gray-200 rounded-full  focus:outline-none "
            placeholder="Find Chapter"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Add Chapter Button */}
        <AdminAddChapterModal>
          <span className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
            Add a Chapter
          </span>
        </AdminAddChapterModal>
      </HorizontalScroll>

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
        {response?.data?.map((item, index) => (
          <AdminChapterCard
            key={index}
            item={item}
            index={index}
            setItemIndex={setItemIndex}
            setIsWarningModalOpen={setIsWarningModalOpen}
          />
        ))}
        <AdminAddChapterCard />
      </div>
    </>
  );
};

export default AdminDashboardChapters;
