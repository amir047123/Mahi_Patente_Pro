import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Clock, ChevronLeft, ChevronRight, AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import demoImg from "@/assets/UserDashboard/quiz-img.svg";
import Typography from "@/Components/Typography";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";

const OfficialQuiz = () => {
  const [range, setRange] = useState(0);
  const [position, setPosition] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(1);

  // useEffect(() => {
  //   setPosition(1);
  //   setCurrentPosition(range * 10 + 1);
  // }, [range]);

  // useEffect(() => {
  //   setCurrentPosition(range * 10 + position);
  // }, [position, range]);

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
  }, [currentPosition]);

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

  console.log("Position ", position);
  console.log("Range ", range);
  console.log("CurrentPosition ", currentPosition);

  const { useFetchEntities } = useCrudOperations("quiz/get-30-questions");

  const { data, isLoading, isSuccess, isError, error } = useFetchEntities();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (isError && !isLoading) {
      toast.error(error?.message);
    }

    if (isSuccess && data?.success) {
      setQuizzes(data?.data);
    }
  }, [isError, isLoading, data, error, isSuccess]);

  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Official Quiz", path: "quiz/official-quiz" },
        ]}
      />
      <div className="">
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
              {num}
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
                className={`text-[#9CA3AF] bg-white rounded-sm w-[29px] h-[23px] flex items-center justify-center text-[12px] font-medium ${
                  currentPosition === num ? "bg-[#CB2A8A] text-white" : ""
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {quizzes && quizzes?.length > 0 && (
          <div className="grid grid-cols-3 gap-5 mt-5">
            <div className="col-span-1 bg-white rounded-lg overflow-hidden">
              <img
                className="mx-auto"
                src={quizzes[currentPosition - 1]?.media?.image || demoImg}
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

                <div className="p-4">
                  <Typography.Body>
                    {quizzes[currentPosition - 1]?.question}
                  </Typography.Body>
                </div>
              </div>

              <div className="w-full flex items-center gap-5 px-4">
                <button className="w-full  flex items-center justify-center py-2.5 rounded-full bg-[#E3FAFF] text-green-500 font-medium gap-2 border">
                  <CiCircleCheck className="text-xl" /> True
                </button>
                <button className="w-full flex items-center justify-center py-2.5 rounded-full bg-[#E3FAFF] text-red-500 font-medium gap-2 border">
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
            <Link
              to="/user-dashboard/quiz/summary"
              className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 gap-2 font-medium"
            >
              <AlignJustify className="w-4 h-4 mr-1" />
              Summary
            </Link>
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
    </>
  );
};

export default OfficialQuiz;
