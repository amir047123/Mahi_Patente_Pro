import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import Typography from "@/Components/Typography";
import ExamSummaryCard from "./ExamSummaryCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";

const ErrorReview = () => {
  const { useFetchEntities } = useCrudOperations("quiz-session/user-sessions");

  const {
    data: response,
    error,
    isError,
    isLoading,
  } = useFetchEntities({ category: "Theory" });

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
      <div className="text-primaryText">
        <Typography.Heading4 variant="semibold" className="mt-4 text-primaryText">
          Last 5 days exam summary
        </Typography.Heading4>

        {isLoading ? (
          <div className="flex items-center justify-center mt-10">
            <Spinner size={40} />
          </div>
        ) : response?.data?.sessions?.length > 0 ? (
          <div className="mt-5 flex flex-col gap-3 w-full">
            {response?.data?.sessions?.map((item, index) => (
              <ExamSummaryCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mt-10">
            <Typography.Body variant="medium">
              No exam summary found!
            </Typography.Body>
          </div>
        )}
      </div>
    </>
  );
};

export default ErrorReview;
