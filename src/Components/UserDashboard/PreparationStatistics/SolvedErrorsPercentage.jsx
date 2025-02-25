import Typography from "@/Components/Typography";
import { ChartNoAxesColumn, MessageCircleQuestion } from "lucide-react";

export default function SolvedErrorsPercentage() {
  return (
    <div>
      <Typography.Heading5 className="text-primaryText">
        Quizzes solved and percentage of errors
      </Typography.Heading5>
      <div className="p-6 flex flex-col justify-between bg-white rounded-2xl border mt-3 h-[190px]">
        <div className=" grid grid-cols-2 gap-16">
          <div>
            <div className="flex items-center justify-between">
              <Typography.Base variant="regular" className="text-secondaryText">
                Quizzes solved
              </Typography.Base>
              <MessageCircleQuestion className="text-blue-500" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              0
            </Typography.Heading3>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Typography.Base variant="regular" className="text-secondaryText">
                Percentage errors
              </Typography.Base>
              <ChartNoAxesColumn className="text-red-500" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              52%
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
