import DailyErrorRates from "@/Components/AdminDashboard/AdminIndex/DailyErrorRates";
import ProfileCard from "@/Components/AdminDashboard/AdminIndex/ProfileCard";
import QuizzesSolved from "@/Components/AdminDashboard/AdminIndex/QuizzesSolved";
import Ranking from "@/Components/AdminDashboard/AdminIndex/Ranking";
import State from "@/Components/AdminDashboard/AdminIndex/State";
import TestSimulationStatistics from "@/Components/AdminDashboard/AdminIndex/TestSimulationStatistics";
import TotalAnswer from "@/Components/AdminDashboard/AdminIndex/TotalAnswer";
import TotalProgress from "@/Components/AdminDashboard/AdminIndex/TotalProgress";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";

const AdminDashboardUserProfile = () => {
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
          {/* Top Section */}
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 h-fit gap-4 mb-5">
            <ProfileCard />
            <Ranking />
            <State />
          </div>
          <div className="rounded-md mt-4 lg:grid lg:grid-cols-2 space-y-5 lg:space-y-0 gap-x-4 gap-y-6  border-t pt-4">
            <TotalProgress />
            <TotalAnswer />
            <QuizzesSolved />
            <TestSimulationStatistics />
            <div className="col-span-2">
              <DailyErrorRates />
            </div>
          </div>
        </div>
      </>
    );
};

export default AdminDashboardUserProfile;