import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  AlignJustify,
  Check,
  CircleHelp,
  X,
  CircleChevronDown,
  CircleChevronUp,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import demoImg from "@/assets/UserDashboard/quiz-img.svg";
import Typography from "@/Components/Typography";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";
import quizImg from "@/assets/UserDashboard/quiz-img.svg";
import { baseURL } from "@/Config";
// import { AntiCheating } from "@/lib/antiCheating";

const OfficialQuiz = () => {
  const [isSummary, setIsSummary] = useState(false);
  const [range, setRange] = useState(0);
  const [position, setPosition] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [currentQuiz, setCurerntQuiz] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   AntiCheating.init();
  //   AntiCheating.startTimer(1, () => console.log("Auto-submitting quiz..."));
  // }, []);

  const getQuizzes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}/quiz/get-30-questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setQuizzes(data?.data);
      } else {
        throw new Error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to get quizzes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  useEffect(() => {
    if (currentPosition <= 10) {
      setRange(0);
      setPosition(currentPosition);
    } else if (currentPosition <= 20 && currentPosition > 10) {
      setRange(1);
      setPosition(currentPosition - 10);
    } else {
      setRange(2);
      setPosition(currentPosition - 20);
    }

    setCurerntQuiz(quizzes[currentPosition - 1]);
  }, [currentPosition, quizzes]);

  const handleNext = () => {
    if (currentPosition >= 30) return;
    if (currentPosition < 30) {
      setCurrentPosition((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPosition <= 1) return;
    if (currentPosition > 1) {
      setCurrentPosition((prev) => prev - 1);
    }
  };

  const handleAnswer = (answer, _id) => {
    setQuizzes((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, answer: answer } : item
      )
    );
    return;
  };

  console.log(quizzes);

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
    <>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Official Quiz", path: "quiz/official-quiz" },
        ]}
      />

      {isLoading ? (
        <div className="py-40 flex items-center justify-center">
          <LoaderCircle size={60} className="animate-spin text-green-600" />
        </div>
      ) : (
        <>
          <div className={`${isSummary ? "hidden" : ""}`}>
            <div className="grid grid-cols-3">
              <button
                onClick={() => setRange(0)}
                className={`text-secondaryText p-3 rounded-t-lg ${
                  range === 0 ? "bg-[#E5E7EB] !text-secondary" : ""
                }`}
              >
                <div className="bg-white rounded-lg px-10 py-2.5 font-semibold">
                  Question 1 to 10
                </div>
              </button>
              <button
                onClick={() => setRange(1)}
                className={`text-secondaryText p-3 rounded-t-lg ${
                  range === 1 ? "bg-[#E5E7EB] !text-secondary" : ""
                }`}
              >
                <div className="bg-white rounded-lg px-10 py-2.5 font-semibold">
                  Question 11 to 20
                </div>
              </button>
              <button
                onClick={() => setRange(2)}
                className={`text-secondaryText p-3 rounded-t-lg ${
                  range === 2 ? "bg-[#E5E7EB] !text-secondary" : ""
                }`}
              >
                <div className="bg-white rounded-lg px-10 py-2.5 font-semibold">
                  Question 21 to 30
                </div>
              </button>
            </div>

            {/* Question number buttons */}
            <div className="col-span-1 md:col-span-3 grid grid-cols-5 md:grid-cols-10 gap-2 bg-[#E5E7EB] p-3 rounded-r-lg rounded-bl-lg">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  onClick={() => {
                    setPosition(num);
                    setCurrentPosition(range * 10 + num);
                  }}
                  key={num}
                  className={`rounded-lg bg-white py-2 font-semibold text-2xl shadow-sm text-center 
                ${num === position ? " text-[#CB2A8A]" : " text-[#9CA3AF]"}`}
                >
                  {10 * range + num}
                </button>
              ))}
            </div>

            <div className="col-span-1 md:col-span-3 flex items-center space-x-1 overflow-x-auto bg-[#E5E7EB] p-3 mt-3 rounded-md">
              {[...Array(30)].map((_, i) => {
                const num = i + 1;

                return (
                  <button
                    onClick={() => setCurrentPosition(num)}
                    key={num}
                    className={`text-[#9CA3AF]  rounded-sm w-[29px] h-[23px] flex items-center justify-center text-[12px] font-medium ${
                      currentPosition === num
                        ? "border-2 border-red-500 text-black"
                        : ""
                    } ${
                      currentPosition !== num && quizzes[i]?.answer === 0
                        ? "bg-green-500 text-white"
                        : currentPosition !== num && quizzes[i]?.answer === 1
                        ? "bg-red-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            {quizzes && quizzes?.length > 0 && (
              <div className="grid grid-cols-3 gap-5 mt-5">
                <div className="col-span-1 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    className="rounded-md"
                    src={currentQuiz?.media?.image || demoImg}
                    alt=""
                  />
                </div>
                <div className="col-span-2 bg-white rounded-lg flex flex-col justify-between pb-5">
                  <div>
                    <div className="flex items-center justify-between md:p-4 p-2 border-b">
                      <div className="flex items-center md:gap-5 gap-2">
                        <Typography.Body
                          variant="medium"
                          className="text-secondaryText whitespace-nowrap"
                        >
                          <span className="hidden md:inline-block">
                            Question
                          </span>{" "}
                          No.
                        </Typography.Body>
                        <button className="px-3 py-2 font-semibold rounded-md border text-secondary">
                          {currentPosition}
                        </button>
                      </div>

                      <div className="flex items-center md:gap-5 gap-2">
                        <Typography.Body
                          variant="medium"
                          className="text-secondaryText whitespace-nowrap"
                        >
                          Remaining Time:
                        </Typography.Body>
                        <button className="px-3 font-semibold whitespace-nowrap md:text-xl text-base py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
                          <Clock size={20} /> 32 : 31
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <Typography.Body>{currentQuiz?.question}</Typography.Body>
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-5 px-4">
                    <button
                      onClick={() => handleAnswer(0, currentQuiz?._id)}
                      className={`w-full  flex items-center justify-center py-2.5 rounded-full bg-[#E3FAFF] text-green-500 font-medium gap-2 border ${
                        currentQuiz?.answer === 0
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                    >
                      <CiCircleCheck className="text-xl" /> True
                    </button>
                    <button
                      onClick={() => handleAnswer(1, currentQuiz?._id)}
                      className={`w-full flex items-center justify-center py-2.5 rounded-full bg-[#E3FAFF] text-red-500 font-medium gap-2 border ${
                        currentQuiz?.answer === 1 ? "bg-red-500 text-white" : ""
                      }`}
                    >
                      <IoIosCloseCircleOutline className="text-xl" /> False
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* prev and next btn */}
            <div className="col-span-1 md:col-span-3 flex justify-between mt-5">
              <div className="flex space-x-2">
                <button className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center text-red-600 gap-2">
                  <IoIosCloseCircleOutline className="text-xl" />
                  Close
                </button>
                <button
                  onClick={() => setIsSummary(true)}
                  className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 gap-2 font-medium"
                >
                  <AlignJustify className="w-4 h-4 mr-1" />
                  Summary
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 font-medium"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

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
                        <th className="p-4 border border-gray-300 text-left">
                          No.
                        </th>
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
                <button className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center  gap-2 text-sm">
                  <CircleHelp size={18} className="text-sm" />
                  Start New Quiz
                </button>
              </div>

              <div className="flex items-center gap-5">
                <Typography.Body
                  variant="medium"
                  className="text-secondaryText"
                >
                  Remaining Time:
                </Typography.Body>
                <button className="px-3 font-semibold text-xl py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
                  <Clock size={20} /> 32 : 31
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OfficialQuiz;
