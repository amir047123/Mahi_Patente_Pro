import Typography from "@/Components/Typography";
import QuizCard from "@/Components/UserDashboard/QuizCard";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import textToSpeech from "@/lib/textToSpeech";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import notUploaded from "@/assets/UserDashboard/no-prev.jpg";

const UserDashboardSubjectDetails = () => {
  const query = useQueryClient();
  const [showPlayer, setShowPlayer] = useState(false);
  const { subject } = useParams();
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Theory", path: "theory" },
  ]);

  const { useFetchEntities } = useCrudOperations("quiz");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities({ subject: subject });

  useEffect(() => {
    if (isSuccess && response?.success) {
      setBreadCrumbData([
        { name: "Theory", path: "theory" },
        {
          name: `Chapter`,
          path: `theory/${response?.data?.chapter?._id}`,
        },
        {
          name: `Subject`,
          path: `theory/${response?.data?.chapter?._id}/${response?.data?.subject?._id}`,
        },
      ]);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const { updateEntity } = useCrudOperations("subject/complete");

  const markAsComplete = () => {
    updateEntity.mutate(
      { _id: response?.data?.subject?._id },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          query.invalidateQueries({
            queryKey: ["subject/all"],
          });
          query.invalidateQueries({
            queryKey: ["quiz-chapter/all"],
          });
          query.invalidateQueries({
            queryKey: ["quiz"],
          });
          query.invalidateQueries({
            queryKey: ["subject", response?.data?.chapter?._id],
          });
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const audioRef = useRef(null);

  const handleAudio = (question) => {
    setCurrentQuestion(question);
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current = new Audio(question?.media?.sound);

    textToSpeech(
      question?.question,
      question?.media?.sound,
      audioRef,
      isSpeaking,
      setIsSpeaking
    );
  };

  return (
    <>
      <DashboardBreadcrumb role="user" items={breadCrumbData} />

      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner size={40} />
        </div>
      ) : (
        <>
          {response?.data?.subject && (
            <div className="py-5 border-b mb-5 flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-2/3">
                <div className="gap-4 flex items-center">
                  <img
                    className="h-[100px] object-cover rounded-xl"
                    src={response?.data?.subject?.image || chapterImg}
                    alt="image"
                  />

                  <div>
                    <Typography.Heading3
                      className="text-primaryText leading-7 mt-2 line-clamp-1"
                      variant="semibold"
                    >
                      {response?.data?.subject?.name}
                    </Typography.Heading3>
                    <p
                      className={`font-medium  whitespace-nowrap rounded-full text-white py-1.5 px-6 w-fit text-sm mt-5 ${
                        response?.data?.subject?.isCompleted
                          ? "bg-[#2ACCB0]"
                          : "bg-blue-600"
                      }`}
                    >
                      {response?.data?.subject?.isCompleted
                        ? "Completed"
                        : "In Progress"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full mt-4">
                  <button
                    disabled={updateEntity?.isPending}
                    onClick={markAsComplete}
                    className={` whitespace-nowrap bg-transparent hover:bg-gray-100 w-full font-semibold rounded-full text-secondary py-3 px-4 text-sm transition-all flex items-center justify-center border border-slate-300 ${
                      response?.data?.subject?.isCompleted ? "hidden" : ""
                    }`}
                  >
                    {updateEntity?.isPending ? (
                      <Spinner size={20} className="text-white" />
                    ) : (
                      "Mark as complete"
                    )}
                  </button>
                  <Link
                    to={`/user-dashboard/theory/${response?.data?.chapter?._id}/${response?.data?.subject?._id}/official-quiz`}
                    className={`whitespace-nowrap bg-secondary hover:bg-secondary/80 font-medium rounded-full text-white py-3 px-6 text-sm text-center ${
                      response?.data?.subject?.isCompleted
                        ? "min-w-[200px]"
                        : "w-full"
                    }`}
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>

              <div className="w-full sm:w:1/3 max-h-40 flex items-center justify-center mt-6 sm:mt-0 sm:justify-end overflow-hidden">
                {response?.data?.subject?.videoId ? (
                  !showPlayer ? (
                    <img
                      src={`https://img.youtube.com/vi/${response?.data?.subject?.videoId}/hqdefault.jpg`}
                      alt="Video Thumbnail"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPlayer(true)}
                      className="sm:h-full rounded-lg object-scale-down"
                    />
                  ) : (
                    <iframe
                      className="h-full rounded-lg"
                      title="video"
                      src={`https://www.youtube.com/embed/${response?.data?.subject?.videoId}`}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )
                ) : (
                  <img
                    src={notUploaded}
                    alt="not uploaded"
                    className="sm:h-full rounded-lg"
                  />
                )}
              </div>
            </div>
          )}
          {response?.data?.questions?.length > 0 ? (
            <div className="space-y-4">
              {response?.data?.questions?.map((question, index) => (
                <QuizCard
                  key={index}
                  question={question}
                  handleAudio={handleAudio}
                  isSpeaking={isSpeaking}
                  currentQuestion={currentQuestion}
                />
              ))}
            </div>
          ) : (
            <p className="text-center mt-10">No questions found!</p>
          )}
        </>
      )}
    </>
  );
};

export default UserDashboardSubjectDetails;
