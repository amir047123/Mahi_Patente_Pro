import ChapterCard from "@/Components/UserDashboard/ChapterCard";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";

const UserDashboardTheory = () => {
  const { useFetchEntities } = useCrudOperations("quiz-chapter/all");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities();

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
        items={[{ name: "Theory", path: "theory" }]}
      />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
        {response?.data?.map((item, index) => (
          <Link key={index} to={`/user-dashboard/theory/${item?._id}`}>
            <ChapterCard item={item} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default UserDashboardTheory;
