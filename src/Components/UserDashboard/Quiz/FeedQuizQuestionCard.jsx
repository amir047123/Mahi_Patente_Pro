import img from "@/assets/UserDashboard/feedQustionImg.svg";
import Typography from "@/Components/Typography";
const FeedQuizQuestionCard = ({ quiz, index, handleAnswer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-2">
      <img
        src={quiz?.media?.image || img}
        alt="Sign"
        className="w-[140px] rounded-lg"
      />

      <div>
        <Typography.Body variant="medium" className=" text-primaryText">
          {quiz?.question}
        </Typography.Body>
        <div className="mt-5 flex space-x-4">
          <button
            onClick={() => handleAnswer(index, 0)}
            className="w-1/2 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold"
          >
            True
          </button>
          <button
            onClick={() => handleAnswer(index, 1)}
            className="w-1/2 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold"
          >
            False
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedQuizQuestionCard;
