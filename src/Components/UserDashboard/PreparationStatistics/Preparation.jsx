import Typography from "@/Components/Typography";
import grow from "@/assets/UserDashboard/grow.svg";
import SmallPieChart from "./SmallPieChart";
import { Link } from "react-router-dom";

function Preparation() {
  return (
    <Link to="/user-dashboard/preparation-statistics">
      <Typography.Heading5 className="text-primaryText">
        Your Preparation
      </Typography.Heading5>
      <div className=" bg-white mt-3 w-full h-[190px] rounded-2xl p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 justify-between">
          <Typography.Body
            variant="medium"
            className="text-secondaryText whitespace-nowrap"
          >
            Level of Preparation
          </Typography.Body>
          <img src={grow} alt="icon" />
        </div>

        <div className="flex items-center justify-between gap-16">
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
          <div className="text-sm text-gray-500">
            Total performance in the last 30 cards and sum of completed cards
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Preparation;
