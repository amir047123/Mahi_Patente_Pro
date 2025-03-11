import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useEffect, useState } from "react";
import {
  AlignJustify,
  ChevronLeft,
  ChevronRight,
  ClockAlert,
} from "lucide-react";
import Typography from "@/Components/Typography";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { baseURL } from "@/Config";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import UserDashboardChooseSignalSummary from "./UserDashboardChooseSignalSummary";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { MdDone } from "react-icons/md";
import TimeLeftModal from "@/Components/UserDashboard/Quiz/TimeLeftModal";
import QuestionLeftModal from "@/Components/UserDashboard/Quiz/QuestionLeftModal";
import QuickSettingsModal from "@/Components/UserDashboard/Quiz/QuickSettingsModal";
import { AntiCheating } from "@/lib/antiCheating";

const UserDasboardChooseSignal = () => {
  const query = useQueryClient();
  const [isSummary, setIsSummary] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(1);
  const [currentQuiz, setCurerntQuiz] = useState({});
  const [quizSession, setQuizSession] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [time, setTime] = useState(900);
  const [skippedAnswer, setSkippedAnswer] = useState(0);
  const [isTimeLeftModalOpen, setIsTimeLeftModalOpen] = useState(false);
  const [isQuestionLeftModalOpen, setIsQuestionLeftModalOpen] = useState(false);
  const [isQuickSettingsModalOpen, setIsQuickSettingsModalOpen] =
    useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasTimer, setHasTimer] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizSession?.quizzes?.length > 0) {
      AntiCheating.init(submitAnswers);
    }

    return () => {
      AntiCheating.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizSession]);

  const getQuizzes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}/quiz-session/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          difficulty: "Easy",
          category: "Choose 4 to 1 Signal",
          hasTimer,
          showAnswer,
        }),
      });
      const data = await response.json();

      const timeToPlay = parseInt(
        (new Date(data?.data?.timeInfo?.end || new Date()) - new Date()) / 1000
      );

      const startQuiz = () => {
        setQuizSession(data?.data);
        hasTimer && setTime(timeToPlay);
        setIsQuickSettingsModalOpen(false);
      };

      if (response.ok) {
        startQuiz();
      } else if (response.status === 409) {
        startQuiz();
        toast.error(data?.message);
      } else {
        throw new Error(data?.message);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to get quizzes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   getQuizzes();
  // }, []);

  useEffect(() => {
    setCurerntQuiz(quizSession?.quizzes?.[currentPosition - 1]);
  }, [currentPosition, quizSession]);

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
    setQuizSession((prev) => ({
      ...prev,
      quizzes: prev?.quizzes?.map((item) => {
        const currentItem = item._id === _id;
        if (currentItem && currentItem?.answer === undefined) {
          return { ...item, answer: answer };
        } else {
          return item;
        }
      }),
    }));
  };

  const submitAnswers = async () => {
    try {
      setIsSubmitting(true);
      const updatedQuizSession = {
        quizzes: quizSession?.quizzes?.map((item) => ({
          _id: item?._id,
          answer: item?.answer,
        })),
      };
      const response = await fetch(
        `${baseURL}/quiz-session/submit/${quizSession._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedQuizSession),
        }
      );
      const data = await response.json();

      if (response.ok) {
        query.invalidateQueries({
          queryKey: ["quiz-session/user-sessions"],
        });
        query.invalidateQueries({
          queryKey: ["dashboard/user"],
        });
        setQuizSession(data?.data);
        setIsSummary(true);
        navigate(
          `/user-dashboard/quiz/choose-4-to-1-signal/${quizSession?._id}`
        );
      } else {
        throw new Error(data?.message);
      }
    } catch (error) {
      toast.error(
        error?.message || "Failed to submit quizzes. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setIsTimeLeftModalOpen(false);
      setIsQuestionLeftModalOpen(false);
    }
  };

  const handleSubmit = async () => {
    const unAnsweredQuestions = quizSession?.quizzes?.filter(
      (item) => (item?.answer ?? "").length === 0
    );

    if (unAnsweredQuestions?.length > 0) {
      setSkippedAnswer(unAnsweredQuestions);
      setIsQuestionLeftModalOpen(true);
      return;
    }

    if (hasTimer && time > 0) {
      setIsTimeLeftModalOpen(true);
      return;
    }

    await submitAnswers();
  };

  useEffect(() => {
    if (hasTimer && !isSubmitting && time === 0) {
      submitAnswers();
      return;
    }

    let timer;

    if (hasTimer && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, hasTimer]);

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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.get("in-progress") !== "yes") {
      setIsQuickSettingsModalOpen(true);
    } else {
      getQuizzes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Choose 4 to 1 Signal", path: "quiz/choose-4-to-1-signal" },
        ]}
      />
      {isLoading ? (
        <div className="py-40 flex items-center justify-center">
          <Spinner size={60} />
        </div>
      ) : (
        <>
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
            {quizSession?.quizzes && quizSession?.quizzes?.length > 0 && (
              <div className="bg-white rounded-2xl px-5 pb-10 col-span-2">
                <div className="flex items-center justify-between md:p-4 p-2 border-b">
                  <div className="flex items-center md:gap-5 gap-2">
                    <Typography.Body
                      variant="medium"
                      className="text-secondaryText whitespace-nowrap"
                    >
                      Question No:
                    </Typography.Body>
                    <button className="px-3 py-2 font-semibold rounded-md border text-secondary">
                      {currentPosition}
                    </button>
                  </div>

                  {hasTimer && (
                    <div className="flex items-center md:gap-5 gap-2">
                      <Typography.Body
                        variant="medium"
                        className="text-secondaryText whitespace-nowrap"
                      >
                        <span className="hidden lg:inline-block">
                          Remaining Time:
                        </span>
                      </Typography.Body>
                      <span className="px-3 font-semibold whitespace-nowrap md:text-xl text-base py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
                        {/* <Clock size={20} /> <QuizTimer /> */}
                        <ClockAlert size={20} /> {formatTime()}
                      </span>
                    </div>
                  )}
                </div>

                <Typography.Body
                  variant="semibold"
                  className="text-secondaryText my-4"
                >
                  Select the right signal
                </Typography.Body>
                <Typography.Body
                  variant="nomal"
                  className="text-primaryText my-4"
                >
                  {currentQuiz?.question}
                </Typography.Body>

                <div className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-3 mt-8">
                  {currentQuiz?.options?.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i, currentQuiz?._id)}
                      className={`py-3 px-7 rounded-lg w-full ${
                        currentQuiz?.answer === i
                          ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                          : "text-primaryText bg-white border"
                      }`}
                    >
                      <img src={option} alt="" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="col-span-1 md:col-span-3 flex justify-between mt-5">
              <div className="flex space-x-2">
                <button className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center text-red-600 gap-2">
                  <IoIosCloseCircleOutline className="text-xl" />

                  <span className="hidden lg:inline-block">Close</span>
                </button>
                <button
                  onClick={() => setIsSummary(true)}
                  className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 gap-2 font-medium"
                >
                  <AlignJustify className="w-4 h-4 mr-1" />

                  <span className="hidden lg:inline-block">Summary</span>
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />

                  <span className="hidden lg:inline-block">Prev</span>
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 font-medium"
                >
                  <span className="hidden lg:inline-block">Next</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white rounded-lg px-4 py-2 shadow-sm flex items-center font-medium justify-center disabled:bg-green-500/70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner size={20} className="text-white" />
                  ) : (
                    <>
                      <span className="hidden lg:inline-block">Submit</span>
                      <MdDone className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <UserDashboardChooseSignalSummary
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            showAnswer={showAnswer}
            hasTimer={hasTimer}
            time={time}
            isSummary={isSummary}
            setIsSummary={setIsSummary}
            quizzes={quizSession?.quizzes}
          />
          <TimeLeftModal
            setIsSummary={setIsSummary}
            submitAnswers={submitAnswers}
            isSubmitting={isSubmitting}
            time={time}
            isOpen={isTimeLeftModalOpen}
            setIsOpen={setIsTimeLeftModalOpen}
          />
          <QuestionLeftModal
            setIsSummary={setIsSummary}
            submitAnswers={submitAnswers}
            isSubmitting={isSubmitting}
            skippedAnswer={skippedAnswer}
            isOpen={isQuestionLeftModalOpen}
            setIsOpen={setIsQuestionLeftModalOpen}
          />
          <QuickSettingsModal
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            hasTimer={hasTimer}
            setHasTimer={setHasTimer}
            isLoading={isLoading}
            getQuizzes={getQuizzes}
            isOpen={isQuickSettingsModalOpen}
            setIsOpen={setIsQuickSettingsModalOpen}
          />
        </>
      )}
    </div>
  );
};

export default UserDasboardChooseSignal;
