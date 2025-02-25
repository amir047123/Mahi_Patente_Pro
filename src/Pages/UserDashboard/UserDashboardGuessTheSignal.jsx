import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useEffect, useState } from "react";
import { AlignJustify, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import Typography from "@/Components/Typography";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Spinner from "@/Components/ui/Spinner";
import { baseURL } from "@/Config";
import toast from "react-hot-toast";
import UserDashboardGuessTheSignalSummary from "./UserDashboardGuessTheSignalSummary";

const UserDashboardGuessTheSignal = () => {
  const [isSummary, setIsSummary] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [currentQuiz, setCurerntQuiz] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuizzes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseURL}/quiz/get-questions?category=Guess the Signal&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    setCurerntQuiz(quizzes[currentPosition - 1]);
  }, [currentPosition, quizzes]);

  const handleNext = () => {
    if (currentPosition >= 10) return;
    if (currentPosition < 10) {
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

  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Guess the Signal", path: "quiz/guess-the-signal" },
        ]}
      />

      {isLoading ? (
        <div className="py-40 flex items-center justify-center">
          <Spinner size={60} />
        </div>
      ) : (
        <>
          {" "}
          <div className={`${isSummary ? "hidden" : ""}`}>
            <div className="col-span-1 md:col-span-3 grid grid-cols-5 md:grid-cols-10 gap-2 bg-[#E5E7EB] p-3 rounded-lg my-5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  onClick={() => setCurrentPosition(num)}
                  key={num}
                  className={`rounded-lg bg-white py-1.5 font-semibold text-2xl shadow-sm text-center 
                ${
                  num === currentPosition
                    ? " text-[#CB2A8A]"
                    : " text-[#9CA3AF]"
                }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
              <div className="bg-white rounded-2xl p-5 col-span-1">
                <img
                  className="w-full"
                  src={currentQuiz?.media?.image}
                  alt="image"
                />
              </div>
              <div className="bg-white rounded-2xl px-5 col-span-2 pb-10">
                <div className="flex items-center justify-between md:p-4 p-2 border-b">
                  <div className="flex items-center md:gap-5 gap-2">
                    <Typography.Body
                      variant="medium"
                      className="text-secondaryText whitespace-nowrap"
                    >
                      <span className="hidden md:inline-block">Question</span>{" "}
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

                <Typography.Body
                  variant="semibold"
                  className="text-secondaryText my-4"
                >
                  {currentQuiz?.question}
                </Typography.Body>

                <div className="grid sm:grid-cols-2 grid-cols-1 md:gap-5 gap-3 mt-8">
                  {currentQuiz?.options?.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i, currentQuiz?._id)}
                      className={`py-3 md:px-7 px-2 rounded-lg w-full ${
                        currentQuiz?.answer === i
                          ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                          : "text-primaryText bg-white border"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

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
          <UserDashboardGuessTheSignalSummary
            isSummary={isSummary}
            setIsSummary={setIsSummary}
            quizzes={quizzes}
          />
        </>
      )}
    </div>
  );
};

export default UserDashboardGuessTheSignal;
