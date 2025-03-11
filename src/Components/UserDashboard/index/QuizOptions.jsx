import Typography from "@/Components/Typography";
import FastManiaCategoryCard from "../Quiz/FastManiaCategoryCard";
import Subscribe from "./Subscribe";

function QuizOptions() {
  const quizCardsData = [
    {
      id: 1,
      title: "Official Quiz",
      description: "Official Quiz",
      icon: "Building",
      time: "30 min",
      path: "official-quiz",
      bgColor: "bg-[#B2FFB2]",
      timeBGColor: "bg-[#9EE39E]",
    },
    // {
    //   id: 2,
    //   title: "Selected Topic Quiz",
    //   description: "Selected Topic Quiz",
    //   icon: "Grid2x2Check",
    //   time: "20 min",
    //   path: "selected-topic-quiz",
    //   bgColor: "bg-[#EDED88]",
    //   timeBGColor: "bg-[#BDBD7D]",
    // },
    {
      id: 3,
      title: "Guess the Signal",
      description: "Guess the Signal",
      icon: "Signpost",
      time: "10 min",
      path: "guess-the-signal",
      bgColor: "bg-[#FFB27D]",
      timeBGColor: "bg-[#E8A477]",
    },
    {
      id: 4,
      title: "Choose 4 to 1 Signal",
      description: "Choose 4 to 1 Signal",
      icon: "Grid2x2Check",
      time: "10 min",
      path: "choose-4-to-1-signal",
      bgColor: "bg-[#91E0E0]",
      timeBGColor: "bg-[#85CDD0]",
    },
  ];

  return (
    <div className="my-6">
      <Typography.Heading5 className="text-primaryText mb-3">
        Quizzes
      </Typography.Heading5>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {quizCardsData?.map((item, index) => (
          <FastManiaCategoryCard key={index} item={item} />
        ))}
        <div className="sm:col-span-3 lg:col-span-2">
          <Subscribe />
        </div>
      </div>
    </div>
  );
}

export default QuizOptions;
