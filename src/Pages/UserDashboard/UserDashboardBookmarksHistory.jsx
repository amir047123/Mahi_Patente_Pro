import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import ErrorReviewQuestionsCard from "@/Components/UserDashboard/Quiz/ErrorReviewQuestionsCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import textToSpeech from "@/lib/textToSpeech";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import FilterComponent from "@/Shared/FilterComponent";
import ItemPerPage from "@/Shared/ItemPerPage";
import PaginationCompo from "@/Shared/PaginationCompo";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const UserDashboardBookmarksHistory = () => {
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 10,
    totalPages: 1,
  });
  const { useFetchEntities } = useCrudOperations("bookmark/user-bookmarks");

  const { data: response, error, isError, isLoading } = useFetchEntities();

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

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

  console.log(audioRef.current);

  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "Bookmarks", path: "bookmarks" }]}
      />

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        fields={[
          {
            type: "date",
            name: "date",
          },
        ]}
      />

      {isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner size={40} />
        </div>
      ) : response?.data?.bookmarks?.length > 0 ? (
        <div className="">
          {response?.data?.bookmarks?.map((question, index) => (
            <div key={index} className="mb-4">
              <ErrorReviewQuestionsCard
                question={question?.quiz}
                quizReviewData={response?.data?.bookmarks}
                forHistory={true}
                handleAudio={handleAudio}
                isSpeaking={isSpeaking}
                currentQuestion={currentQuestion}
              />
            </div>
          ))}

          <div className="flex justify-between mt-5 p-4 rounded-xl mb-10 bg-white">
            <ItemPerPage
              itemPerPage={filters?.itemPerPage}
              onLimitChange={(newItemPerPage) =>
                setFilters((prev) => ({
                  ...prev,
                  itemPerPage: newItemPerPage,
                  currentPage: 1,
                }))
              }
            />
            <PaginationCompo
              currentPage={filters?.currentPage}
              totalPages={filters?.totalPages}
              onPageChange={(page) =>
                setFilters((prev) => ({ ...prev, currentPage: page }))
              }
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center mt-10">
          <Typography.Body variant="medium">
            No bookmarks questions found!
          </Typography.Body>
        </div>
      )}
    </>
  );
};

export default UserDashboardBookmarksHistory;
