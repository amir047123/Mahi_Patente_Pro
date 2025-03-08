import PassVsFailRateChart from "@/Components/AdminDashboard/AdminIndex/PassVsFailRateChart";
import { QuizAttemptCharts } from "@/Components/AdminDashboard/AdminIndex/QuizAttemptCharts";
import QuizPerformanceMetrics from "@/Components/AdminDashboard/AdminIndex/QuizPerformanceMetrics";
import QuizStatistics from "@/Components/AdminDashboard/AdminIndex/QuizStatistics";
import UserStatistics from "@/Components/AdminDashboard/AdminIndex/UserStatistics";

const AdminDashboardIndex = () => {
  return (
    <div>
      {/* quiz statistics */}
      <QuizStatistics />

      {/* user statistics */}
      <UserStatistics />
      <div className="w-full h-[1px] bg-gray-200 my-3" />
      <QuizPerformanceMetrics/>

      <div className="md:mt-5 mt-3 grid grid-cols-5 md:gap-5 gap-3">
        <QuizAttemptCharts/>
        <PassVsFailRateChart/>
      </div>
    </div>
  );
};

export default AdminDashboardIndex;
