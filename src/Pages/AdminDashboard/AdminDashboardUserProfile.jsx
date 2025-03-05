import ProfileCard from "@/Components/AdminDashboard/AdminIndex/ProfileCard";
import Ranking from "@/Components/AdminDashboard/AdminIndex/Ranking";
import State from "@/Components/AdminDashboard/AdminIndex/State";
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
            <ProfileCard/>
            <Ranking />
            <State />
          </div>

        
        </div>
      </>
    );
};

export default AdminDashboardUserProfile;