import Typography from "@/Components/Typography";
import coin from '@/assets/UserDashboard/coin.svg'
import grow from '@/assets/UserDashboard/grow.svg'
import { FaArrowTrendUp } from "react-icons/fa6";
function Ranking() {
  return (
    <div className=" ">
      <Typography.Heading6 variant="bold" className="text-primaryText">
        Your Ranking
      </Typography.Heading6>
      <div className=" bg-white mt-3 w-full h-[190px] rounded-2xl p-5 flex flex-col justify-between">
        <div className="flex justify-between">
          {/* Left Section - Today Earn */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Typography.Body variant="medium" className="text-secondaryText ">
                Today Earn
              </Typography.Body>
              <img src={grow} alt="icon" />
            </div>
            <div className="flex items-center gap-2">
              <img className="w-5" src={coin} alt="coin" />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                1201
              </Typography.Heading4>
            </div>
          </div>

          <div className="w-[1px] h-full bg-gray-200"></div>

          {/* Right Section - Global Rank */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Typography.Body variant="medium" className="text-secondaryText ">
                Global Rank
              </Typography.Body>

              <img src={grow} alt="icon" />
            </div>
            <div className="flex items-center gap-2">
              <FaArrowTrendUp className="text-green-500" />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                12
              </Typography.Heading4>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-sm text-gray-500">
          Last Update: 22 Jan 2025, 12:28 PM
        </div>
      </div>
    </div>
  );
}

export default Ranking;
