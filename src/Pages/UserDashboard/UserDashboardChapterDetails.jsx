import Typography from "@/Components/Typography";
import SubjectCard from "@/Components/UserDashboard/SubjectCard";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import chapterImg from "@/assets/UserDashboard/demo-chapeter-img.svg";

const UserDashboardChapterDetails = () => {
  return (
    <>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Theory", path: "theory" },
          {
            name: "Road, vehicles, driver duties",
            path: "theory/Road, vehicles, driver duties",
          },
        ]}
      />

      <div className=" gap-4 flex items-center py-5 border-b mb-5">
        <img
          className="h-[100px] object-cover rounded-xl"
          src={chapterImg}
          alt="image"
        />

        <div>
          <Typography.Body variant="medium" className="text-secondaryText">
            Chapter 1
          </Typography.Body>
          <Typography.Heading3
            className="text-primaryText leading-7  mt-2"
            variant="semibold"
          >
            Road, vehicles, driver duties
          </Typography.Heading3>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:gap-5">
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
      </div>
    </>
  );
};

export default UserDashboardChapterDetails;
