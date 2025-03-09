import { cn } from "@/lib/utils";
import HorizontalScroll from "./HorizontalScroll";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { CalendarIcon, ListFilter, Search } from "lucide-react";
import { Calendar } from "@/Components/ui/calendar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

const FilterComponent = ({ fields, onChange }) => {
    const [date, setDate] = useState({
      from: new Date(),
      to: addDays(new Date(), 20),
    });
  const [filters, setFilters] = useState({});

   const handleInputChange = (name, value) => {
     setFilters((prev) => ({ ...prev, [name]: value }));
   };

     useEffect(() => {
       onChange({...filters,dateRange:date});
     }, [filters]);

  return (
    <HorizontalScroll
      className={`flex gap-5 items-center w-full my-5 bg-white p-5 rounded-2xl border `}
    >
      {fields.map((field) => (
        <>
          {" "}
          <div key={field?.name} className="flex items-center gap-3">
            <div className="flex items-center gap-3 ">
              {/* Date Range Button */}
              {field?.type === "date" && (
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
                        onSelect={(e) =>
                          setDate({
                            from: format(e.from, "LLL dd, y"),
                            to: format(e.to, "LLL dd, y"),
                          })
                        }
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              {/* Sort by level */}
              {field?.type === "level" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-500  border-gray-200 rounded-full border">
                      <ListFilter size={18} />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {filters?.level || "Sort by Level"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-w-56 text-secondaryText">
                    <DropdownMenuLabel>Sort by Level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={filters?.level}
                      onValueChange={(e) => handleInputChange(field?.name, e)}
                    >
                      {field?.options?.map((option) => (
                        <DropdownMenuRadioItem key={option} value={option}>
                          {option}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Sort by a-z */}
              {field?.type === "order" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-500  border-gray-200 rounded-full border">
                      <ListFilter size={18} />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {filters?.order || "Sort by A-Z"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-w-56 text-secondaryText">
                    <DropdownMenuLabel>Sort by A-Z</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={filters?.order}
                      onValueChange={(e) => handleInputChange(field?.name, e)}
                    >
                      {field?.options?.map((option) => (
                        <DropdownMenuRadioItem key={option} value={option}>
                          {option}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Sort by progress */}
              {field?.type === "progress" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-500  border-gray-200 rounded-full border">
                      <ListFilter size={18} />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {filters?.progress || "Sort by Progress"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-w-56 text-secondaryText">
                    <DropdownMenuLabel>Sort by Progress</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={filters?.progress}
                      onValueChange={(e) => handleInputChange(field?.name, e)}
                    >
                      {field?.options?.map((option) => (
                        <DropdownMenuRadioItem key={option} value={option}>
                          {option}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Search Input */}
            {field?.type === "search" && (
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block min-w-[150px] max-w-xs w-full py-2 pl-8 pr-3 text-sm text-gray-700 bg-transparent  border border-gray-200 rounded-full  focus:outline-none "
                  placeholder="Search..."
                  value={fields?.searchText}
                  onChange={(e) =>
                    handleInputChange(field?.name, e.target.value)
                  }
                />
              </div>
            )}
          </div>
          {field?.type === "link" && (
            <div className="flex items-center gap-3 ml-auto">
              <Link
                // to="/admin-dashboard/quiz-manage/guess-the-signal/add-guess-the-signal"
                to={field?.path}
                className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90"
              >
                {field?.name}
              </Link>
            </div>
          )}
          {field?.type === "button" && (
            <div className="w-fit ml-auto">{field?.compo}</div>
          )}
        </>
      ))}
    </HorizontalScroll>
  );
};

export default FilterComponent;