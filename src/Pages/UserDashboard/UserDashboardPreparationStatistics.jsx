import DailyErrorRates from "@/Components/UserDashboard/PreparationStatistics/DailyErrorRates";
import Preparation from "@/Components/UserDashboard/PreparationStatistics/Preparation";
import SimulationStatistics from "@/Components/UserDashboard/PreparationStatistics/SimulationStatistics";
import SolvedErrorsPercentage from "@/Components/UserDashboard/PreparationStatistics/SolvedErrorsPercentage";
import TotalAnswer from "@/Components/UserDashboard/PreparationStatistics/TotalAnswer";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";

export default function UserDashboardPreparationStatistics() {
  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Preparation Statistics", path: "preparation-statistics" },
        ]}
      />

      <div className="p-4 rounded-md mt-4 grid grid-cols-2 gap-6 items-center justify-center">
        <Preparation />
        <TotalAnswer />
        <SolvedErrorsPercentage />
        <SimulationStatistics />
        <div className="col-span-2">
          <DailyErrorRates />
        </div>
      </div>
    </div>
  );
}
