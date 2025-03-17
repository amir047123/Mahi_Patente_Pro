import quizDemo from "@/assets/UserDashboard/quiz-demo-img.svg";
import Typography from "@/Components/Typography";
import { MdGTranslate, MdOutlineBook } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import textToSpeech from "@/lib/textToSpeech";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import languageCodes from "@/lib/languageCodes";
import Spinner from "../ui/Spinner";
import QuizExplanationModal from "./Quiz/QuizExplanationModal";
import QuizNoteModal from "./Quiz/QuizNoteModal";
import { BookMarked, Volume2, Volume1, Headset } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip";

const QuizCard = ({ question }) => {
  const query = useQueryClient();
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [translatedText, setTranslatedText] = useState();
  const [translatedLang, setTranslatedLang] = useState("en");
  const { createEntity: translate } = useCrudOperations("translate");

  const translateText = () => {
    if (!translatedLang) {
      toast.error("Please select a language");
      return;
    }
    translate.mutate(
      { sourceText: question?.question, translatedLang },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          setTranslatedText(data?.data?.translatedText);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

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
    <div className="md:grid grid-cols-3 flex flex-wrap items-center gap-4 bg-white rounded-lg p-5">
      <div className="col-span-1 min-w-[150px] max-w-[300px] object-cover">
        <img
          className="rounded-md"
          src={question?.media?.image || quizDemo}
          alt="img"
        />
      </div>

      <div className="flex flex-col justify-between col-span-2 w-full">
        <div className="flex justify-between gap-4">
          <div>
            <Typography.Body variant="medium" className="text-primaryText mt-2">
              {question?.question}
            </Typography.Body>
            <Typography.Body variant="medium" className="text-primaryText mt-2">
              {question?.questionBn}
            </Typography.Body>
            <Typography.Body variant="medium" className="text-primaryText mt-2">
              {translatedText}
            </Typography.Body>
          </div>

          <span
            className={`${
              question?.correctAnswer == 0 ? "bg-[#2CD673]" : "bg-red-500"
            } rounded-lg px-3.5 py-1 md:text-2xl text-xl w-fit h-fit text-white`}
          >
            {question?.correctAnswer == 0 ? "V" : "F"}
          </span>
        </div>

        <div className="mt-4 flex gap-3 text-gray-600 ml-auto">
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button className="bg-[#E3FAFF] p-2 border rounded-md">
                      {translate?.isPending ? (
                        <Spinner size={16} className="!text-gray-600" />
                      ) : (
                        <MdGTranslate className="text-lg" />
                      )}
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  Translate Question To Other Language
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent className="w-44 p-4">
              <select
                value={translatedLang}
                onChange={(e) => setTranslatedLang(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-2 cursor-pointer"
              >
                {languageCodes.map((option, index) => (
                  <option key={index} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>

              <DropdownMenuItem
                className="flex gap-2 py-2 cursor-pointer justify-center"
                onClick={translateText}
              >
                <MdGTranslate className="text-lg" />
                <span className="font-medium">Translate</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() =>
                    textToSpeech(question?.question, setIsSpeaking)
                  }
                  className={`bg-[#E3FAFF] transition-all duration-300 p-2 border rounded-md ${
                    isSpeaking ? "text-secondary border-secondary" : ""
                  }`}
                >
                  {isSpeaking ? <Volume2 size={18} /> : <Volume1 size={18} />}
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
                    question?.isBookmarked
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`bg-[#E3FAFF] transition-all duration-300 p-2 border rounded-md ${
                    question?.note
                      ? "hover:text-[#b1b1b1]"
                      : "text-[#b1b1b1] hover:text-gray-600"
                  }`}
                >
                  <Headset size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Support
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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

export default QuizCard;
