import Typography from "@/Components/Typography";
import subscribe from "@/assets/UserDashboard/subscribe.svg";
import { Link } from "react-router-dom";

function Subscribe() {
  return (
    <div className="bg-white w-full h-full rounded-2xl p-5 flex flex-col justify-between relative">
      <Typography.Heading5 className="text-primaryText mb-3">
        Switch to Mahi Patente PRO
      </Typography.Heading5>
      <div className="flex flex-col justify-between gap-5 z-10">
        <ul className="list-disc pl-5 text-secondaryText">
          <li>
            <Typography.Base variant="medium">
              All chapters unlocked
            </Typography.Base>
          </li>
          <li>
            <Typography.Base variant="medium">
              Full Priority Support
            </Typography.Base>
          </li>
          <li>
            <Typography.Base variant="medium">Infinity Quizzes</Typography.Base>
          </li>
          <li className="w-[120px] min-[400px]:w-fit lg:w-[120px] xl:w-fit">
            <Typography.Base variant="medium">
              Support for difficult quizzes
            </Typography.Base>
          </li>
        </ul>

        <Link
          to="/user-dashboard"
          className="px-5 py-1.5 w-fit bg-secondary rounded-full text-white font-semibold text-center hover:scale-105 duration-500 text-sm"
        >
          Subscribe Now
        </Link>
      </div>

      <img
        src={subscribe}
        alt="subscribe"
        className="absolute bottom-0 right-3 w-[140px]"
      />
    </div>
  );
}

export default Subscribe;
