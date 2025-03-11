import Typography from "@/Components/Typography";
import { ChartNoAxesColumn, MessageCircleQuestion } from "lucide-react";

export default function SolvedErrorsPercentage({ data }) {
  return (
    <div>
      <Typography.Heading5 className="text-primaryText line-clamp-1">
        Total quizzes and percentage of errors
      </Typography.Heading5>
      <div className="p-6 flex flex-col justify-between bg-white rounded-2xl border mt-3 h-[180px]">
        <div className=" grid grid-cols-2 gap-16">
          <div>
            <div className="flex justify-between gap-1">
              <Typography.Base
                variant="regular"
                className="text-secondaryText line-clamp-2 break-all"
              >
                Total quizzes
              </Typography.Base>
              <MessageCircleQuestion className="text-blue-500 min-w-6 min-h-6" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              {data?.overallPerformance?.totalQuizzesTaken || 0}
            </Typography.Heading3>
          </div>
          <div>
            <div className="flex justify-between gap-1">
              <Typography.Base
                variant="regular"
                className="text-secondaryText line-clamp-2 break-all"
              >
                Percentage errors
              </Typography.Base>
              <ChartNoAxesColumn className="text-red-500 min-w-6 min-h-6" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              {data?.overallPerformance?.errorPercentage || 0}%
            </Typography.Heading3>
          </div>
        </div>{" "}
        <Typography.Base
          variant="regular"
          className="text-secondaryText !text-sm col-span-2"
        >
          Summary of Quizzes Completed and Percentage of Errors
        </Typography.Base>
      </div>
    </div>
  );
}
