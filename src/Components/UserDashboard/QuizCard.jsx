import quizDemo from "@/assets/UserDashboard/quiz-demo-img.svg";
import Typography from "@/Components/Typography";
import { MdGTranslate, MdOutlineBook } from "react-icons/md";
import { AiOutlineSound } from "react-icons/ai";
import { CiBookmarkCheck } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";

const QuizCard = ({ question }) => {
  return (
    <div className="md:grid grid-cols-3 flex items-center gap-4 bg-white rounded-lg p-5">
      <div className="col-span-1">
        <img className="" src={question?.media?.image || quizDemo} alt="img" />
      </div>
      <div className="flex flex-col justify-between col-span-2">
        <div className="flex justify-between">
          <Typography.Body variant="medium" className="text-primaryText mt-2">
            {question?.question}
          </Typography.Body>
          <button className="bg-[#2CD673] rounded-lg px-3.5 py-1.5 md:text-2xl text-xl w-fit h-fit text-white">
            {question?.correctAnswer}
          </button>
        </div>

        <div className="mt-4 flex gap-3 text-gray-600 ml-auto">
          <button className="bg-[#E3FAFF] p-2 border rounded-md">
            <MdGTranslate className="text-lg" />
          </button>
          <button className="bg-[#E3FAFF] p-2 border rounded-md">
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
