import Typography from "@/Components/Typography";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function TotalAnswer() {
  return (
    <div>
      <Typography.Heading5 className="text-primaryText">
        Total Answer
      </Typography.Heading5>
      <div className="p-6 flex flex-col justify-between bg-white rounded-2xl border mt-3 h-[190px]">
        <div className=" grid grid-cols-2 gap-16">
          <div>
            <div className="flex items-center justify-between">
              <Typography.Base variant="regular" className="text-secondaryText">
                Wrong
              </Typography.Base>
              <ThumbsDown className="text-red-500" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              3
            </Typography.Heading3>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Typography.Base variant="regular" className="text-secondaryText">
                Right
              </Typography.Base>
              <ThumbsUp className="text-green-500" />
            </div>
            <Typography.Heading3 className="text-left mt-3">
              4
            </Typography.Heading3>
          </div>
        </div>{" "}
        <Typography.Base
          variant="regular"
          className="text-secondaryText !text-sm col-span-2"
        >
          Total response summary
        </Typography.Base>
      </div>
    </div>
  );
}
