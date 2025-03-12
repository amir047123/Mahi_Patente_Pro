import Typography from "@/Components/Typography";
import { ChartNoAxesColumn, MessageCircleQuestion } from "lucide-react";

export default function SimulationStatistics({ data }) {
  return (
    <div>
      <Typography.Heading5 className="text-primaryText">
        Test simulation statistics
      </Typography.Heading5>
      <div className="p-6 flex flex-col justify-between bg-white rounded-2xl border mt-3 h-[180px]">
        <div className=" grid grid-cols-2 gap-4 sm:gap-8 lg:gap-16">
          <div>
            <div className="flex justify-between">
              <Typography.Base
                variant="regular"
                className="text-secondaryText line-clamp-2 break-all"
              >
                Total simulations
              </Typography.Base>
              <MessageCircleQuestion className="text-blue-500 min-w-6 min-h-6" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              {data?.overallPerformance?.totalSessions || 0}
            </Typography.Heading3>
          </div>
          <div>
            <div className="flex justify-between">
              <Typography.Base
                variant="regular"
                className="text-secondaryText line-clamp-2 break-all"
              >
                Average errors
              </Typography.Base>
              <ChartNoAxesColumn className="text-red-500 min-w-6 min-h-6" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              {data?.errorAnalysis?.averageErrorRate || 0}%
            </Typography.Heading3>
          </div>
        </div>{" "}
        <Typography.Base
          variant="regular"
          className="text-secondaryText !text-sm col-span-2"
        >
          Summary of exam simulations carried out and average errors
        </Typography.Base>
      </div>
    </div>
  );
}
