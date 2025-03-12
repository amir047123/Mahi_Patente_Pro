import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import ExamSummaryCard from "../Quiz/ExamSummaryCard";

function Summary() {
  const { useFetchEntities } = useCrudOperations("quiz-session/user-sessions");

  const {
    data: response,
    error,
    isError,
    isLoading,
  } = useFetchEntities({ category: "Theory", itemPerPage: 5 });

  if (isError && !isLoading) {
    toast.error(error?.message);
  }
  return (
    <div className="">
      <Typography.Heading5 className="text-primaryText">
        Last 5 official quiz summary
      </Typography.Heading5>
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
            No quiz summary found!
          </Typography.Body>
        </div>
      )}
    </div>
  );
}

export default Summary;
