import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import {
  ChevronLeft,
  ChevronRight,
  AlignJustify,
  ClockAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import demoImg from "@/assets/UserDashboard/quiz-img.svg";
import Typography from "@/Components/Typography";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { baseURL } from "@/Config";
import Spinner from "@/Components/ui/Spinner";
import UserDashboardQuizSummary from "@/Pages/UserDashboard/UserDashboardQuizSummary";
import { MdDone } from "react-icons/md";
import TimeLeftModal from "./TimeLeftModal";
import QuestionLeftModal from "./QuestionLeftModal";
import { useQueryClient } from "@tanstack/react-query";
import QuickSettingsModal from "./QuickSettingsModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { AntiCheating } from "@/lib/antiCheating";

const OfficialQuiz = () => {
  const query = useQueryClient();
  const { subject } = useParams();
  const [isSummary, setIsSummary] = useState(false);
  const [range, setRange] = useState(0);
  const [position, setPosition] = useState(1);
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
  const [chapters, setChapters] = useState([]);
  const [subjects] = useState([]);
  const [navigateUrl, setNavigateUrl] = useState(
    `/user-dashboard/quiz/official-quiz/${quizSession?._id}`
  );
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Quiz", path: "quiz" },
    { name: "Official Quiz", path: "quiz/official-quiz" },
  ]);

  const selectedChapters = new URLSearchParams(window.location.search).get(
    "chapters"
  );

  useEffect(() => {
    if (selectedChapters) {
      setChapters(
        selectedChapters.split(",").map((chapter) => chapter.trim()) || []
      );
    } else {
      setChapters([]);
    }
  }, [selectedChapters]);

  const { useFetchEntities } = useCrudOperations("quiz");

  const { data: response, isSuccess } = useFetchEntities({ subject: subject });

  useEffect(() => {
    if (isSuccess && response?.success) {
      setBreadCrumbData([
        { name: "Theory", path: "theory" },
        {
          name: `${response?.data?.chapter?.name}`,
          path: `theory/${response?.data?.chapter?._id}`,
        },
        {
          name: `${response?.data?.subject?.name}`,
          path: `theory/${response?.data?.chapter?._id}/${response?.data?.subject?._id}`,
        },
        {
          name: `Official Quiz`,
          path: `theory/${response?.data?.chapter?._id}/${response?.data?.subject?._id}/official-quiz`,
        },
      ]);
    }

    if (subject && isSuccess && response?.success) {
      setNavigateUrl(
        `/user-dashboard/theory/${response?.data?.chapter?._id}/${response?.data?.subject?._id}/official-quiz/${quizSession?._id}`
      );
    } else {
      setNavigateUrl(`/user-dashboard/quiz/official-quiz/${quizSession?._id}`);
    }
  }, [isSuccess, response, quizSession, subject]);

  useEffect(() => {
    if (quizSession?.quizzes?.length > 0) {
      AntiCheating.init(submitAnswers);
    }

    return () => {
      AntiCheating.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizSession, navigateUrl]);

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
          category: "Theory",
          hasTimer,
          showAnswer,
          subjects: subject ? [subject] : subjects,
          chapters,
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

    setCurerntQuiz(quizSession?.quizzes?.[currentPosition - 1]);
  }, [currentPosition, quizSession]);

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

        navigate(navigateUrl);
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
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
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
    <>
      <DashboardBreadcrumb role="user" items={breadCrumbData} />
      <>
        <div className={`${isSummary ? "hidden" : ""}`}>
          <div className="grid grid-cols-3 mt-5">
            <button
              onClick={() => setRange(0)}
              className={`text-secondaryText p-3 whitespace-nowrap rounded-t-lg ${
                range === 0 ? "bg-[#E5E7EB] !text-secondary" : ""
              }`}
            >
              <div className="bg-white rounded-lg md:px-10 px-3 py-2.5 font-semibold">
                <span className="lg:block hidden">Question 1 to 10</span>
                <span className="lg:hidden block">1-10</span>
              </div>
            </button>
            <button
              onClick={() => setRange(1)}
              className={`text-secondaryText p-3 whitespace-nowrap rounded-t-lg ${
                range === 1 ? "bg-[#E5E7EB] !text-secondary" : ""
              }`}
            >
              <div className="bg-white rounded-lg md:px-10 px-3 py-2.5 font-semibold">
                <span className="lg:block hidden">Question 11 to 20</span>
                <span className="lg:hidden block">11-20</span>
              </div>
            </button>
            <button
              onClick={() => setRange(2)}
              className={`text-secondaryText p-3 whitespace-nowrap rounded-t-lg ${
                range === 2 ? "bg-[#E5E7EB] !text-secondary" : ""
              }`}
            >
              <div className="bg-white rounded-lg md:px-10 px-3 py-2.5 font-semibold">
                <span className="lg:block hidden">Question 21 to 30</span>
                <span className="lg:hidden block">21-30</span>
              </div>
            </button>
          </div>

          {/* Question number buttons */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-5 lg:grid-cols-10 gap-2 bg-[#E5E7EB] p-3 rounded-r-lg rounded-bl-lg">
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

          <div className="col-span-1 md:col-span-3  items-center space-x-1 overflow-x-auto bg-[#E5E7EB] p-3 mt-3 rounded-md hidden xl:flex ">
            {[...Array(30)].map((_, i) => {
              const num = i + 1;

              return (
                <button
                  onClick={() => setCurrentPosition(num)}
                  key={num}
                  className={`text-[#9CA3AF] px-1.5 rounded-sm w-[29px] h-[23px] flex items-center justify-center text-[12px] font-medium ${
                    currentPosition === num
                      ? "border-2 border-red-500 text-black"
                      : ""
                  } ${
                    currentPosition !== num &&
                    quizSession?.quizzes?.[i]?.answer === 0
                      ? "bg-green-500 text-white"
                      : currentPosition !== num &&
                        quizSession?.quizzes?.[i]?.answer === 1
                      ? "bg-red-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {quizSession?.quizzes && quizSession?.quizzes?.length > 0 && (
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-5 gap-y-5 mt-5">
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
                        <span className="hidden md:inline-block">Question</span>{" "}
                        No.
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
                            {" "}
                            Remaining Time:
                          </span>
                        </Typography.Body>
                        <span className="px-3 font-semibold whitespace-nowrap md:text-xl text-base py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
                          <ClockAlert size={20} /> {formatTime()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <Typography.Body>{currentQuiz?.question}</Typography.Body>
                  </div>
                </div>

                <div className="w-full flex items-center gap-5 px-4">
                  <button
                    onClick={() =>
                      currentQuiz?.answer === undefined &&
                      handleAnswer(0, currentQuiz?._id)
                    }
                    className={`w-full  flex items-center justify-center py-2.5 rounded-full bg-[#E3FAFF] text-green-500 font-medium gap-2 border ${
                      currentQuiz?.answer === 0 ? "bg-green-500 text-white" : ""
                    }`}
                  >
                    <CiCircleCheck className="text-xl" /> True
                  </button>
                  <button
                    onClick={() =>
                      currentQuiz?.answer === undefined &&
                      handleAnswer(1, currentQuiz?._id)
                    }
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
              <Link
                to="/user-dashboard/quiz"
                className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center text-red-600 gap-2"
              >
                <IoIosCloseCircleOutline className="text-xl" />

                <span className="hidden lg:inline-block">Close Quiz</span>
              </Link>
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
                className="bg-green-500 text-white rounded-lg px-4 py-2 shadow-sm flex items-center font-medium w-28 justify-center disabled:bg-green-500/70 disabled:cursor-not-allowed"
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

        <UserDashboardQuizSummary
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
    </>
  );
};

export default OfficialQuiz;
