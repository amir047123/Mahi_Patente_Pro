import Typography from "@/Components/Typography";
import QuizCard from "@/Components/UserDashboard/QuizCard";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import { Link } from "react-router-dom";

const UserDashboardSubjectDetails = () => {
  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Theory", path: "theory" },
          {
            name: "Road, vehicles, driver duties",
            path: "theory/Road, vehicles, driver duties",
          },
          {
            name: "Platforms and sidewalks",
            path: "theory/Road, vehicles, driver duties/Platforms and sidewalks",
          },
        ]}
      />

      <div className="py-5 border-b mb-5 flex items-center justify-between">
        <div className=" gap-4 flex items-center ">
          <img
            className="h-[100px] object-cover rounded-xl"
            src={chapterImg}
            alt="image"
          />

          <div>
            <Typography.Heading3
              className="text-primaryText leading-7  mt-2"
              variant="semibold"
            >
              Intersections at grade and .
            </Typography.Heading3>
            <button className="bg-blue-600 hover:bg-blue-500 font-medium rounded-full text-white py-1.5 px-6  text-sm mt-5">
              In Progress
            </button>
          </div>
        </div>
        <Link
          to="/user-dashboard/quiz"
          className="bg-secondary hover:bg-secondary/80 font-medium rounded-full text-white py-3 px-6  text-sm"
        >
          Start Quiz
        </Link>
      </div>

      <div className="space-y-4">
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </div>
    </>
  );
};

export default UserDashboardSubjectDetails;
