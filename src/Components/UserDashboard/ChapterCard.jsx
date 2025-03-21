import Typography from "@/Components/Typography";
import demoImg from "@/assets/UserDashboard/demo-chapeter-img.svg";

const ChapterCard = ({ item }) => {
  const progressWidth = `${
    (item?.count?.completedSubjects * 100) / item?.count?.totalSubjects
  }%`;

  return (
    <div className="bg-white flex gap-4 rounded-lg sm:max-w-sm h-full">
      <img
        className="max-w-[30%] h-full rounded-xl object-cover"
        src={item?.image || demoImg}
        alt="image"
      />
      <div className="flex flex-col justify-between w-full p-4">
        <div>
          <Typography.Body variant="medium" className="text-secondaryText">
            Chapter {item?.order}
          </Typography.Body>
          <Typography.Heading5
            className="text-primaryText leading-7 mt-1 line-clamp-2"
            variant="semibold"
          >
            {item?.name}
          </Typography.Heading5>
        </div>

        <div className="mt-2">
          <Typography.Body className="text-secondaryText">
            {item?.count?.completedSubjects}/{item?.count?.totalSubjects}{" "}
            Completed
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
