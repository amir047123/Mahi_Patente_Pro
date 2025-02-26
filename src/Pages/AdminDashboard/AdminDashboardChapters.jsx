import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useQueryClient } from "@tanstack/react-query";
import { ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import AdminAddChapterModal from "./AdminAddChapterModal";

const AdminDashboardChapters = () => {
    const [searchText, setSearchText] = useState("");
  const query = useQueryClient();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { useFetchEntities } = useCrudOperations("quiz-category/all");

  const methods = useForm();
  const { handleSubmit, reset, setValue } = methods;

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities();

  useEffect(() => {
    if (isSuccess && response?.success) {
      const category = response?.data?.map((item) => ({
        key: item?._id,
        label: item?.name,
      }));
      setCategoryOptions(category);
    }
  }, [isSuccess, response, setValue]);

  useEffect(() => {
    if (categoryOptions.length > 0) {
      const theoryCategory = categoryOptions?.find(
        (item) => item?.label?.toLowerCase() === "theory"
      );
      setValue("category", theoryCategory?.key);
    }
  }, [categoryOptions, setValue]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const { createEntity } = useCrudOperations("quiz-chapter/create");

  const onSubmit = (formData) => {
    createEntity.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["quiz-chapter/all"],
        });
        // reset();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const statusOptions = [
    { key: "Active", label: "Active" },
    { key: "Inactive", label: "Inactive" },
  ];

   const [date, setDate] = useState({
     from: new Date(2022, 0, 20),
     to: addDays(new Date(2022, 0, 20), 20),
   });


  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Chapters", path: "chapter" }]}
      />

      <div className="flex items-center justify-between w-full my-5 bg-white p-5 rounded-2xl border">
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
                    <span>Pick a date</span>
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
            <span className="text-sm font-medium">Sort by A-Z</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-grow mx-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full py-2 pl-8 pr-3 text-sm text-gray-700 bg-transparent  border border-gray-200 rounded-full  focus:outline-none "
            placeholder="Find Chapter"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Add Chapter Button */}
        <AdminAddChapterModal/>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <CustomInput
              name="name"
              placeholder="Chapter Title"
              label="Chapter Title"
            />
            <CustomInput
              type="number"
              name="order"
              placeholder="Chapter Number"
              label="Chapter Number"
            />

            <div className="col-span-2 grid grid-cols-3 gap-6">
              <CustomSelect
                name="category"
                label="Select Category"
                options={categoryOptions}
                placeholder="Select Category"
                isEditable={false}
              />

              <CustomImageUpload
                name="image"
                label="Upload Image"
                placeholder="Upload Image"
              />

              <CustomSelect
                name="status"
                label="Select Status"
                options={statusOptions}
                placeholder="Select Status"
              />
            </div>

            <div className="col-span-2">
              <CustomInput
                type="textarea"
                rows={3}
                name="description"
                placeholder="Chapter Description"
                label="Chapter Description"
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 rounded-full text-white font-semibold text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdminDashboardChapters;
