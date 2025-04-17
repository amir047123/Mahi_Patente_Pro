import Courses from "@/Pages/Courses";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Pricing from "@/Pages/Pricing";
import PrivacyPolicy from "@/Pages/PrivacyPolicy";
import SignUpPage from "@/Pages/SignUpPage";
const PublicRoutes = [
  { path: "/", Component: Home },
  { path: "/home", Component: Home },
  { path: "/courses", Component: Courses },
  { path: "/pricing", Component: Pricing },
  { path: "/login", Component: Login },
  { path: "/sign-up", Component: SignUpPage },
  { path: "/privacy-policy", Component: PrivacyPolicy },
];

export default PublicRoutes;
