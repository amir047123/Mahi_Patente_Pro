import Typography from "@/Components/Typography";
import QuizCard from "@/Components/UserDashboard/QuizCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UserDashboardSubjectDetails = () => {
  const { id } = useParams();
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Theory", path: "theory" },
  ]);

  const { useEntityById } = useCrudOperations("quiz");

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
              className="text-primaryText leading-7  mt-2"
              variant="semibold"
            >
              {response?.data?.subject?.name}
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
        {response?.data?.questions?.map((question, index) => (
          <QuizCard key={index} question={question} />
        ))}
      </div>
    </>
  );
};

export default UserDashboardSubjectDetails;
