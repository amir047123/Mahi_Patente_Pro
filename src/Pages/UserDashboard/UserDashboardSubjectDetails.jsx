import Typography from "@/Components/Typography";
import QuizCard from "@/Components/UserDashboard/QuizCard";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UserDashboardSubjectDetails = () => {
  const query = useQueryClient();
  const { subject } = useParams();
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Theory", path: "theory" },
  ]);

  const { useFetchEntities } = useCrudOperations("quiz");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
    refetch,
  } = useFetchEntities({ subject: subject });

  useEffect(() => {
    if (isSuccess && response?.success) {
      setBreadCrumbData([
        { name: "Theory", path: "theory" },
        {
          name: `${response?.data?.chapter?.name}`,
          path: `theory/${response?.data?.chapter?._id}`,
        },
        {
          name: `${response?.data?.subject?.name}`,
          path: `theory/${response?.data?.chapter?._id}/${response?.data?.subject?._id}`,
        },
      ]);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const { updateEntity } = useCrudOperations("subject/complete");

  const markAsComplete = () => {
    updateEntity.mutate(
      { _id: response?.data?.subject?._id },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          query.invalidateQueries({
            queryKey: ["subject/all"],
          });
          query.invalidateQueries({
            queryKey: ["quiz-chapter/all"],
          });
          refetch();
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <>
      <DashboardBreadcrumb role="user" items={breadCrumbData} />

      <div className="py-5 border-b mb-5 flex items-center justify-between">
        <div className=" gap-4 flex items-center ">
          <img
            className="h-[100px] object-cover rounded-xl"
            src={response?.data?.subject?.image || chapterImg}
            alt="image"
          />

          <div>
            <Typography.Heading3
              className="text-primaryText leading-7 mt-2 line-clamp-1"
              variant="semibold"
            >
              {response?.data?.subject?.name}
            </Typography.Heading3>
            <button
              className={`font-medium rounded-full text-white py-1.5 px-6  text-sm mt-5 ${
                response?.data?.subject?.isCompleted
                  ? "bg-[#2ACCB0] hover:bg-[#2ACCB0]/80"
                  : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {response?.data?.subject?.isCompleted
                ? "Completed"
                : "In Progress"}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            disabled={updateEntity?.isPending}
            onClick={markAsComplete}
            className={`bg-[#2ACCB0] hover:bg-[#2ACCB0]/80 w-40 font-medium rounded-full text-white py-3 px-4 text-sm transition-all flex items-center justify-center ${
              response?.data?.subject?.isCompleted ? "hidden" : ""
            }`}
          >
            {updateEntity?.isPending ? (
              <Spinner size={20} className="text-white" />
            ) : (
              "Mark as complete"
            )}
          </button>
          <Link
            to={`/user-dashboard/theory/${response?.data?.chapter?._id}/${response?.data?.subject?._id}/official-quiz`}
            className="bg-secondary hover:bg-secondary/80 font-medium rounded-full text-white py-3 px-6  text-sm"
          >
            Start Quiz
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {response?.data?.questions?.map((question, index) => (
          <QuizCard key={index} question={question} />
        ))}
      </div>
    </>
  );
};

export default UserDashboardSubjectDetails;
