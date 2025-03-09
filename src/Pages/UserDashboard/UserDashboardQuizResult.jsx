import Typography from "@/Components/Typography";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import incompleteQuiz from "@/assets/UserDashboard/quiz-result.svg";
import failedQuiz from "@/assets/UserDashboard/quiz-result-failed.svg";
import passedQuiz from "@/assets/UserDashboard/quiz-result-passed.svg";
import coin from "@/assets/UserDashboard/coin.svg";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import QuizReviewModal from "@/Components/UserDashboard/Quiz/QuizReviewModal";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";

export default function UserDashboardQuizResult({
  data = { progress: 120, total: 150 },
}) {
  const progressWidth = `${(data?.progress * 100) / data?.total}%`;
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [resultData, setResultData] = useState({});
  const { quizType, id, subject, chapter } = useParams();
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Quiz", path: "quiz" },
    { name: "Result", path: `history/${id}` },
  ]);

  const { pathname } = useLocation();

  const { useFetchEntities } = useCrudOperations("quiz");

  const { data: subjectResponse, subjectIsSuccess } = useFetchEntities({
    subject: subject,
  });

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
      const notSubmit = response?.data?.scoreInfo?.notSubmittedQuizzes;
      const correctPercentage = response?.data?.scoreInfo?.correctPercentage;
      const incorrect = response?.data?.scoreInfo?.incorrectQuizzes || 0;
      const correct = response?.data?.scoreInfo?.correctQuizzes || 0;

      const resultImg = correctPercentage > 90 ? passedQuiz : failedQuiz;

      const staticData = { resultImg, incorrect, correct };

      const theoryUrl =
        subject && chapter
          ? `/user-dashboard/theory/${subjectResponse?.data?.chapter?._id}/${subjectResponse?.data?.subject?._id}/official-quiz`
          : "/user-dashboard/quiz/official-quiz";

      if (response?.data?.category?.name === "Theory") {
        setResultData({
          ...staticData,
          resultImg:
            notSubmit > 0
              ? incompleteQuiz
              : correctPercentage > 90
              ? passedQuiz
              : failedQuiz,
          resultQuizLink: theoryUrl,
          quizCategory: 0,
          heading:
            notSubmit > 0
              ? "Incomplete Quiz"
              : correctPercentage > 90
              ? "Passed"
              : "Failed",
          description:
            notSubmit > 0 ? (
              <>
                Almost there! You missed some quiz, but you still earned{" "}
                <span className="text-orange-600 font-medium">120 Coins</span>.
                Try again!
              </>
            ) : correctPercentage > 90 ? (
              <>
                Well done! You passed! Keep going for a perfect score. You
                earned{" "}
                <span className="text-orange-600 font-medium">120 Coins!</span>
              </>
            ) : (
              <>
                Almost there! Keep practicing and try again. You earned{" "}
                <span className="text-orange-600 font-medium">120 Coins!</span>
              </>
            ),
        });
      } else if (response?.data?.category?.name === "Guess the Signal") {
        setResultData({
          ...staticData,
          resultQuizLink: "/user-dashboard/quiz/guess-the-signal",
          quizCategory: 1,
          heading: correctPercentage > 90 ? "Perfect Score" : "Failed",
          description:
            correctPercentage > 90
              ? "Signal Master! You identified all signals correctly! 🎉"
              : "Keep learning! Review the signals and try again!",
        });
      } else {
        setResultData({
          ...staticData,
          resultQuizLink: "/user-dashboard/quiz/choose-4-to-1-signal",
          quizCategory: 2,
          heading: correctPercentage > 90 ? "Perfect Score" : "Failed",
          description:
            correctPercentage > 90
              ? "Great Choice! You matched all signs correctly! 🎉"
              : "Try again! Carefully observe the details before choosing.",
        });
      }

      const urlArray = pathname.split("/");
      const path = urlArray?.[2];

      if (path && path === "quiz") {
        if (quizType === "official-quiz") {
          setBreadCrumbData([
            { name: "Quiz", path: "quiz" },
            { name: "Official Quiz", path: "quiz/official-quiz" },
            { name: "Result", path: `quiz/official-quiz/${id}` },
          ]);
        } else if (quizType === "guess-the-signal") {
          setBreadCrumbData([
            { name: "Quiz", path: "quiz" },
            { name: "Guess the Signal", path: "quiz/guess-the-signal" },
            { name: "Result", path: `quiz/guess-the-signal/${id}` },
          ]);
        } else if (quizType === "choose-4-to-1-signal") {
          setBreadCrumbData([
            { name: "Quiz", path: "quiz" },
            {
              name: "Choose 4 to 1 Signal",
              path: "quiz/choose-4-to-1-signal",
            },
            { name: "Result", path: `quiz/choose-4-to-1-signal/${id}` },
          ]);
        }
      } else if (path && path === "theory") {
        setBreadCrumbData([
          { name: "Theory", path: "theory" },
          {
            name: `${subjectResponse?.data?.chapter?.name}`,
            path: `theory/${subjectResponse?.data?.chapter?._id}`,
          },
          {
            name: `${subjectResponse?.data?.subject?.name}`,
            path: `theory/${subjectResponse?.data?.chapter?._id}/${subjectResponse?.data?.subject?._id}`,
          },
          {
            name: `Official Quiz`,
            path: `theory/${subjectResponse?.data?.chapter?._id}/${subjectResponse?.data?.subject?._id}/official-quiz`,
          },
          {
            name: `Result`,
            path: `theory/${subjectResponse?.data?.chapter?._id}/${subjectResponse?.data?.subject?._id}/official-quiz/${id}`,
          },
        ]);
      } else {
        setBreadCrumbData([
          { name: "History", path: "history" },
          { name: "Result", path: `history/${id}` },
        ]);
      }
    }
  }, [
    isSuccess,
    response,
    pathname,
    id,
    quizType,
    subjectResponse,
    subjectIsSuccess,
    chapter,
    subject,
  ]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <div>
      <DashboardBreadcrumb role="user" items={breadCrumbData} />

      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner size={40} />
        </div>
      ) : response?.success ? (
        <div className="p-4 bg-[#F7F7F7] rounded-md mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-16 items-center justify-center">
          <img
            src={resultData?.resultImg}
            alt="img"
            className="w-full h-full object-cover mt-6 sm:mt-0 order-2 sm:order-1"
          />
          <div className="text-center mr-4 lg:mr-10  order-1 sm:order-2">
            <Typography.Heading2>{resultData?.heading}</Typography.Heading2>

            <Typography.Base
              variant="regular"
              className="mt-4 text-sm md:text-base"
            >
              {resultData?.description}
            </Typography.Base>

            <div className="px-6 py-4 grid grid-cols-2 gap-4 xl:gap-16 bg-white rounded-2xl mt-12 border">
              <div>
                <div className="flex items-center justify-between">
                  <Typography.Base
                    variant="regular"
                    className="text-secondaryText text-sm lg:text-base"
                  >
                    Wrong
                  </Typography.Base>
                  <ThumbsDown className="text-red-500" size={20} />
                </div>
                <Typography.Heading3 className="text-left mt-3">
                  {resultData?.incorrect || 0}
                </Typography.Heading3>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Typography.Base
                    variant="regular"
                    className="text-secondaryText text-sm lg:text-base"
                  >
                    Right
                  </Typography.Base>
                  <ThumbsUp className="text-green-500" size={20} />
                </div>
                <Typography.Heading3 className="text-left mt-3">
                  {resultData?.correct || 0}
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
              to={resultData?.resultQuizLink}
              className="block w-full rounded-full bg-secondary px-2 py-1.5 sm:px-4 sm:py-3 text-white mt-6 md:mt-12"
            >
              Try new quiz
            </Link>
            <button
              onClick={() => setIsReviewOpen(true)}
              className={`mt-3 w-full rounded-full border border-secondary bg-white px-2 py-1.5 sm:px-4 sm:py-3 text-secondary ${
                resultData?.quizCategory !== 0 ? "hidden" : ""
              }`}
            >
              Review the answers
            </button>

            {resultData?.quizCategory === 0 ? (
              <QuizReviewModal
                data={response?.data?.quizzes}
                isOpen={isReviewOpen}
                setIsOpen={setIsReviewOpen}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <p className="text-center mt-10">No result found!</p>
      )}
    </div>
  );
}
