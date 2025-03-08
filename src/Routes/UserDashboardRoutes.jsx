import ErrorReview from "@/Components/UserDashboard/Quiz/ErrorReview";
import OfficialQuiz from "@/Components/UserDashboard/Quiz/OfficialQuiz";
import UserDasboardChooseSignal from "@/Pages/UserDashboard/UserDasboardChooseSignal";
import UserDashboardChapterDetails from "@/Pages/UserDashboard/UserDashboardChapterDetails";
import UserDashboardGuessTheSignal from "@/Pages/UserDashboard/UserDashboardGuessTheSignal";
import UserDashboardIndex from "@/Pages/UserDashboard/UserDashboardIndex";
import UserDashboardQuizLayout from "@/Pages/UserDashboard/UserDashboardQuizLayout";
import UserDashboardQuizSummary from "@/Pages/UserDashboard/UserDashboardQuizSummary";
import UserDashboardSubjectDetails from "@/Pages/UserDashboard/UserDashboardSubjectDetails";
import UserDashboardTheory from "@/Pages/UserDashboard/UserDashboardTheory";
import UserDashboardQuizResult from "@/Pages/UserDashboard/UserDashboardQuizResult";
import UserDashboardQuizHistory from "@/Pages/UserDashboard/UserDashboardQuizHistory";
import UserDashboardPreparationStatistics from "@/Pages/UserDashboard/UserDashboardPreparationStatistics";
import UserDashboardErrorReviewQuestions from "@/Pages/UserDashboard/UserDashboardErrorReviewQuestions";

const UserDashboardRoutes = [
  { path: "", Component: UserDashboardIndex },
  { path: "overview", Component: UserDashboardIndex },
  { path: "theory", Component: UserDashboardTheory },
  { path: "theory/:chapter", Component: UserDashboardChapterDetails },
  { path: "theory/:chapter/:subject", Component: UserDashboardSubjectDetails },
  { path: "theory/:chapter/:subject/official-quiz", Component: OfficialQuiz },
  {
    path: "theory/:chapter/:subject/official-quiz/:id",
    Component: UserDashboardQuizResult,
  },
  { path: "quiz", Component: UserDashboardQuizLayout },
  { path: "quiz/:quizType/:id", Component: UserDashboardQuizResult },
  { path: "quiz/official-quiz", Component: OfficialQuiz },
  { path: "quiz/guess-the-signal", Component: UserDashboardGuessTheSignal },
  { path: "quiz/choose-4-to-1-signal", Component: UserDasboardChooseSignal },
  { path: "quiz/summary", Component: UserDashboardQuizSummary },
  { path: "quiz/error-review", Component: ErrorReview },
  {
    path: "quiz/error-review/:id",
    Component: UserDashboardErrorReviewQuestions,
  },
  { path: "history", Component: UserDashboardQuizHistory },
  { path: "history/:id", Component: UserDashboardQuizResult },

  {
    path: "preparation-statistics",
    Component: UserDashboardPreparationStatistics,
  },
];

export default UserDashboardRoutes;
