import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import Typography from "@/Components/Typography";
import { Link } from "react-router-dom";
import demoImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import demoImg2 from "@/assets/UserDashboard/subject-demo-img.svg";
import ErrorReviewCategoryCard from "./ErrorReviewCategoryCard";
import ExamSummaryCard from "./ExamSummaryCard";

const ErrorReview = () => {
  const examSummaryCardData = [
    {
      id: 1,
      updatedAt: new Date(),
      correct: 50,
      wrong: 50,
      skip: 2,
      total: 102,
    },
    {
      id: 2,
      updatedAt: new Date(),
      correct: 50,
      wrong: 50,
      skip: 2,
      total: 102,
    },
    {
      id: 3,
      updatedAt: new Date(),
      correct: 50,
      wrong: 50,
      skip: 2,
      total: 102,
    },
  ];

  const errorReviewCategoryData = [
    {
      id: 1,
      title: "Danger signs",
      description: "Simulate a Ministerial Quiz as if you were taking an exam.",
      slug: "official-quiz",
      icon: demoImg,
      time: "50 min",
      right: 50,
      total: 100,
    },
    {
      id: 2,
      title: "Horizontal Signage",
      description: "Make a quiz with all the mistakes you made.",
      slug: "error-review",
      icon: demoImg2,
      time: "50 min",
      right: 321,
      total: 442,
    },
    {
      id: 3,
      title: "Priority Sign",
      description: "Make a quiz with all the mistakes you made.",
      slug: "error-review",
      icon: demoImg2,
      time: "50 min",
      right: 50,
      total: 200,
    },
  ];

  return (
    <>
      <DashboardBreadcrumb
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Error Review", path: "quiz/error-review" },
        ]}
      />
      <div className="flex items-center gap-4 mb-10 mt-4">
        {errorReviewCategoryData?.map((item, index) => (
          <Link key={index} to={`/user-dashboard/quiz/${item?.slug}`}>
            <ErrorReviewCategoryCard item={item} />
          </Link>
        ))}
      </div>
      <div>
        <Typography.Heading4 variant="semibold" className="mt-4">
          Last 5 days exam summary
        </Typography.Heading4>
        <div className="mt-5 flex flex-col gap-3 w-full">
          {examSummaryCardData?.map((item, index) => (
            <Link key={index} to={`/user-dashboard/theory/1`}>
              <ExamSummaryCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ErrorReview;
