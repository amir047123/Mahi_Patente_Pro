import Typography from "@/Components/Typography";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import incompleteQuiz from "@/assets/UserDashboard/quiz-result.svg";
import failedQuiz from "@/assets/UserDashboard/quiz-result-failed.svg";
import passedQuiz from "@/assets/UserDashboard/quiz-result-passed.svg";
import coin from "@/assets/UserDashboard/coin.svg";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import QuizReviewModal from "@/Components/UserDashboard/Quiz/QuizReviewModal";
import { Link, useParams } from "react-router-dom";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";

export default function UserDashboardQuizResult({
  data = { progress: 120, total: 150 },
}) {
  const [newQuizLink, setNewQuizLink] = useState(
    "/user-dashboard/quiz/official-quiz"
  );
  const [quizCategory, setQuizCategory] = useState(0);
  const progressWidth = `${(data?.progress * 100) / data?.total}%`;
  const [status, setStatus] = useState("");
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { id } = useParams();

  const { useEntityById } = useCrudOperations("quiz-session/user-session");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useEntityById(id);

  useEffect(() => {
    if (isSuccess && response?.success) {
      if (response?.data?.category?.name === "Theory") {
        setNewQuizLink("/user-dashboard/quiz/official-quiz");
        setQuizCategory(0);
      } else if (response?.data?.category?.name === "Guess the Signal") {
        setNewQuizLink("/user-dashboard/quiz/guess-the-signal");
        setQuizCategory(1);
      } else {
        setNewQuizLink("/user-dashboard/quiz/choose-4-to-1-signal");
        setQuizCategory(2);
      }

      if (response?.data?.scoreInfo?.notSubmittedQuizzes > 0) {
        setStatus("incomplete");
      } else if (response?.data?.scoreInfo?.correctPercentage > 90) {
        setStatus("passed");
      } else {
        setStatus("failed");
      }
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Result", path: "quiz/result/id" },
        ]}
      />

      <div className="p-4 bg-[#F7F7F7] rounded-md mt-4 grid grid-cols-2 gap-16 items-center justify-center">
        <img
          src={
            status === "passed"
              ? passedQuiz
              : status === "failed"
              ? failedQuiz
              : incompleteQuiz
          }
          alt="img"
          className="w-full h-full object-cover"
        />
        <div className="text-center mr-10">
          <Typography.Heading2>
            {status === "passed"
              ? "Passed"
              : status === "failed"
              ? "Failed"
              : "Incomplete quiz"}
          </Typography.Heading2>

          <Typography.Base variant="regular" className="mt-4">
            {status === "passed" ? (
              <>
                Well done! You passed! Keep going for a perfect score. You
                earned{" "}
                <span className="text-orange-600 font-medium">120 Coins!</span>
              </>
            ) : status === "failed" ? (
              <>
                Almost there! Keep practicing and try again. You earned{" "}
                <span className="text-orange-600 font-medium">120 Coins!</span>
              </>
            ) : (
              <>
                Almost there! You missed some questions, but you still earned{" "}
                <span className="text-orange-600 font-medium">120 Coins</span>.
                Try again!
              </>
            )}
          </Typography.Base>

          <div className="px-6 py-4 grid grid-cols-2 gap-16 bg-white rounded-2xl mt-12 border">
            <div>
              <div className="flex items-center justify-between">
                <Typography.Base
                  variant="regular"
                  className="text-secondaryText"
                >
                  Wrong
                </Typography.Base>
                <ThumbsDown className="text-red-500" />
              </div>
              <Typography.Heading3 className="text-left mt-3">
                {response?.data?.scoreInfo?.incorrectQuizzes || 0}
              </Typography.Heading3>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Typography.Base
                  variant="regular"
                  className="text-secondaryText"
                >
                  Right
                </Typography.Base>
                <ThumbsUp className="text-green-500" />
              </div>
              <Typography.Heading3 className="text-left mt-3">
                {response?.data?.scoreInfo?.correctQuizzes || 0}
              </Typography.Heading3>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl mt-4 border">
            <Typography.Base variant="bold" className="text-left">
              Your daily goal
            </Typography.Base>

            <div className="flex items-center justify-between mt-3">
              <Typography.Base variant="regular" className="text-[#666]">
                Sunday
              </Typography.Base>
              <div className="flex items-center gap-2">
                <img src={coin} alt="coin" className="w-6" />
                <Typography.Body className="text-secondaryText">
                  {data?.progress}/{data?.total}
                </Typography.Body>
              </div>
            </div>

            <div className="w-full bg-[#E1E1E1] rounded-full h-2.5 mt-2">
              <div
                className="bg-secondary rounded-full h-2.5"
                style={{ width: progressWidth }}
              ></div>
            </div>
          </div>

          <Link
            to={newQuizLink}
            className="block w-full rounded-full bg-secondary px-4 py-3 text-white mt-12"
          >
            Try new quiz
          </Link>
          <button
            onClick={() => setIsReviewOpen(true)}
            className="mt-3 w-full rounded-full border border-secondary bg-white px-4 py-3 text-secondary"
          >
            Review the answers
          </button>

          {quizCategory === 0 ? (
            <QuizReviewModal
              data={response?.data?.quizzes}
              isOpen={isReviewOpen}
              setIsOpen={setIsReviewOpen}
            />
          ) : quizCategory === 1 ? (
            <QuizReviewModal
              data={response?.data?.quizzes}
              isOpen={isReviewOpen}
              setIsOpen={setIsReviewOpen}
            />
          ) : (
            <QuizReviewModal
              data={response?.data?.quizzes}
              isOpen={isReviewOpen}
              setIsOpen={setIsReviewOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}
