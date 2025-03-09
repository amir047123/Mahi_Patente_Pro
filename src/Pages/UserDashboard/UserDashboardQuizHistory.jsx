import Typography from "@/Components/Typography";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import demoImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import demoImg2 from "@/assets/UserDashboard/subject-demo-img.svg";
import { Link } from "react-router-dom";
import ErrorReviewCategoryCard from "@/Components/UserDashboard/Quiz/ErrorReviewCategoryCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import FilterComponent from "@/Shared/FilterComponent";

export default function UserDashboardQuizHistory() {
  const { useFetchEntities } = useCrudOperations("quiz-session/user-sessions");
 const [filters, setFilters] = useState({});
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

console.log(filters)

  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "History", path: "history" }]}
      />

      <div className="mt-4 grid grid-cols-3 gap-8 pb-10">
        <div className="col-span-2 h-full mb-4">
         
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            fields={[
              {
                type: "date",
                name: "date",
              },
              {
                type: "quizType",
                name: "quizType",
                options: ["Official Quizzes", "Selected Topic Quiz", "Guess the Signal","Choose 4 to 1 Signal"],
              },
              {
                type: "status",
                name: "status",
                options: ["on Progress", "completed", "pending"],
              },

             
            ]}
          />
          <div className="px-4 py-5 bg-white rounded-2xl text-left h-[98%]">
            <table className="w-full">
              <thead>
                <tr className="text-secondary text-nowrap bg-[#EAF2FA] text-sm">
                  <th className="p-2 rounded-l-full pl-4">End Time</th>
                  <th className="p-2">Quiz Type</th>
                  <th className="p-2 text-center">Score</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 rounded-r-full text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center">
                      <div className="flex items-center justify-center">
                        <Spinner size={40} />
                      </div>
                    </td>
                  </tr>
                ) : response?.data?.sessions?.length > 0 ? (
                  response?.data?.sessions?.map((item, index) => (
                    <tr key={index} className="text-secondaryText border-b">
                      <td className="p-2 py-3 pl-4">
                        <span className="block">
                          {new Date(item?.timeInfo?.end)?.toLocaleString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span>
                          {new Date(item?.timeInfo?.end)?.toLocaleString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                            }
                          )}
                        </span>
                      </td>
                      <td className="p-2 py-3">{item?.category}</td>
                      <td className="text-center p-2 py-3">
                        {item?.scoreInfo?.correctPercentage}%
                      </td>
                      <td
                        className={`text-center p-2 py-3 ${
                          item?.status === "Completed"
                            ? "text-green-500"
                            : item?.status === "In-progress"
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {item?.status}
                      </td>
                      <td
                        className={`text-center p-2 py-3 underline ${
                          item?.status === "Completed" ||
                          item?.status === "Expired"
                            ? "text-secondary"
                            : "text-blue-600"
                        }`}
                      >
                        {item?.status === "Completed" ||
                        item?.status === "Expired" ? (
                          <Link to={`/user-dashboard/history/${item?._id}`}>
                            View
                          </Link>
                        ) : (
                          <Link
                            to={`/user-dashboard/quiz/official-quiz?in-progress=yes`}
                          >
                            Retry
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="">
                    <td colSpan={5} className="py-4 text-center !text-sm">
                      No Session Found!
                    </td>
                  </tr>
                )}
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
