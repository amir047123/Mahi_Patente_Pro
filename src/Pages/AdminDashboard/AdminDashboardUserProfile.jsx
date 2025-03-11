import CategoryStatistics from "@/Components/AdminDashboard/UsersManage/CategoryStatistics";
import ProfileCard from "@/Components/AdminDashboard/UsersManage/ProfileCard";
import DailyErrorRates from "@/Components/UserDashboard/PreparationStatistics/DailyErrorRates";
import Preparation from "@/Components/UserDashboard/PreparationStatistics/Preparation";
import SimulationStatistics from "@/Components/UserDashboard/PreparationStatistics/SimulationStatistics";
import SolvedErrorsPercentage from "@/Components/UserDashboard/PreparationStatistics/SolvedErrorsPercentage";
import TotalAnswer from "@/Components/UserDashboard/PreparationStatistics/TotalAnswer";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AdminDashboardUserProfile = () => {
  const { id } = useParams();
  const { useFetchEntities } = useCrudOperations("dashboard/user");
  const {
    data: response,
    error,
    isError,
    isLoading,
  } = useFetchEntities({ userId: id });

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  /*

*/

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[
          { name: "Users Manage", path: "users-manage" },
          { name: "User Profile", path: "users-manage/user-profile" },
        ]}
      />

      <div className="mt-5">
        <div className="grid lg:grid-cols-3 grid-cols-1 h-fit gap-6 mb-6">
          <ProfileCard user={response?.data?.userData} />
          <div className="lg:col-span-2">
            <CategoryStatistics
              data={response?.data?.categoryPerformance?.categories}
            />
          </div>
        </div>

        <div className="rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center">
          <Preparation data={response?.data} />
          <TotalAnswer data={response?.data} />
          <SolvedErrorsPercentage data={response?.data} />
          <SimulationStatistics data={response?.data} />
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-2">
            <DailyErrorRates
              data={response?.data?.errorAnalysis?.lastSevenDays}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardUserProfile;
