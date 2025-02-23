import img from "@/assets/UserDashboard/feedQustionImg.svg";
import Typography from "@/Components/Typography";
const FeedQuizQuestionCard = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
        <img src={img} alt="Sign" className="w-[140px]" />

        <div>
          <Typography.Body variant="medium" className=" text-primaryText">
            The sign shown may be associated with a maximum speed limit sign
          </Typography.Body>
          <div className="mt-5 flex space-x-4">
            <button className="w-1/2 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold">
              True
            </button>
            <button className="w-1/2 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold">
              False
            </button>
          </div>
        </div>
      </div>
    );
};

export default FeedQuizQuestionCard;