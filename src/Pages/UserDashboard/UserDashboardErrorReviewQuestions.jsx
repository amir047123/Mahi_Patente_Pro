import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import ErrorReviewQuestionsCard from "@/Components/UserDashboard/Quiz/ErrorReviewQuestionsCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { ArrowDownNarrowWide } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UserDashboardErrorReviewQuestions = () => {
  const { id } = useParams();
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [isFiltered, setIsFiltered] = useState(true);
  const { useEntityById } = useCrudOperations("quiz-session/user-session");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useEntityById(id);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  useEffect(() => {
    if (isFiltered && isSuccess && response?.success) {
      setFilteredQuizzes(
        response?.data?.quizzes?.filter((quiz) => quiz.isCorrect === false)
      );
    } else {
      setFilteredQuizzes(response?.data?.quizzes);
    }
  }, [isFiltered, response, isSuccess]);

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
        <button
          onClick={() => setIsFiltered((prev) => !prev)}
          className={`border flex items-center gap-2 py-2 px-4 rounded-full text-sm ${
            isFiltered
              ? "border-secondary text-secondary"
              : "text-secondaryText border-slate-300"
          }`}
        >
          <ArrowDownNarrowWide
            size={20}
            className={`${isFiltered ? "text-secondary" : "text-[#9CA3AF]"} `}
          />
          {isFiltered
            ? "Show Errors with Correct Questions"
            : "Show Only Error Questions"}
        </button>

        <Link
          to={`/user-dashboard/quiz/official-quiz`}
          className="bg-secondary hover:bg-secondary/80 font-medium rounded-full text-white py-3 px-6  text-sm"
        >
          Retry Quiz Again
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner size={40} />
        </div>
      ) : filteredQuizzes?.length > 0 ? (
        <div className="">
          {filteredQuizzes?.map((question, index) => (
            <div key={index} className="mb-4">
              <ErrorReviewQuestionsCard
                question={question}
                quizReviewData={response?.data?.quizzes}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <Typography.Body variant="medium">
            {isFiltered
              ? "No error review questions found! Try switching filters!"
              : "No error questions found!"}
          </Typography.Body>
        </div>
      )}
    </>
  );
};

export default UserDashboardErrorReviewQuestions;
