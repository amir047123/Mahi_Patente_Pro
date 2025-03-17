import quizDemo from "@/assets/UserDashboard/quiz-demo-img.svg";
import Typography from "@/Components/Typography";
import {
  BookMarked,
  ThumbsDown,
  ThumbsUp,
  Volume1,
  Volume2,
  X,
} from "lucide-react";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineBook } from "react-icons/md";
import QuizExplanationModal from "./QuizExplanationModal";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip";
import QuizNoteModal from "./QuizNoteModal";
import toast from "react-hot-toast";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";

const ErrorReviewQuestionsCard = ({
  question,
  quizReviewData,
  forHistory = false,
  handleAudio,
  isSpeaking,
  currentQuestion,
}) => {
  const query = useQueryClient();
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const { updateEntity } = useCrudOperations("bookmark");

  const addOrRemoveBookmark = () => {
    updateEntity.mutate(
      { _id: question?._id },
      {
        onSuccess: (data) => {
          query.invalidateQueries({
            queryKey: ["quiz"],
          });
          query.invalidateQueries({
            queryKey: ["quiz-session/user-session"],
          });
          query.invalidateQueries({
            queryKey: ["bookmark/user-bookmarks"],
          });
          toast.success(data?.message);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleAudio(question)}
                  className={`bg-[#E3FAFF] transition-all duration-300 p-2 border rounded-md ${
                    isSpeaking && currentQuestion?._id === question?._id
                      ? "text-secondary border-secondary"
                      : ""
                  }`}
                >
                  {isSpeaking && currentQuestion?._id === question?._id ? (
                    <Volume2 size={18} />
                  ) : (
                    <Volume1 size={18} />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Listen To The Question
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={!question?.explanation}
                  onClick={() => setIsExplanationModalOpen(true)}
                  className={`bg-[#E3FAFF] p-2 border rounded-md ${
                    !question?.explanation ? "cursor-not-allowed" : ""
                  }`}
                >
                  <MdOutlineBook
                    className={`text-lg  ${
                      !question?.explanation
                        ? "cursor-not-allowed text-[#b1b1b1]"
                        : ""
                    }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                View Question Explanation
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={addOrRemoveBookmark}
                  className={`bg-[#E3FAFF] transition-all duration-300 p-2 border rounded-md ${
                    question?.isBookmarked || forHistory
                      ? "hover:text-[#b1b1b1]"
                      : "text-[#b1b1b1] hover:text-gray-600"
                  }`}
                >
                  <BookMarked size={18} className="text-sm" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Add/Remove Bookmark
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsNotesModalOpen(true)}
                  className={`bg-[#E3FAFF] transition-all duration-300 p-2 border rounded-md ${
                    question?.note
                      ? "hover:text-[#b1b1b1]"
                      : "text-[#b1b1b1] hover:text-gray-600"
                  }`}
                >
                  <LuMessageCircleMore className="text-lg" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                View/Add Notes
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              {forHistory
                ? quizReviewData?.findIndex(
                    (item) => item?.quiz?._id === question?._id
                  ) + 1
                : quizReviewData?.findIndex(
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
            {forHistory ? (
              "Chapter and Sbubject Data"
            ) : (
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
            )}

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

      <QuizNoteModal
        isOpen={isNotesModalOpen}
        setIsOpen={setIsNotesModalOpen}
        question={question?._id}
        notes={question?.note}
      />
    </div>
  );
};

export default ErrorReviewQuestionsCard;
