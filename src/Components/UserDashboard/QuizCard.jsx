import quizDemo from "@/assets/UserDashboard/quiz-demo-img.svg";
import Typography from "@/Components/Typography";
import { MdGTranslate, MdOutlineBook } from "react-icons/md";
import { AiOutlineSound } from "react-icons/ai";
import { CiBookmarkCheck } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";
import textToSpeech from "@/lib/textToSpeech";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import languageCodes from "@/lib/languageCodes";

const QuizCard = ({ question }) => {
  const [translatedText, setTranslatedText] = useState();
  const { createEntity: translate } = useCrudOperations("translate");
  const [translatedLang, setTranslatedLang] = useState("bn");

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

  return (
    <div className="md:grid grid-cols-3 flex items-center gap-4 bg-white rounded-lg p-5">
      <div className="col-span-1 min-w-[150px]">
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
            } rounded-lg px-3.5 py-1.5 md:text-2xl text-xl w-fit h-fit text-white`}
          >
            {question?.correctAnswer == 0 ? "True" : "False"}
          </span>
        </div>

        <div className="mt-4 flex gap-3 text-gray-600 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-[#E3FAFF] p-2 border rounded-md">
                <MdGTranslate className="text-lg" />
              </button>
            </DropdownMenuTrigger>
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
          <button
            onClick={() => textToSpeech(question?.question)}
            className="bg-[#E3FAFF] p-2 border rounded-md"
          >
            <AiOutlineSound className="text-lg" />
          </button>
          <button className="bg-[#E3FAFF] p-2 border rounded-md">
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
    </div>
  );
};

export default QuizCard;
