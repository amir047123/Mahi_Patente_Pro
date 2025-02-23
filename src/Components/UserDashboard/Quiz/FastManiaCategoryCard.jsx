import Typography from "@/Components/Typography";
import LucideIcon from "@/Components/ui/icon";
import { Link } from "react-router-dom";

export default function FastManiaCategoryCard({ item }) {
  return (
    <Link
      to={`/user-dashboard/quiz/${item?.path}`}
      className={`p-4 rounded-2xl text-left w-full ${item?.bgColor}`}
    >
      <LucideIcon name={item?.icon} size={32} className="text-[#333333]/50" />
      <Typography.Heading5 className="text-primaryText mt-2" variant="semibold">
        {item?.title}
      </Typography.Heading5>
      <div
        className={`rounded-full flex items-center justify-center gap-2 mt-6 py-1 ${item?.timeBGColor}`}
      >
        <LucideIcon name={item?.icon} size={20} />
        <Typography.Base className="text-primaryText" variant="medium">
          {item?.time}
        </Typography.Base>
      </div>
    </Link>
  );
}
