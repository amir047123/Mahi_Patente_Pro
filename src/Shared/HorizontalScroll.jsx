import { useRef } from "react";

const HorizontalScroll = ({ children, className }) => {
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
    <div
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`${className} overflow-x-auto scrollbar-hide cursor-grab select-none`}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;
