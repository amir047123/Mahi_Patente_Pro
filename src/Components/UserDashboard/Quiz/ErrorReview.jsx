import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import Typography from "@/Components/Typography";
import { Link } from "react-router-dom";
import ExamSummaryCard from "./ExamSummaryCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ErrorReview = () => {
  const { useFetchEntities } = useCrudOperations("quiz-session/user-sessions");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities({ category: "Theory" });

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
          { name: "Error Review", path: "quiz/error-review" },
        ]}
      />
      <div>
        <Typography.Heading4 variant="semibold" className="mt-4">
          Last 5 days exam summary
        </Typography.Heading4>
        <div className="mt-5 flex flex-col gap-3 w-full">
          {response?.data?.sessions?.map((item, index) => (
            <Link key={index} to={`/user-dashboard/theory/1`}>
              <ExamSummaryCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ErrorReview;
