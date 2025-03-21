import Typography from "@/Components/Typography";
import grow from "@/assets/UserDashboard/grow.svg";
import SmallPieChart from "./SmallPieChart";

function Preparation({ data }) {
  return (
    <div>
      <Typography.Heading5 className="text-primaryText">
        Preparation
      </Typography.Heading5>
      <div className=" bg-white mt-3 w-full h-[180px] rounded-2xl p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 justify-between">
          <Typography.Body
            variant="medium"
            className="text-secondaryText whitespace-nowrap"
          >
            Level of Preparation
          </Typography.Body>
          <img src={grow} alt="icon" />
        </div>

        <div className="flex items-center justify-between gap-4 sm:gap-8 lg:gap-16">
          <div className="flex items-center gap-2">
            <SmallPieChart
              primaryColor="#CB2A8A"
              secondaryColor="#CCD7E1"
              value={data?.overallPerformance?.preparationScore}
            />
            <Typography.Heading4 variant="bold" className="text-primaryText">
              {data?.overallPerformance?.preparationScore || 0}%
            </Typography.Heading4>
          </div>
          <div className="text-sm text-gray-500 line-clamp-5">
            Total performance in the last 30 cards and sum of completed cards
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preparation;
