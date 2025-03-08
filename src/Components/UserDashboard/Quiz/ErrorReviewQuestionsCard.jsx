import quizDemo from "@/assets/UserDashboard/quiz-demo-img.svg";
import Typography from "@/Components/Typography";
import textToSpeech from "@/lib/textToSpeech";
import { ThumbsDown, ThumbsUp, X } from "lucide-react";
import { AiOutlineSound } from "react-icons/ai";
import { CiBookmarkCheck } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineBook } from "react-icons/md";
import QuizExplanationModal from "./QuizExplanationModal";
import { useState } from "react";

const ErrorReviewQuestionsCard = ({ question, quizReviewData }) => {
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row w-full bg-white rounded-3xl p-4 border">
      <div className="">
        <div className="sm:w-fit w-full flex items-center justify-center mb-4 sm:mb-0">
          <img
            className="rounded-md"
            src={question?.media?.image || quizDemo}
            alt="img"
          />
        </div>
        <div className="mt-4 mb-4 sm:mb-0 flex items-center justify-center gap-3 text-gray-600 ml-auto w-full">
          <button
            onClick={() => textToSpeech(question?.question)}
            className="bg-[#E3FAFF] p-2 border rounded-md"
          >
            <AiOutlineSound className="text-lg" />
          </button>
          <button
            onClick={() => setIsExplanationModalOpen(true)}
            className="bg-[#E3FAFF] p-2 border rounded-md"
          >
            <MdOutlineBook className="text-lg" />
          </button>
          <button className="bg-[#E3FAFF] p-2 border rounded-md">
            <CiBookmarkCheck className="text-lg" />
          </button>
          <button className="bg-[#E3FAFF] p-2 border rounded-md">
            <LuMessageCircleMore className="text-lg" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 col-span-2 w-full sm:pl-6 sm:pr-3">
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
            <Typography.Heading5
              variant="medium"
              className="text-primaryText mt-1 text-base sm:text-lg"
            >
              {question?.questionBn}
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

      <QuizExplanationModal
        isOpen={isExplanationModalOpen}
        setIsOpen={setIsExplanationModalOpen}
        explanation={question?.explanation}
      />
    </div>
  );
};

export default ErrorReviewQuestionsCard;
