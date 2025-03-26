import Typography from "@/Components/Typography";
import SubjectCard from "@/Components/UserDashboard/SubjectCard";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import ItemPerPage from "@/Shared/ItemPerPage";
import PaginationCompo from "@/Shared/PaginationCompo";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UserDashboardChapterDetails = () => {
  const { chapter } = useParams();
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 12,
    totalPages: 1,
  });
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
      setFilters((prev) => ({
        ...prev,
        totalPages: response?.data?.totalPages || 1,
      }));
      setBreadCrumbData([
        { name: "Theory", path: "theory" },
        {
          name: "Chapter",
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
            <div>
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

              <div className="flex justify-between mt-5 p-4 rounded-xl mb-10 bg-white">
                <ItemPerPage
                  itemPerPage={filters?.itemPerPage}
                  onLimitChange={(newItemPerPage) =>
                    setFilters((prev) => ({
                      ...prev,
                      itemPerPage: newItemPerPage,
                      currentPage: 1,
                    }))
                  }
                  options={[
                    {
                      value: 12,
                      label: "12",
                    },
                    {
                      value: 24,
                      label: "24",
                    },
                    {
                      value: 36,
                      label: "36",
                    },
                    {
                      value: 48,
                      label: "48",
                    },
                    {
                      value: 60,
                      label: "60",
                    },
                  ]}
                />
                <PaginationCompo
                  currentPage={filters?.currentPage}
                  totalPages={filters?.totalPages}
                  onPageChange={(page) =>
                    setFilters((prev) => ({ ...prev, currentPage: page }))
                  }
                />
              </div>
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
