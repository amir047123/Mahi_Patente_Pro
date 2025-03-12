import QuizOptions from "@/Components/UserDashboard/index/QuizOptions";
import Summary from "@/Components/UserDashboard/index/Summary";
import DailyErrorRates from "@/Components/UserDashboard/PreparationStatistics/DailyErrorRates";
import Preparation from "@/Components/UserDashboard/PreparationStatistics/Preparation";
import SimulationStatistics from "@/Components/UserDashboard/PreparationStatistics/SimulationStatistics";
import SolvedErrorsPercentage from "@/Components/UserDashboard/PreparationStatistics/SolvedErrorsPercentage";
import TotalAnswer from "@/Components/UserDashboard/PreparationStatistics/TotalAnswer";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";

const UserDashboardIndex = () => {
  const { useFetchEntities } = useCrudOperations("dashboard/user");
  const { data: response, error, isError, isLoading } = useFetchEntities();

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <div className="">
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
      {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 h-fit gap-4 mb-5">
        <DailyGoal />
        <Ranking />
        <State />
      </div> */}

      {/* Quiz Options */}
      <QuizOptions />

      {/* Last 5 Quiz Summary */}
      <Summary />
    </div>
  );
};

export default UserDashboardIndex;
