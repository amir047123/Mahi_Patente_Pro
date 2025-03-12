import Typography from "@/Components/Typography";
import {
  Check,
  CircleChevronDown,
  CircleChevronUp,
  ClockAlert,
  X,
} from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import quizImg from "@/assets/UserDashboard/quiz-img.svg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Spinner from "@/Components/ui/Spinner";
import { MdDone } from "react-icons/md";

const UserDashboardQuizSummary = ({
  isSummary,
  setIsSummary,
  quizzes,
  time,
  hasTimer,
  showAnswer,
  handleSubmit,
  isSubmitting,
}) => {
  const summaryTableRef = useRef(null);

  const scrollAmount = 200;

  const handleScrollUp = () => {
    if (summaryTableRef.current) {
      summaryTableRef.current.scrollBy({
        top: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScrollDown = () => {
    if (summaryTableRef.current) {
      summaryTableRef.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isSummary) {
      summaryTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isSummary]);

  const formatTime = () => {
    // const hours = Math.floor(time / 3600)
    //   .toString()
    //   .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`${isSummary ? "" : "hidden"}`}>
      <div className="bg-white  lg:p-8 p-5 rounded-2xl mt-5">
        <div className="flex items-center justify-between">
          <Typography.Heading4 className="text-secondaryText ">
            Summary
          </Typography.Heading4>
          <button onClick={() => setIsSummary(false)}>
            <IoCloseCircleOutline className="text-red-600 text-2xl" />
          </button>
        </div>
        <div className="w-full flex gap-4 items-center">
          <div
            className="w-full overflow-x-auto my-5 max-h-[65vh]"
            ref={summaryTableRef}
          >
            <table className="w-full border-collapse">
              <thead className="sticky top-0">
                <tr className="bg-gray-100">
                  <th className="p-4 border border-gray-300 text-left">No.</th>
                  <th className="p-4 border border-gray-300 text-left">
                    <Typography.Body>Image</Typography.Body>
                  </th>
                  <th className="p-4 border border-gray-300 text-left">
                    <Typography.Body className="whitespace-nowrap">
                      Question Text
                    </Typography.Body>
                  </th>
                  <th className="p-4 border border-gray-300 text-center text-green-500">
                    <Typography.Body>True</Typography.Body>
                  </th>
                  <th className="p-4 border border-gray-300 text-center text-red-500">
                    <Typography.Body>False</Typography.Body>
                  </th>
                </tr>
              </thead>
              <tbody className="max-h-screen">
                {quizzes &&
                  quizzes?.length > 0 &&
                  quizzes?.map((quiz, index) => (
                    <tr
                      key={index}
                      className={`${
                        showAnswer && typeof quiz?.answer === "number"
                          ? `${quiz?.answer}` === quiz?.correctAnswer
                            ? "bg-green-100"
                            : "bg-red-100"
                          : "bg-white"
                      } `}
                    >
                      <td className="p-4 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-4 border border-gray-300">
                        <img
                          className="rounded-md w-24"
                          src={quiz?.media?.image || quizImg}
                          alt="img"
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        {quiz?.question}
                      </td>
                      <td className="p-4 border border-gray-300 text-center">
                        <Check
                          className={`${
                            quiz?.answer === 0
                              ? "inline-block text-green-600"
                              : "hidden"
                          } `}
                          size={24}
                        />
                      </td>
                      <td className="p-4 border border-gray-300">
                        <X
                          className={`${
                            quiz?.answer === 1
                              ? "inline-block text-red-600"
                              : "hidden"
                          } `}
                          size={24}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 justify-center text-[#666666]">
            <button
              className="bg-[#E3FAFF] p-2 border rounded-md"
              onClick={handleScrollUp}
            >
              <CircleChevronUp />
            </button>
            <button
              className="bg-[#E3FAFF] p-2 border rounded-md"
              onClick={handleScrollDown}
            >
              <CircleChevronDown />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-5 text-primaryText">
          <Link
            to="/user-dashboard/quiz"
            className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center text-red-600 gap-2"
          >
            <IoIosCloseCircleOutline className="text-xl" />
            Close Quiz
          </Link>
          {/* <button className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center  gap-2 text-sm">
            <CircleHelp size={18} className="text-sm" />
            Start New Quiz
          </button> */}
        </div>

        <div className="flex items-center gap-4">
          {hasTimer && (
            <div className="flex items-center gap-5">
              <Typography.Body variant="medium" className="text-secondaryText">
                Remaining Time:
              </Typography.Body>
              <button className="px-3 font-semibold text-xl py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
                <ClockAlert size={20} /> {formatTime()}
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white rounded-lg px-4 py-2 shadow-sm flex items-center font-medium w-28 justify-center disabled:bg-green-500/70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner size={20} className="text-white" />
            ) : (
              <>
                Submit
                <MdDone className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardQuizSummary;
