import ChapterCard from "@/Components/UserDashboard/ChapterCard";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Link } from "react-router-dom";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import { useEffect, useState } from "react";
import ItemPerPage from "@/Shared/ItemPerPage";
import PaginationCompo from "@/Shared/PaginationCompo";

const UserDashboardTheory = () => {
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 12,
    totalPages: 1,
  });
  const { useFetchEntities } = useCrudOperations("quiz-chapter/all");

  const {
    data: response,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useFetchEntities(filters);

  useEffect(() => {
    if (isSuccess && response?.success) {
      setFilters((prev) => ({
        ...prev,
        totalPages: response?.data?.totalPages || 1,
      }));
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "Theory", path: "theory" }]}
      />

      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner size={40} />
        </div>
      ) : response?.data?.chapters?.length > 0 ? (
        <div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5 mt-5">
            {response?.data?.chapters?.map((item, index) => (
              <Link key={index} to={`/user-dashboard/theory/${item?._id}`}>
                <ChapterCard item={item} />
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
        <p className="text-center mt-10">No chapter found!</p>
      )}
    </>
  );
};

export default UserDashboardTheory;
