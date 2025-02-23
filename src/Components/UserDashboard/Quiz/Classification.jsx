import Typography from "@/Components/Typography";
import img from "@/assets/UserDashboard/your-track.svg";
import TopTrackCard from "./TopTrackCard";

const Classification = () => {
    return (
      <div className="">
        {/* Classification Header */}
        <div className="">
          <Typography.Heading4
            variant="semibold"
            className="text-primaryText mb-4"
          >
            Classification
          </Typography.Heading4>
          <div className="flex space-x-2 mt-2">
            <button className="bg-black text-white rounded-full px-6 py-1.5 text-sm font-medium focus:outline-none">
              Today
            </button>
            <button className="bg-white text-gray-700 rounded-full px-6 py-1.5 text-sm font-medium focus:outline-none border border-gray-300">
              Regional
            </button>
            <button className="bg-white text-gray-700 rounded-full px-6 py-1.5 text-sm font-medium focus:outline-none border border-gray-300">
              Global
            </button>
          </div>
        </div>

        {/* Your Track Today Section */}
        <div className="flex   bg-[#DFF5F7] mt-5 rounded-lg overflow-hidden">
          <img src={img} alt="Car" className="w-[130px]" />

          {/* Track Info */}
          <div className=" rounded-lg p-3 py-4 flex flex-col justify-between ">
            <Typography.Heading4 variant="bold" className="text-primaryText">
              Your Track today
            </Typography.Heading4>
            <ul className="list-none block">
              <li className="flex items-center mb-1">
                <span className="mr-2 text-indigo-500">🏆</span>
                <Typography.Body className="inline text-secondaryText">
                  Take the quiz and become #1
                </Typography.Body>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-pink-500">🚩</span>
                <Typography.Body className="inline text-secondaryText">
                  You're not still at Track
                </Typography.Body>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-7">
          <Typography.Body className="text-secondaryText my-4">
            View who has the top track
          </Typography.Body>

          <div className="space-y-2">
            <TopTrackCard />
            <TopTrackCard />
            <TopTrackCard />
            <TopTrackCard />
            <TopTrackCard />
          </div>
        </div>
      </div>
    );
};

export default Classification;