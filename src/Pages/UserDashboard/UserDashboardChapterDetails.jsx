import Typography from "@/Components/Typography";
import SubjectCard from "@/Components/UserDashboard/SubjectCard";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UserDashboardChapterDetails = () => {
  const { chapter } = useParams();
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Theory", path: "theory" },
  ]);

  const { useEntityById } = useCrudOperations("subject");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useEntityById(chapter);

  useEffect(() => {
    if (isSuccess && response?.success) {
      setBreadCrumbData([
        { name: "Theory", path: "theory" },
        {
          name: response?.data?.chapter?.name,
          path: `theory/${chapter}`,
        },
      ]);
    }
  }, [isSuccess, response, chapter]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <DashboardBreadcrumb role="user" items={breadCrumbData} />

      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner size={40} />
        </div>
      ) : (
        <>
          {response?.data?.chapter && (
            <div className=" gap-4 flex items-center py-5 border-b mb-5">
              <img
                className="h-[100px] object-cover rounded-xl"
                src={response?.data?.chapter?.image || chapterImg}
                alt="image"
              />

              <div>
                <Typography.Body
                  variant="medium"
                  className="text-secondaryText"
                >
                  Chapter {response?.data?.chapter?.order}
                </Typography.Body>
                <Typography.Heading3
                  className="text-primaryText leading-7 mt-2 line-clamp-1"
                  variant="semibold"
                >
                  {response?.data?.chapter?.name}
                </Typography.Heading3>
              </div>
            </div>
          )}
          {response?.data?.subjects?.length > 0 ? (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
              {response?.data?.subjects?.map((subject, index) => (
                <Link
                  key={index}
                  to={`/user-dashboard/theory/${chapter}/${subject._id}`}
                >
                  <SubjectCard subject={subject} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center mt-10">No subjects found!</p>
          )}
        </>
      )}
    </>
  );
};

export default UserDashboardChapterDetails;
