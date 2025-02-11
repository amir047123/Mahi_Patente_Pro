import Courses from "@/Pages/Courses";
import Home from "@/Pages/Home";

const PublicRoutes = [
    { path: "/", Component: Home },
    { path: "/home", Component: Home },
    { path: "/courses", Component: Courses },

];

export default PublicRoutes;