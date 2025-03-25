import ChapterCard from "@/Components/UserDashboard/ChapterCard";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Link } from "react-router-dom";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";

const UserDashboardTheory = () => {
  const { useFetchEntities } = useCrudOperations("quiz-chapter/all");

  const { data: response, error, isError, isLoading } = useFetchEntities();

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
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5 mt-5">
          {response?.data?.chapters?.map((item, index) => (
            <Link key={index} to={`/user-dashboard/theory/${item?._id}`}>
              <ChapterCard item={item} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No chapter found!</p>
      )}
    </>
  );
};

export default UserDashboardTheory;
