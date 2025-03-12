import PassVsFailRateChart from "@/Components/AdminDashboard/AdminIndex/PassVsFailRateChart";
import { QuizAttemptCharts } from "@/Components/AdminDashboard/AdminIndex/QuizAttemptCharts";
import QuizPerformanceMetrics from "@/Components/AdminDashboard/AdminIndex/QuizPerformanceMetrics";
import QuizStatistics from "@/Components/AdminDashboard/AdminIndex/QuizStatistics";
import UserStatistics from "@/Components/AdminDashboard/AdminIndex/UserStatistics";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";

const AdminDashboardIndex = () => {
  const { useFetchEntities } = useCrudOperations("dashboard/admin");
  const { data: response, error, isError, isLoading } = useFetchEntities();

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <div>
      {/* quiz statistics */}
      <QuizStatistics data={response?.data} />

      {/* user statistics */}
      <UserStatistics data={response?.data} />
      <div className="w-full h-[1px] bg-gray-200 my-3" />
      <QuizPerformanceMetrics data={response?.data} />

      <div className="md:mt-5 mt-3 grid grid-cols-5 md:gap-5 gap-3">
        <QuizAttemptCharts data={response?.data} />
        <PassVsFailRateChart data={response?.data} />
      </div>
    </div>
  );
};

export default AdminDashboardIndex;
