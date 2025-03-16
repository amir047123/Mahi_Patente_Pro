import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import ErrorReviewQuestionsCard from "@/Components/UserDashboard/Quiz/ErrorReviewQuestionsCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import FilterComponent from "@/Shared/FilterComponent";
import ItemPerPage from "@/Shared/ItemPerPage";
import PaginationCompo from "@/Shared/PaginationCompo";
import { useState } from "react";
import toast from "react-hot-toast";

const UserDashboardBookmarksHistory = () => {
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 10,
    totalPages: 1,
  });
  const { useFetchEntities } = useCrudOperations("quiz-session/user-session");

  const { data: response, error, isError, isLoading } = useFetchEntities();

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "Bookmarks", path: "bookmarks" }]}
      />

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        fields={[
          {
            type: "date",
            name: "date",
          },
        ]}
      />

      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner size={40} />
        </div>
      ) : response?.data?.quizzes?.length > 0 ? (
        <div className="">
          {response?.data?.quizzes?.map((question, index) => (
            <div key={index} className="mb-4">
              <ErrorReviewQuestionsCard
                question={question}
                quizReviewData={response?.data?.quizzes}
              />
            </div>
          ))}

          <div className="flex justify-between mt-10">
            <ItemPerPage
              itemPerPage={filters?.itemPerPage}
              onLimitChange={(newItemPerPage) =>
                setFilters((prev) => ({
                  ...prev,
                  itemPerPage: newItemPerPage,
                  currentPage: 1,
                }))
              }
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
        <div className="flex items-center justify-center mt-10">
          <Typography.Body variant="medium">
            No bookmarks questions found!
          </Typography.Body>
        </div>
      )}
    </>
  );
};

export default UserDashboardBookmarksHistory;
