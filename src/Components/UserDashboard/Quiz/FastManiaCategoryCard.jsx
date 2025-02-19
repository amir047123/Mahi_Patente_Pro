import Typography from "@/Components/Typography";
import LucideIcon from "@/Components/ui/icon";
import { Link } from "react-router-dom";

export default function FastManiaCategoryCard({ item }) {
  return (
    <Link to={`/user-dashboard/quiz/${item?.path}`}
      className={`p-4 rounded-2xl text-left max-w-[150px] ${item?.bgColor}`}
    >
      <LucideIcon name={item?.icon} size={32} className="text-[#333333]/50" />
      <Typography.Heading5 variant="semibold" className="mt-2">
        {item?.title}
      </Typography.Heading5>
      <div
        className={`rounded-full flex items-center justify-center gap-2 mt-6 py-1 ${item?.timeBGColor}`}
      >
        <LucideIcon name={item?.icon} size={20} />
        <Typography.Base variant="regular">{item?.time}</Typography.Base>
      </div>
    </Link>
  );
}
