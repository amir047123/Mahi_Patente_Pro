import Typography from "@/Components/Typography";

const ChapterCard = ({ item }) => {
  const progressWidth = `${(item?.progress * 100) / item?.total}%`;

  return (
    <div className="bg-white flex  gap-4 rounded-lg sm:max-w-sm">
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

export default ChapterCard;
