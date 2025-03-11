import Typography from "@/Components/Typography";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function TotalAnswer() {
  return (
    <div>
      <Typography.Heading6 variant="bold" className="text-primaryText">
        Total Answer
      </Typography.Heading6>
      <div className="p-6 flex flex-col justify-between bg-white rounded-2xl  mt-3 h-[165px]">
        <div className=" grid grid-cols-2 gap-4 sm:gap-8 lg:gap-16">
          <div>
            <div className="flex items-center justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Wrong
              </Typography.Body>
              <ThumbsDown size={20} className="text-red-500" />
            </div>
            <Typography.Heading3
              variant="bold"
              className="text-primaryText mt-2"
            >
              3
            </Typography.Heading3>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Right
              </Typography.Body>
              <ThumbsUp size={20} className="text-green-500" />
            </div>
            <Typography.Heading3
              variant="bold"
              className="text-primaryText mt-2"
            >
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
