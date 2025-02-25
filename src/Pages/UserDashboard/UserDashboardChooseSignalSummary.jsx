import Typography from "@/Components/Typography";
import {
  CircleChevronDown,
  CircleChevronUp,
  CircleHelp,
  Clock,
} from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const UserDashboardChooseSignalSummary = ({
  isSummary,
  setIsSummary,
  quizzes,
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
                  <th className="p-1 px-2 border border-gray-300 text-left text-secondaryText font-normal">
                    No.
                  </th>
                  <th className="p-1 px-2 border border-gray-300 text-left text-secondaryText  font-normal">
                    <Typography.Body>
                      Question and Images - Selected the right signal
                    </Typography.Body>
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
                        typeof quiz?.answer === "number"
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
                        <Typography.Body
                          variant="nomal"
                          className="text-primaryText"
                        >
                          {quiz?.question}
                        </Typography.Body>

                        <div className="flex justify-center md:gap-5 gap-3 mt-4">
                          {quiz?.options?.map((option, i) => (
                            <div
                              key={i}
                              className={`p-2 rounded-lg w-20 ${
                                quiz?.answer === i
                                  ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                                  : "text-primaryText bg-white border"
                              }`}
                            >
                              <img src={option} alt="" className="" />
                            </div>
                          ))}
                        </div>
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
          <button className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center  gap-2 text-sm">
            <CircleHelp size={18} className="text-sm" />
            Start New Quiz
          </button>
        </div>

        <div className="flex items-center gap-5">
          <Typography.Body variant="medium" className="text-secondaryText">
            Remaining Time:
          </Typography.Body>
          <button className="px-3 font-semibold text-xl py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
            <Clock size={20} /> 32 : 31
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardChooseSignalSummary;
