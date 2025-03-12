import Typography from "@/Components/Typography";
import { CircleCheck, CircleX } from "lucide-react";

const ErrorReviewCategoryCard = ({ item }) => {
  const progressWidth = `${(item?.right * 100) / item?.total}%`;

  return (
    <div className="bg-[#F7ECDF] flex  gap-4 rounded-lg sm:max-w-sm">
      <img
        className="max-h-[162px] max-w-[30%] rounded-xl object-cover"
        src={item?.icon}
        alt="image"
      />
      <div className="flex flex-col justify-between w-full p-4">
        <div>
          <Typography.Body variant="medium" className="text-secondaryText">
            Chapter {item?.id}
          </Typography.Body>
          <Typography.Heading5
            className="text-primaryText leading-7  mt-1"
            variant="semibold"
          >
            {item?.title}
          </Typography.Heading5>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-green-500">
              <CircleCheck size={16} />
              <Typography.Body variant="medium">{item?.right}</Typography.Body>
            </div>

            <div className="flex items-center gap-1 text-red-500">
              <CircleX size={16} className="" />
              <Typography.Body variant="medium">
                {item?.total - item?.right}
              </Typography.Body>
            </div>
          </div>

          <div className="w-full bg-red-500 rounded-full h-2.5">
            <div
              className="bg-green-500 rounded-full h-2.5"
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorReviewCategoryCard;
