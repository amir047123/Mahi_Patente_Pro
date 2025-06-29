import Typography from "@/Components/Typography";
import FastManiaCategoryCard from "@/Components/UserDashboard/Quiz/FastManiaCategoryCard";
import MinisterialQuizCard from "@/Components/UserDashboard/Quiz/MinisterialQuizCard";
import * as Tabs from "@radix-ui/react-tabs";
import { ListChecks, TimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import demoImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import demoImg2 from "@/assets/UserDashboard/subject-demo-img.svg";
import MinisterialCategoryCard from "@/Components/UserDashboard/Quiz/MinisterialCategoryCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import UserDashboardFeedQuizQuestion from "./UserDashboardFeedQuizQuestion";

const UserDashboardQuizLayout = () => {
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [tab, setTab] = useState("fastMania");
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 12,
    totalPages: 1,
  });
  const [chapters, setChapters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const activeTab =
    "data-[state=active]:text-primary data-[state=active]:!font-semibold data-[state=active]:border-b-4 data-[state=active]:border-primary";

  const fastManiaCardsData = [
    {
      id: 1,
      title: "Guess the Signal",
      description: "Guess the Signal",
      icon: "Signpost",
      time: "10 min",
      path: "guess-the-signal",
      bgColor: "bg-[#FFB27D]",
      timeBGColor: "bg-[#E8A477]",
    },
    {
      id: 2,
      title: "Choose 4 to 1 Signal",
      description: "Choose 4 to 1 Signal",
      icon: "Grid2x2Check",
      time: "10 min",
      path: "choose-4-to-1-signal",
      bgColor: "bg-[#91E0E0]",
      timeBGColor: "bg-[#85CDD0]",
    },
    {
      id: 3,
      title: "Comming Soon",
      description: "Comming Soon",
      icon: "Grid2x2Check",
      time: "10 min",
      path: "",
      bgColor: "bg-[#E0E091]",
      timeBGColor: "bg-[#BDBD7D]",
    },
  ];

  const ministerialCategoryData = [
    {
      id: 1,
      title: "Official Quiz",
      description: "Simulate a Ministerial Quiz as if you were taking an exam.",
      slug: "official-quiz",
      icon: demoImg,
      time: "30 min",
      questions: 30,
      bgColor: "#FCFFD9",
    },
    {
      id: 2,
      title: "Error Review",
      description: "Make a quiz with all the mistakes you made.",
      slug: "error-review",
      icon: demoImg2,
      time: "30 min",
      questions: 30,
      bgColor: "#F7ECDF",
    },
  ];

  const { useFetchEntities } = useCrudOperations("quiz-chapter/all");

  const {
    data: response,
    error,
    isError,
    isLoading,
    isSuccess,
    isRefetching,
  } = useFetchEntities(filters);

  const loadMore = () => {
    setFilters((prev) => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));
  };

  useEffect(() => {
    if (isSuccess && response?.success) {
      setFilters((prev) => ({
        ...prev,
        totalPages: response?.data?.totalPages || 1,
      }));

      setChapters((prevChapters) => {
        const newChapters = response?.data?.chapters || [];
        const mergedChapters = [
          ...prevChapters,
          ...newChapters.filter(
            (newC) => !prevChapters.some((prevC) => prevC._id === newC._id)
          ),
        ];

        return filters.currentPage === 1 ? newChapters : mergedChapters;
      });

      if (response?.data?.currentPage < response?.data?.totalPages) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const navigate = useNavigate();

  const handleQuizStart = () => {
    if (selectedChapters.length === 0) {
      toast.error("Please select at least one chapter");
      return;
    }
    navigate(`/user-dashboard/quiz/official-quiz?chapters=${selectedChapters}`);
  };

  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "Quiz", path: "quiz" }]}
      />
      <Tabs.Root value={tab} onValueChange={setTab} className="mt-3">
        <Tabs.List
          aria-label="quiz tabs"
          className="flex items-center gap-10 mb-4 border-b border-slate-300"
        >
          <Tabs.Trigger
            value="fastMania"
            className={`flex items-center gap-2 py-2 ${activeTab}`}
            onClick={() => setTab("fastMania")}
          >
            <TimerReset size={20} />
            <Typography.Base
              variant={tab === "fastMania" ? "semibold" : "regular"}
            >
              Fast Mania
            </Typography.Base>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="ministrial"
            className={`flex items-center gap-2 py-2 font-normal ${activeTab}`}
            onClick={() => setTab("ministrial")}
          >
            <ListChecks size={20} />
            <Typography.Base
              variant={tab === "ministrial" ? "semibold" : "regular"}
            >
              Ministrial
            </Typography.Base>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="fastMania">
          <div className="">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mb-10">
              {fastManiaCardsData?.map((item, index) => (
                <FastManiaCategoryCard key={index} item={item} />
              ))}
            </div>
            <UserDashboardFeedQuizQuestion />
          </div>
        </Tabs.Content>
        <Tabs.Content value="ministrial">
          <div className="grid xxl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 mb-10">
            {ministerialCategoryData?.map((item, index) => (
              <Link key={index} to={`/user-dashboard/quiz/${item?.slug}`}>
                <MinisterialCategoryCard item={item} />
              </Link>
            ))}
          </div>
          <div>
            <Typography.Heading4 variant="semibold" className="mt-4">
              Quiz by chapter of the theory
            </Typography.Heading4>

            <div className="flex justify-center mt-8">
              <button
                disabled={selectedChapters?.length === 0}
                onClick={handleQuizStart}
                className={`bg-secondary transition-all duration-300 ease-in-out font-medium rounded-full text-white py-3 px-6  text-sm ${
                  selectedChapters?.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-secondary/80"
                }`}
              >
                Start Quiz With Selected Chapters
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center mt-10">
                <Spinner size={40} />
              </div>
            ) : chapters?.length > 0 ? (
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5 mt-5">
                {chapters?.map((item, index) => (
                  <MinisterialQuizCard
                    key={index}
                    item={item}
                    selectedChapters={selectedChapters}
                    setSelectedChapters={setSelectedChapters}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center mt-10">No chapter found!</p>
            )}

            <div className="flex justify-center mt-8">
              <button
                disabled={!hasMore}
                onClick={loadMore}
                className={`bg-primary transition-all duration-300 ease-in-out font-medium rounded-full text-white py-3 px-6 min-w-[150px] text-sm ${
                  !hasMore
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary/80"
                }`}
              >
                {isLoading || isRefetching ? (
                  <div className="flex items-center justify-center">
                    <Spinner size={24} className="text-white" />
                  </div>
                ) : hasMore ? (
                  "Load More"
                ) : (
                  "No more chapters to load"
                )}
              </button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default UserDashboardQuizLayout;
