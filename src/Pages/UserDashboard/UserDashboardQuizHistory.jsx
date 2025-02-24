import Typography from "@/Components/Typography";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import {
  ArrowDownNarrowWide,
  CalendarCog,
  ChartBarStacked,
  Volleyball,
} from "lucide-react";
import demoImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import demoImg2 from "@/assets/UserDashboard/subject-demo-img.svg";
import { Link } from "react-router-dom";
import ErrorReviewCategoryCard from "@/Components/UserDashboard/Quiz/ErrorReviewCategoryCard";

export default function UserDashboardQuizHistory() {
  const errorReviewCategoryData = [
    {
      id: 1,
      title: "Danger signs",
      description: "Simulate a Ministerial Quiz as if you were taking an exam.",
      slug: "official-quiz",
      icon: demoImg,
      time: "50 min",
      right: 50,
      total: 100,
    },
    {
      id: 2,
      title: "Horizontal Signage",
      description: "Make a quiz with all the mistakes you made.",
      slug: "error-review",
      icon: demoImg2,
      time: "50 min",
      right: 321,
      total: 442,
    },
    {
      id: 3,
      title: "Priority Sign",
      description: "Make a quiz with all the mistakes you made.",
      slug: "error-review",
      icon: demoImg2,
      time: "50 min",
      right: 50,
      total: 200,
    },
  ];

  const tableData = [
    {
      id: 1,
      createdAt: new Date(),
      quizType: "Official Quiz",
      score: 90,
      status: "Passed",
    },
    {
      id: 2,
      createdAt: new Date(),
      quizType: "Choose 4 to 1 signal",
      score: 80,
      status: "Passed",
    },
    {
      id: 3,
      createdAt: new Date(),
      quizType: "Guess The Signal",
      score: 30,
      status: "Failed",
    },
    {
      id: 4,
      createdAt: new Date(),
      quizType: "Choose 4 to 1 signal",
      score: 70,
      status: "Passed",
    },
    {
      id: 5,
      createdAt: new Date(),
      quizType: "Fast Mania",
      score: 20,
      status: "Failed",
    },
  ];
  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "History", path: "history" }]}
      />

      <div className="mt-4 grid grid-cols-3 gap-8 pb-10">
        <div className="col-span-2 h-full mb-4">
          <div className="flex items-center gap-4 text-secondaryText mb-4">
            <button className="border flex items-center gap-2 py-2 px-4 rounded-full text-sm">
              <CalendarCog size={20} className="text-[#9CA3AF]" />
              Select Date Range
            </button>
            <button className="border flex items-center gap-2 py-2 px-4 rounded-full text-sm">
              <Volleyball size={20} className="text-[#9CA3AF]" />
              Select Score Range
            </button>
            <button className="border flex items-center gap-2 py-2 px-4 rounded-full text-sm">
              <ChartBarStacked size={20} className="text-[#9CA3AF]" />
              Quiz Type
            </button>
            <button className="border flex items-center gap-2 py-2 px-4 rounded-full text-sm">
              <ArrowDownNarrowWide size={20} className="text-[#9CA3AF]" />
              Sorting
            </button>
          </div>
          <div className="px-4 py-5 bg-white rounded-2xl text-left h-[98%]">
            <table className="w-full">
              <thead>
                <tr className="text-secondary text-nowrap bg-[#EAF2FA]">
                  <th className="p-2 rounded-l-full pl-4">Date & Time</th>
                  <th className="p-2">Quiz Type</th>
                  <th className="p-2 text-center">Score</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 rounded-r-full text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index} className="text-secondaryText border-b">
                    <td className="p-2 py-3 pl-4">
                      {new Date(item?.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 py-3">{item?.quizType}</td>
                    <td className="text-center p-2 py-3">{item?.score}%</td>
                    <td
                      className={`text-center p-2 py-3 ${
                        item?.status === "Passed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item?.status}
                    </td>
                    <td
                      className={`text-center p-2 py-3 underline ${
                        item?.status === "Passed"
                          ? "text-secondary"
                          : "text-blue-600"
                      }`}
                    >
                      {item?.status === "Passed" ? "View" : "Retry"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <Typography.Title>Recover these error chapters</Typography.Title>
          <div className="flex flex-col items-center gap-4 mb-10 mt-4 w-full">
            {errorReviewCategoryData?.map((item, index) => (
              <Link
                key={index}
                to={`/user-dashboard/quiz/${item?.slug}`}
                className="w-full"
              >
                <ErrorReviewCategoryCard item={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
