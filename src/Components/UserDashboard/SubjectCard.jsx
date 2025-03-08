import chapterImg from "@/assets/UserDashboard/subject-demo-img.svg";
import Typography from "@/Components/Typography";
const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white flex gap-4 rounded-lg sm:max-w-sm h-full">
      <img
        className=" max-w-[30%] rounded-xl object-cover"
        src={subject?.image || chapterImg}
        alt="image"
      />
      <div className="flex flex-col justify-between p-4 ">
        <div>
          <Typography.Heading5
            className="text-primaryText leading-7 mt-1 line-clamp-2"
            variant="semibold"
          >
            {subject?.name}
          </Typography.Heading5>
          <Typography.Body variant="medium" className="text-secondaryText mt-1">
            {subject?.totalQuizes || 0} Questions
          </Typography.Body>
        </div>

        <div className="">
          <button className="bg-[#2ACCB0] hover:bg-[#2ACCB0]/80 font-medium rounded-full text-white py-1.5 px-6  text-sm">
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
