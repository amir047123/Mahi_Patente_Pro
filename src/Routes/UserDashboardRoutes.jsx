import UserDashboardIndex from "@/Pages/UserDashboard/UserDashboardIndex";
import UserDashboardTheory from "@/Pages/UserDashboard/UserDashboardTheory";


const UserDashboardRoutes = [
  { path: "", Component: UserDashboardIndex },
  { path: "overview", Component: UserDashboardIndex },
  { path: "theory", Component: UserDashboardTheory },
];

export default UserDashboardRoutes;
