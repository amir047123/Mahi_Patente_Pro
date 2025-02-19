import Typography from "@/Components/Typography";
import { ListChecks, TimerReset } from "lucide-react";

const MinisterialCategoryCard = ({ item }) => {
  return (
    <div
      className="flex gap-4 rounded-lg sm:max-w-sm relative"
      style={{ backgroundColor: item?.bgColor || "#F7ECDF" }}
    >
      <img
        className="max-h-[162px] max-w-[30%] rounded-xl"
        src={item?.image}
        alt="image"
      />
      <div className="flex flex-col justify-between w-full p-4">
        <div>
          <Typography.Heading4
            className="text-primaryText leading-7 mb-1"
            variant="semibold"
          >
            {item?.name}
          </Typography.Heading4>
          <Typography.Body variant="medium" className="text-secondaryText">
            {item?.description}
          </Typography.Body>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <TimerReset size={20} className="text-red-500" />
            <Typography.Base variant="medium">
              {item?.time || 0}
            </Typography.Base>
          </div>
          <div className="flex items-center gap-1">
            <ListChecks size={20} className="text-red-500" />
            <Typography.Base variant="medium">
              {item?.questions || 0} Questions
            </Typography.Base>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinisterialCategoryCard;
