import Typography from "@/Components/Typography";
import { CheckIcon } from "lucide-react";

const MinisterialQuizCard = ({ item }) => {
  const progressWidth = `${(item?.progress * 100) / item?.total}%`;
  const completed = item?.progress === item?.total;

  return (
    <div className="bg-white flex gap-4 rounded-lg sm:max-w-sm relative">
      <div className="flex items-center text-white absolute top-4 right-4">
        <div
          className={`rounded-full size-6 ${
            completed
              ? "bg-blue-500 text-white p-1"
              : "border-2 border-slate-500"
          }`}
        >
          {completed && <CheckIcon size={16} />}
        </div>
      </div>
      <img
        className="max-h-[162px] max-w-[30%] rounded-xl"
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

        <div className="">
          <Typography.Body className="text-secondaryText">
            {item?.progress}/{item?.total}
          </Typography.Body>
          <div className="w-full bg-[#E1E1E1] rounded-full h-2.5">
            <div
              className="bg-secondary rounded-full h-2.5"
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinisterialQuizCard;
