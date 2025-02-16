import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import Typography from '../Typography';
const ChapterCard = () => {
    return (
      <div className="bg-white p-4 flex  gap-4 rounded-lg sm:max-w-sm">
        <img
          className="max-h-[162px] max-w-[30%] rounded-xl"
          src={chapterImg}
          alt="image"
        />
        <div className="flex flex-col justify-between">
          <div>
            <Typography.Body variant="medium" className="text-secondaryText">
              Chapter 1
            </Typography.Body>
            <Typography.Heading5
              className="text-primaryText leading-7  mt-1"
              variant="semibold"
            >
              Road, vehicles, driver duties
            </Typography.Heading5>
          </div>

          <div className="">
            <Typography.Body className="text-secondaryText">
              01/25
            </Typography.Body>
            <div className="w-full bg-[#E1E1E1] rounded-full h-2.5">
              <div className="bg-secondary w-[30%] rounded-full h-2.5"></div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ChapterCard;