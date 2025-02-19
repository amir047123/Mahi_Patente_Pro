import ErrorReview from "@/Components/UserDashboard/Quiz/ErrorReview";
import OfficialQuiz from "@/Components/UserDashboard/Quiz/OfficialQuiz";
import UserDashboardChapterDetails from "@/Pages/UserDashboard/UserDashboardChapterDetails";
import UserDashboardIndex from "@/Pages/UserDashboard/UserDashboardIndex";
import UserDashboardQuizLayout from "@/Pages/UserDashboard/UserDashboardQuizLayout";
import UserDashboardSubjectDetails from "@/Pages/UserDashboard/UserDashboardSubjectDetails";
import UserDashboardTheory from "@/Pages/UserDashboard/UserDashboardTheory";
import Practice from "@/Shared/Practice/Practice";

const UserDashboardRoutes = [
  { path: "", Component: UserDashboardIndex },
  { path: "practice", Component: Practice },
  { path: "overview", Component: UserDashboardIndex },
  { path: "theory", Component: UserDashboardTheory },
  { path: "theory/:id", Component: UserDashboardChapterDetails },
  { path: "theory/:id/:id", Component: UserDashboardSubjectDetails },
  { path: "quiz", Component: UserDashboardQuizLayout },
  { path: "quiz/official-quiz", Component: OfficialQuiz },
  { path: "quiz/error-review", Component: ErrorReview },
];

export default UserDashboardRoutes;
