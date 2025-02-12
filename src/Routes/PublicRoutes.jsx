import Courses from "@/Pages/Courses";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Pricing from "@/Pages/Pricing";
import SignUpPage from "@/Pages/SignUpPage";
import UserDashboard from "@/Pages/UserDashboard";

const PublicRoutes = [
  { path: "/", Component: Home },
  { path: "/home", Component: Home },
  { path: "/courses", Component: Courses },
  { path: "/pricing", Component: Pricing },
  { path: "/login", Component: Login },
  { path: "/sign-up", Component: SignUpPage },
  { path: "/dashboard", Component: UserDashboard },
];

export default PublicRoutes;