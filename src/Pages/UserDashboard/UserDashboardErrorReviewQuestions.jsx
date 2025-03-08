import ErrorReviewQuestionsCard from "@/Components/UserDashboard/Quiz/ErrorReviewQuestionsCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import {
  ArrowDownNarrowWide,
  CalendarCog,
  ChartBarStacked,
  Volleyball,
} from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UserDashboardErrorReviewQuestions = () => {
  const { id } = useParams();
  const { useEntityById } = useCrudOperations("quiz-session/user-session");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useEntityById(id);

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
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Error Review", path: `quiz/error-review` },
          { name: "Review Questions", path: `quiz/error-review/${id}` },
        ]}
      />

      <div className="flex items-center justify-between h-full my-4">
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

        <Link
          to={`/user-dashboard/quiz/official-quiz`}
          className="bg-secondary hover:bg-secondary/80 font-medium rounded-full text-white py-3 px-6  text-sm"
        >
          Retry Quiz Again
        </Link>
      </div>

      <div className="">
        {response?.data?.quizzes?.map((question, index) => (
          <div key={index} className="mb-4">
            <ErrorReviewQuestionsCard
              question={question}
              quizReviewData={response?.data?.quizzes}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDashboardErrorReviewQuestions;
