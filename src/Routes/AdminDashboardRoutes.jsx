import AdminDashboardCategories from "@/Pages/AdminDashboard/AdminDashboardCategories";
import AdminDashboardChapters from "@/Pages/AdminDashboard/AdminDashboardChapters";
import AdminDashboardIndex from "@/Pages/AdminDashboard/AdminDashboardIndex";
import AdminDashboardQuizQuestions from "@/Pages/AdminDashboard/AdminDashboardQuizQuestions";
import AdminDashboardSubjects from "@/Pages/AdminDashboard/AdminDashboardSubjects";
import Practice from "@/Shared/Practice/Practice";

const AdminDashboardRoutes = [
  { path: "", Component: AdminDashboardIndex },
  { path: "practice", Component: Practice },
  { path: "categories", Component: AdminDashboardCategories },
  { path: "quiz-manage/chapters", Component: AdminDashboardChapters },
  { path: "quiz-manage/subjects", Component: AdminDashboardSubjects },
  { path: "question", Component: AdminDashboardQuizQuestions },
];

export default AdminDashboardRoutes;
