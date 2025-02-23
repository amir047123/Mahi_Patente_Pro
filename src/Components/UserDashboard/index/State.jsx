import Typography from "@/Components/Typography";

import grow from "@/assets/UserDashboard/grow.svg";
import SmallPieChart from "./SmallPieChart";

function State() {
  return (
    <div className=" ">
      <Typography.Heading5 className="text-primaryText">
        Your State
      </Typography.Heading5>
      <div className=" bg-white mt-3 w-full h-[190px] rounded-2xl p-5 flex flex-col justify-between">
        <div className="flex justify-between gap-5">
          {/* Left Section - Today Earn */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Preparation Level
              </Typography.Body>
              <img src={grow} alt="icon" />
            </div>
            <div className="flex items-center gap-2">
              <SmallPieChart
                primaryColor="#CB2A8A"
                secondaryColor="#CCD7E1"
                value={81}
              />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                81%
              </Typography.Heading4>
            </div>
          </div>

          {/* Right Section - Global Rank */}
          <div className="space-y-2 flex-1 ">
            <div className="flex items-center gap-2 ">
              <Typography.Body
                variant="medium"
                className="text-secondaryText ml-auto"
              >
                Average Errors
              </Typography.Body>

              <img src={grow} alt="icon" />
            </div>
            <div className="flex items-center gap-2">
              <SmallPieChart
                primaryColor="#CB2A8A"
                secondaryColor="#CCD7E1"
                value={16}
              />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                16
              </Typography.Heading4>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Last Update: 22 Jan 2025, 12:28 PM
        </div>
      </div>
    </div>
  );
}

export default State;
