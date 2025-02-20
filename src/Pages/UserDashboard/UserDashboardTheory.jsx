import ChapterCard from "@/Components/UserDashboard/ChapterCard";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Link } from "react-router-dom";
import demoImg from "@/assets/UserDashboard/demo-chapeter-img.svg";
import demoImg2 from "@/assets/UserDashboard/subject-demo-img.svg";

const UserDashboardTheory = () => {
  const theoryCardData = [
    {
      id: 1,
      title: "Road, vehicles, driver duties",
      description: "Road, vehicles, driver duties",
      icon: demoImg,
      progress: 40,
      total: 50,
    },
    {
      id: 2,
      title: "Danger signs",
      description: "Danger signs",
      icon: demoImg2,
      progress: 40,
      total: 50,
    },
    {
      id: 3,
      title: "Priority signs",
      description: "Priority signs",
      icon: demoImg,
      progress: 20,
      total: 50,
    },
    {
      id: 4,
      title: "Road, vehicles, driver duties",
      description: "Road, vehicles, driver duties",
      icon: demoImg,
      progress: 40,
      total: 55,
    },
    {
      id: 5,
      title: "Danger signs",
      description: "Danger signs",
      icon: demoImg2,
      progress: 15,
      total: 50,
    },
    {
      id: 6,
      title: "Priority signs",
      description: "Priority signs",
      icon: demoImg,
      progress: 40,
      total: 60,
    },
  ];

  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[{ name: "Theory", path: "theory" }]}
      />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
        {theoryCardData?.map((item, index) => (
          <Link key={index} to={`/user-dashboard/theory/1`}>
            <ChapterCard item={item} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default UserDashboardTheory;
