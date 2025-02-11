import CourseCard from "@/Components/Courses/CourseCard";
import CourseFilter from "@/Components/Courses/CourseFilter";
import Typography from "@/Components/Typography";
import Navbar from "@/Shared/Navbar/Navbar";

const Courses = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4 md:pt-28 pt-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Typography.Heading2 className="">
            See our Popular{" "}
            <span className="bg-gradient text-transparent bg-clip-text w-fit">
              Courses
            </span>
          </Typography.Heading2>
          <Typography.Body className="text-gray-600 mt-2">
            Learn in Bangla, practice with real tests, and pass your Italian
            driving exam with confidence!
          </Typography.Body>
        </div>

        <CourseFilter />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </div>
  );
};

export default Courses;
