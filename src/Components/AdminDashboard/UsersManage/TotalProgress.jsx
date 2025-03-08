import Typography from "@/Components/Typography";
import grow from "@/assets/UserDashboard/grow.svg";
import SmallPieChart from "./SmallPieChart";
import { Link } from "react-router-dom";

function TotalProgress() {
  return (
    <Link to="/user-dashboard/total-progress">
      <Typography.Heading6 variant="bold" className="text-primaryText">
        Total Progress
      </Typography.Heading6>
      <div className=" bg-white mt-3 w-full h-[165px] rounded-2xl p-5 ">
          <div className="flex justify-between items-center gap-2">
            <Typography.Body
              variant="medium"
              className="text-secondaryText whitespace-nowrap"
            >
              Level of Preparation
            </Typography.Body>
            <img className="lg:hidden 2xl:block" src={grow} alt="icon" />
          </div>
          <div className="flex items-center gap-5 justify-between mt-6">
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
            <Typography.Body variant="normal" className="text-secondaryText max-w-xs">
              Total performance in the last 30 cards and sum of completed cards
            </Typography.Body>
          </div>
       
      </div>
    </Link>
  );
}

export default TotalProgress;
