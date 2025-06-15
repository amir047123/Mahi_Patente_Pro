import Typography from "@/Components/Typography";
import { GoPlay } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi2";
import demo from "@/assets/Home/Hero/hero-img.png";

const CourseCard = () => {
  return (
    <div className="overflow-hidden rounded-lg border transition hover:shadow">
      <img alt="img" src={demo} className="h-56 w-full object-cover" />

      <div className="bg-white p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-3.5 rounded-full bg-gradient "></div>{" "}
          <Typography.Body className="font-semibold bg-gradient text-transparent bg-clip-text">
            Driving Course
          </Typography.Body>
        </div>

        <Typography.Heading4 className="mt-2 leading-7 text-primaryText my-4">
          Master Driving Rules in Bangla
        </Typography.Heading4>

        <div className="flex items-center justify-between ">
          <Typography.Body className="flex items-center gap-1.5 mt-2 text-secondaryText !text-[12px]">
            <GoPlay /> 6 Month
          </Typography.Body>
          <Typography.Body className="flex items-center gap-1.5 mt-2 text-secondaryText !text-[12px]">
            <HiOutlineUserCircle /> 67 Enrolled
          </Typography.Body>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
