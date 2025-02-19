import ErrorReview from "@/Components/UserDashboard/Quiz/ErrorReview";
import OfficialQuiz from "@/Components/UserDashboard/Quiz/OfficialQuiz";
import UserDashboardChapterDetails from "@/Pages/UserDashboard/UserDashboardChapterDetails";
import UserDashboardIndex from "@/Pages/UserDashboard/UserDashboardIndex";
import UserDashboardQuizLayout from "@/Pages/UserDashboard/UserDashboardQuizLayout";
import UserDashboardQuizSummary from "@/Pages/UserDashboard/UserDashboardQuizSummary";
import UserDashboardSubjectDetails from "@/Pages/UserDashboard/UserDashboardSubjectDetails";
import UserDashboardTheory from "@/Pages/UserDashboard/UserDashboardTheory";

const UserDashboardRoutes = [
  { path: "", Component: UserDashboardIndex },
  { path: "overview", Component: UserDashboardIndex },
  { path: "theory", Component: UserDashboardTheory },
  { path: "theory/:id", Component: UserDashboardChapterDetails },
  { path: "theory/:id/:id", Component: UserDashboardSubjectDetails },
  { path: "quiz", Component: UserDashboardQuizLayout },
  { path: "quiz/official-quiz", Component: OfficialQuiz },
  { path: "quiz/error-review", Component: ErrorReview },
  { path: "quiz/summary", Component: UserDashboardQuizSummary },
];

export default UserDashboardRoutes;
