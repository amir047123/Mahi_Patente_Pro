import DailyGoal from "@/Components/UserDashboard/index/DailyGoal";
import QuizOptions from "@/Components/UserDashboard/index/QuizOptions";
import Ranking from "@/Components/UserDashboard/index/Ranking";
import State from "@/Components/UserDashboard/index/State";
import Summary from "@/Components/UserDashboard/index/Summary";

const UserDashboardIndex = () => {
    return (
  
        <div className="">
          {/* Top Section */}
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 h-fit gap-4 mb-5">
            <DailyGoal />
            <Ranking />
            <State />
          </div>

          {/* Quiz Options */}
          <QuizOptions />

          {/* Last 5 Quiz Summary */}
          <Summary />
        </div>
    
    );
};

export default UserDashboardIndex;