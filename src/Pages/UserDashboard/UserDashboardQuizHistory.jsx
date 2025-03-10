import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Link } from "react-router-dom";
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
  } = useFetchEntities(filters);

  console.log(filters);

  useEffect(() => {
    if (isSuccess && response?.success) {
      console.log(response?.data);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "History", path: "history" }]}
      />

      <div className=" h-full mb-4">
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
              options: [
                "Official Quizzes",
                "Guess the Signal",
                "Choose 4 to 1 Signal",
              ],
            },
            {
              type: "status",
              name: "status",
              options: ["In-progress", "Completed", "Expired"],
            },
          ]}
        />
        <div className="px-4 py-5 bg-white rounded-2xl text-left h-[98%] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-secondary !font-normal text-nowrap bg-[#EAF2FA] text-sm">
                <th className="p-2 rounded-l-full pl-4">End Time</th>
                <th className="p-2">Quiz Type</th>
                <th className="p-2 text-center">Score</th>
                <th className="p-2 text-center">Difficulty</th>
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
                    <td className="text-center p-2 py-3">{item?.difficulty}</td>
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
    </div>
  );
}
