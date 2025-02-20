import chapterImg from "@/assets/UserDashboard/subject-demo-img.svg";
import Typography from "@/Components/Typography";
const SubjectCard = ({ subject }) => {
  return (
    <>
      <img
        className="max-h-[162px] max-w-[30%] rounded-xl"
        src={subject?.image || chapterImg}
        alt="image"
      />
      <div className="flex flex-col justify-between">
        <div>
          <Typography.Heading5
            className="text-primaryText leading-7  mt-1"
            variant="semibold"
          >
            {subject?.name}
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
    </>
  );
};

export default SubjectCard;
