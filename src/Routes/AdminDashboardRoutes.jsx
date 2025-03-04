import AdminDashboardAddGuessTheSignalQuestions from "@/Pages/AdminDashboard/AdminDashboardAddGuessTheSignalQuestions";
import AdminDashboardCategories from "@/Pages/AdminDashboard/AdminDashboardCategories";
import AdminDashboardChapterDetails from "@/Pages/AdminDashboard/AdminDashboardChapterDetails";
import AdminDashboardChapters from "@/Pages/AdminDashboard/AdminDashboardChapters";
import AdminDashboardAddChooseTheSignalQuestions from "@/Pages/AdminDashboard/AdminDashboardAddChooseTheSignalQuestions";
import AdminDashboardGuessTheSignalQuestions from "@/Pages/AdminDashboard/AdminDashboardGuessTheSignalQuestions";
import AdminDashboardIndex from "@/Pages/AdminDashboard/AdminDashboardIndex";
import AdminDashboardQuizQuestion from "@/Pages/AdminDashboard/AdminDashboardQuizQuestion";
import AdminDashboardAddQuizQuestions from "@/Pages/AdminDashboard/AdminDashboardAddQuizQuestions";
import AdminDashboardSubjects from "@/Pages/AdminDashboard/AdminDashboardSubjects";
import Practice from "@/Shared/Practice/Practice";
import AdminDashboardChooseTheSignalQuestions from "@/Pages/AdminDashboard/AdminDashboardChooseTheSignalQuestions";

const AdminDashboardRoutes = [
  { path: "", Component: AdminDashboardIndex },
  { path: "practice", Component: Practice },
  { path: "categories", Component: AdminDashboardCategories },
  { path: "quiz-manage/chapters", Component: AdminDashboardChapters },
  {
    path: "quiz-manage/chapters/:chapter",
    Component: AdminDashboardChapterDetails,
  },
  {
    path: "quiz-manage/chapters/:chapter/:subject",
    Component: AdminDashboardQuizQuestion,
  },
  {
    path: "quiz-manage/chapters/:chapter/:subject/add-quiz",
    Component: AdminDashboardAddQuizQuestions,
  },
  { path: "quiz-manage/subjects", Component: AdminDashboardSubjects },
  {
    path: "quiz-manage/add-quiz",
    Component: AdminDashboardAddQuizQuestions,
  },
  {
    path: "quiz-manage/guess-the-signal",
    Component: AdminDashboardGuessTheSignalQuestions,
  },
  {
    path: "quiz-manage/guess-the-signal/add-guess-the-signal",
    Component: AdminDashboardAddGuessTheSignalQuestions,
  },
  {
    path: "quiz-manage/choose-4-to-1/",
    Component: AdminDashboardChooseTheSignalQuestions,
  },
  {
    path: "quiz-manage/choose-4-to-1/add-choose-4-to-1",
    Component: AdminDashboardAddChooseTheSignalQuestions,
  },
];

export default AdminDashboardRoutes;
