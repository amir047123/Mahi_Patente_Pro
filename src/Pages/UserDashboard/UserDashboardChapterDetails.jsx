import Typography from "@/Components/Typography";
import SubjectCard from "@/Components/UserDashboard/SubjectCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UserDashboardChapterDetails = () => {
  const { id } = useParams();

  const { useEntityById } = useCrudOperations("subject");

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
          { name: "Theory", path: "theory" },
          {
            name: response?.data?.chapter?.name,
            path: `theory/${id}`,
          },
        ]}
      />

      <div className=" gap-4 flex items-center py-5 border-b mb-5">
        <img
          className="h-[100px] object-cover rounded-xl"
          src={response?.data?.chapter?.image || chapterImg}
          alt="image"
        />

        <div>
          <Typography.Body variant="medium" className="text-secondaryText">
            Chapter {response?.data?.chapter?.order}
          </Typography.Body>
          <Typography.Heading3
            className="text-primaryText leading-7  mt-2"
            variant="semibold"
          >
            {response?.data?.chapter?.name}
          </Typography.Heading3>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
        {response?.data?.subjects?.map((subject, index) => (
          <Link
            key={index}
            to={`/user-dashboard/theory/${id}/${subject._id}`}
            className="bg-white p-4 flex  gap-4 rounded-lg sm:max-w-sm"
          >
            <SubjectCard subject={subject} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default UserDashboardChapterDetails;
