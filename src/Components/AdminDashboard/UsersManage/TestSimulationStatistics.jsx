import Typography from "@/Components/Typography";
import { ChartNoAxesColumn, MessageCircleQuestion } from "lucide-react";

export default function TestSimulationStatistics() {
  return (
    <div>
      <Typography.Heading6 variant="bold" className="text-primaryText">
        Test simulation statistics
      </Typography.Heading6>
      <div className="p-6 flex flex-col justify-between bg-white rounded-2xl mt-3 h-[165px]">
        <div className=" grid grid-cols-2 gap-4 sm:gap-8 lg:gap-16">
          <div>
            <div className="flex items-center justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Completed cards
              </Typography.Body>
              <MessageCircleQuestion size={20} className="text-blue-500" />
            </div>
            <Typography.Heading3 variant="bold" className="text-left mt-2">
              2
            </Typography.Heading3>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Average errors
              </Typography.Body>
              <ChartNoAxesColumn size={20} className="text-red-500" />
            </div>
            <Typography.Heading3 variant="bold" className="text-left mt-2">
              16
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
