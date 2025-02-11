
import { useRef } from "react";

const CourseFilter = () => {
  const scrollContainerRef = useRef(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    isDragging = true;
    scrollContainerRef.current.classList.add("cursor-grabbing"); // Add a grabbing cursor
    startX = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault(); // Prevent text selection
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX; // Distance to scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove("cursor-grabbing");
    }
  };
  return (
    <div className="py-7 sm:flex items-center justify-between space-y-3 sm:space-y-0">
      <div
        className="flex items-center sm:gap-3 gap-2 overflow-x-auto scrollbar-hide cursor-grab select-none"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <button className="px-5 py-1.5 font-medium text-secondary text-sm rounded-full border border-secondary  whitespace-nowrap hover:text-white hover:bg-secondary ">
          All Courses
        </button>
        <button className="px-5 py-1.5 font-medium text-secondary text-sm rounded-full border border-secondary  whitespace-nowrap hover:text-white hover:bg-secondary ">
          Driving Course
        </button>
        <button className="px-5 py-1.5 font-medium text-secondary text-sm rounded-full border border-secondary  whitespace-nowrap hover:text-white hover:bg-secondary ">
          Language Course
        </button>
        <button className="px-5 py-1.5 font-medium text-secondary text-sm rounded-full border border-secondary  whitespace-nowrap hover:text-white hover:bg-secondary ">
          Law Course
        </button>
        
      </div>

      <div className="flex items-center gap-3 ">
        <div className="h-9 bg-gray-200 w-[2px] rounded-full hidden sm:block" />
        <div className="relative  min-w-40 w-full">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="Search"
            placeholder="Search for..."
            className="bg-transparent w-full  rounded-full border py-2 pe-10 shadow-sm sm:text-sm pl-8 focus:outline-none"
          />
          <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <button className="bg-bg_gradient px-5 py-2 rounded-full bg-gradient text-white text-sm">
          Search
        </button>
      </div>
    </div>
  );
};

export default CourseFilter;
