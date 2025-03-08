import FastManiaCategoryCard from "../Quiz/FastManiaCategoryCard";

function QuizOptions() {
  const quizCardsData = [
    {
      id: 1,
      title: "Official Quizzes",
      description: "Official Quizzes",
      icon: "Building",
      time: "20 min",
      path: "official-quiz",
      bgColor: "bg-[#B2FFB2]",
      timeBGColor: "bg-[#9EE39E]",
    },
    {
      id: 2,
      title: "Selected Topic Quiz",
      description: "Selected Topic Quiz",
      icon: "Grid2x2Check",
      time: "20 min",
      path: "selected-topic-quiz",
      bgColor: "bg-[#EDED88]",
      timeBGColor: "bg-[#BDBD7D]",
    },
    {
      id: 3,
      title: "Guess the Signal",
      description: "Guess the Signal",
      icon: "Signpost",
      time: "2 min",
      path: "guess-the-signal",
      bgColor: "bg-[#FFB27D]",
      timeBGColor: "bg-[#E8A477]",
    },
    {
      id: 4,
      title: "Choose 4 to 1 Signal",
      description: "Choose 4 to 1 Signal",
      icon: "Grid2x2Check",
      time: "2 min",
      path: "choose-4-to-1-signal",
      bgColor: "bg-[#91E0E0]",
      timeBGColor: "bg-[#85CDD0]",
    },
  ];

  return (
    <>
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mb-10">
        {quizCardsData?.map((item, index) => (
          <FastManiaCategoryCard key={index} item={item} />
        ))}
      </div>
    </>
  );
}

export default QuizOptions;
