import Typography from "@/Components/Typography";
import FastManiaCategoryCard from "@/Components/UserDashboard/Quiz/FastManiaCategoryCard";
import MinisterialQuizCard from "@/Components/UserDashboard/Quiz/MinisterialQuizCard";
import * as Tabs from "@radix-ui/react-tabs";
import { ListChecks, TimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import demoImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import demoImg2 from "@/assets/UserDashboard/subject-demo-img.svg";
import MinisterialCategoryCard from "@/Components/UserDashboard/Quiz/MinisterialCategoryCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";

const UserDashboardQuizLayout = () => {
  const [tab, setTab] = useState("fastMania");
  const activeTab =
    "data-[state=active]:text-primary data-[state=active]:!font-semibold data-[state=active]:border-b-4 data-[state=active]:border-primary";

  const fastManiaCardsData = [
    {
      id: 1,
      title: "Guess the Signal",
      description: "Guess the Signal",
      icon: "Signpost",
      time: "2 min",
      path: "guess-the-signal",
      bgColor: "bg-red-500/50",
      timeBGColor: "bg-red-400",
    },
    {
      id: 2,
      title: "Choose 4 Signal",
      description: "Choose 4 to 1 Signal",
      icon: "Grid2x2Check",
      time: "2 min",
      path: "choose-4-to-1-signal",
      bgColor: "bg-green-500/50",
      timeBGColor: "bg-green-400",
    },
  ];

  const ministerialCardData = [
    {
      id: 1,
      title: "Road, vehicles, driver duties",
      description: "Road, vehicles, driver duties",
      icon: demoImg,
      progress: 50,
      total: 50,
    },
    {
      id: 2,
      title: "Danger signs",
      description: "Danger signs",
      icon: demoImg2,
      progress: 40,
      total: 50,
    },
    {
      id: 3,
      title: "Priority signs",
      description: "Priority signs",
      icon: demoImg,
      progress: 50,
      total: 50,
    },
    {
      id: 4,
      title: "Road, vehicles, driver duties",
      description: "Road, vehicles, driver duties",
      icon: demoImg,
      progress: 55,
      total: 55,
    },
    {
      id: 5,
      title: "Danger signs",
      description: "Danger signs",
      icon: demoImg2,
      progress: 50,
      total: 50,
    },
    {
      id: 6,
      title: "Priority signs",
      description: "Priority signs",
      icon: demoImg,
      progress: 50,
      total: 60,
    },
  ];

  const ministerialCategoryData = [
    {
      id: 1,
      title: "Official Quiz",
      description: "Simulate a Ministerial Quiz as if you were taking an exam.",
      slug: "official-quiz",
      icon: demoImg,
      time: "50 min",
      questions: 50,
      bgColor: "#FCFFD9",
    },
    {
      id: 2,
      title: "Error Review",
      description: "Make a quiz with all the mistakes you made.",
      slug: "error-review",
      icon: demoImg2,
      time: "50 min",
      questions: 50,
      bgColor: "#F7ECDF",
    },
  ];
  const [filters, setFilters] = useState({
    totalPages: 1,
    currentPage: 1,
    itemPerPage: 10,
    searchText: "",
    withSubCategories: true,
  });
  const { useFetchEntities } = useCrudOperations("quiz-category/all");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities(filters);

  useEffect(() => {
    if (isSuccess && response?.data?.totalPages !== 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        totalPages: response?.data?.totalPages,
      }));
    }
  }, [isSuccess, response, filters?.currentPage]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <Tabs.Root defaultValue="fastMania">
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
          <div className="flex items-center gap-4 mb-10">
            {fastManiaCardsData?.map((item, index) => (
              <FastManiaCategoryCard key={index} item={item} />
            ))}
          </div>
          <div>
            <Typography.Heading4 variant="semibold" className="mt-4">
              Feed Quiz Question
            </Typography.Heading4>
          </div>
        </Tabs.Content>
        <Tabs.Content value="ministrial">
          <div className="flex items-center gap-4 mb-10">
            {response?.data?.[0]?.subcategories?.map((item, index) => (
              <Link key={index} to={`/user-dashboard/quiz/${item?._id}`}>
                <MinisterialCategoryCard item={item} />
              </Link>
            ))}
          </div>
          <div>
            <Typography.Heading4 variant="semibold" className="mt-4">
              Quiz by chapter of the theory
            </Typography.Heading4>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5 mt-5">
              {ministerialCardData?.map((item, index) => (
                <Link key={index} to={`/user-dashboard/theory/1`}>
                  <MinisterialQuizCard item={item} />
                </Link>
              ))}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default UserDashboardQuizLayout;
