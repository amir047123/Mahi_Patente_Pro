import chapterImg from "@/assets/UserDashboard/subject-demo-img.svg";
import Typography from "@/Components/Typography";
import { Link } from "react-router-dom";
const SubjectCard = () => {
  return (
    <Link to="2" className="bg-white p-4 flex  gap-4 rounded-lg sm:max-w-sm">
      <img
        className="max-h-[162px] max-w-[30%] rounded-xl"
        src={chapterImg}
        alt="image"
      />
      <div className="flex flex-col justify-between">
        <div>
          <Typography.Heading5
            className="text-primaryText leading-7  mt-1"
            variant="semibold"
          >
            Intersections at grade and at...
          </Typography.Heading5>
          <Typography.Body variant="medium" className="text-secondaryText mt-1">
            10 Questions
          </Typography.Body>
        </div>

        <div className="">
          <button className="bg-[#2ACCB0] hover:bg-[#2ACCB0]/80 font-medium rounded-full text-white py-1.5 px-6  text-sm">
            Complete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default SubjectCard;
