import quizDemo from "@/assets/UserDashboard/quiz-demo-img.svg";
import Typography from "@/Components/Typography";
import { ThumbsDown, ThumbsUp, X } from "lucide-react";

const QuizReviewCard = ({ question, quizReviewData }) => {
  return (
    <div className="flex bg-white rounded-lg p-3">
      <div className="">
        <img
          className="rounded-md"
          src={question?.media?.image || quizDemo}
          alt="img"
        />
      </div>

      <div className="flex items-center justify-between col-span-2 w-full pl-6 pr-3">
        <div className="space-y-4">
          <div className="flex-grow">
            <Typography.Base
              variant="medium"
              className="text-secondaryText !text-sm"
            >
              Question No.{" "}
              {quizReviewData?.findIndex(
                (item) => item?._id === question?._id
              ) + 1}
            </Typography.Base>
            <Typography.Heading5
              variant="medium"
              className="text-primaryText mt-1"
            >
              {question?.question}
            </Typography.Heading5>
          </div>

          <div className="flex items-center gap-2 mt-auto">
            {question?.answer !== undefined &&
            String(question?.answer) !== question?.correctAnswer ? (
              <ThumbsDown size={20} className="text-secondary" />
            ) : question?.answer !== undefined &&
              String(question?.answer) === question?.correctAnswer ? (
              <ThumbsUp size={20} className="text-green-500" />
            ) : (
              <X size={20} className="text-primaryText" />
            )}
            <Typography.Base variant="medium" className="text-secondaryText ">
              {question?.answer === 1
                ? "You Answered FALSE"
                : question?.answer === 0
                ? "You Answered TRUE"
                : "You didn’t answer"}
            </Typography.Base>
          </div>
        </div>

        <span
          className={`${
            question?.correctAnswer == 0 ? "bg-[#2CD673]" : "bg-red-500"
          } rounded-lg px-3.5 py-1.5 md:text-2xl text-xl w-fit h-fit text-white`}
        >
          {question?.correctAnswer == 0 ? "V" : "F"}
        </span>
      </div>
    </div>
  );
};

export default QuizReviewCard;
