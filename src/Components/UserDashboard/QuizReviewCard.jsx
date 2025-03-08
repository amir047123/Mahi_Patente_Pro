import quizDemo from "@/assets/UserDashboard/quiz-demo-img.svg";
import Typography from "@/Components/Typography";
import { ThumbsDown, ThumbsUp, X } from "lucide-react";

const QuizReviewCard = ({ question, quizReviewData }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full bg-white rounded-lg p-3">
      <div className="sm:w-fit w-full flex items-center justify-center mb-4 sm:mb-0">
        <img
          className="rounded-md"
          src={question?.media?.image || quizDemo}
          alt="img"
        />
      </div>

      <div className="flex items-center justify-between col-span-2 w-full sm:pl-6 sm:pr-3">
        <div className="space-y-4 w-full">
          <div className="flex-grow">
            <Typography.Base
              variant="medium"
              className="text-secondaryText !text-xs sm:!text-sm"
            >
              Question No.{" "}
              {quizReviewData?.findIndex(
                (item) => item?._id === question?._id
              ) + 1}
            </Typography.Base>
            <Typography.Heading5
              variant="medium"
              className="text-primaryText mt-1 text-base sm:text-lg"
            >
              {question?.question}
            </Typography.Heading5>
          </div>

          <div className="flex items-center justify-between gap-2 mt-auto">
            <div className="flex items-center gap-2">
              {question?.isCorrect === false && question?.selectedAnswer ? (
                <ThumbsDown size={20} className="text-secondary" />
              ) : question?.isCorrect === true && question?.selectedAnswer ? (
                <ThumbsUp size={20} className="text-green-500" />
              ) : (
                <X size={20} className="text-primaryText" />
              )}
              <Typography.Base
                variant="medium"
                className="text-secondaryText text-xs sm:text-base"
              >
                {question?.selectedAnswer === "1"
                  ? "You Answered FALSE"
                  : question?.selectedAnswer === "0"
                  ? "You Answered TRUE"
                  : "You didn’t answer"}
              </Typography.Base>
            </div>

            <span
              className={`${
                question?.correctAnswer === "0" ? "bg-[#2CD673]" : "bg-red-500"
              } block sm:hidden rounded-lg px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 text-base sm:text-xl md:text-2xl  w-fit h-fit text-white`}
            >
              {question?.correctAnswer == "0" ? "V" : "F"}
            </span>
          </div>
        </div>

        <span
          className={`${
            question?.correctAnswer === "0" ? "bg-[#2CD673]" : "bg-red-500"
          } hidden sm:block rounded-lg px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 text-base sm:text-xl md:text-2xl  w-fit h-fit text-white`}
        >
          {question?.correctAnswer == "0" ? "V" : "F"}
        </span>
      </div>
    </div>
  );
};

export default QuizReviewCard;
