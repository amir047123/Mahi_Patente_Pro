import Typography from "@/Components/Typography";
import totalUsers from "@/assets/AdminDashboard/icon/total-users.svg";
import inactiveUsers from "@/assets/AdminDashboard/icon/inactive-users.svg";
import subUsers from "@/assets/AdminDashboard/icon/sub-users.svg";
import user from "@/assets/AdminDashboard/icon/user.svg";
const UserStatistics = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-5 lg:col-span-3 col-span-5 md:mt-5 mt-3">
      <div className="flex flex-wrap gap-y-5 gap-x-2 justify-between">
        <div className="">
          <Typography.Body
            variant="medium"
            className="text-secondaryText whitespace-nowrap"
          >
            Total Users
          </Typography.Body>

          <div className="flex items-center gap-2 mt-3">
            <img src={totalUsers} alt="list" />
            <Typography.Heading4 variant="bold" className="text-primaryText">
              {data?.userCountResult?.totalUser || 0}
            </Typography.Heading4>
          </div>
        </div>
        <div className="w-[1px] h-16 bg-gray-200" />
        <div>
          <Typography.Body
            variant="medium"
            className="text-secondaryText whitespace-nowrap"
          >
            Admin Users
          </Typography.Body>

          <div className="flex items-center gap-2 mt-3">
            <img src={subUsers} alt="list" />
            <Typography.Heading4 variant="bold" className="text-primaryText">
              {data?.userCountResult?.rolesCount?.admin || 0}
            </Typography.Heading4>
          </div>
        </div>
        <div className="w-[1px] h-16 bg-gray-200" />
        <div>
          <Typography.Body
            variant="medium"
            className="text-secondaryText whitespace-nowrap"
          >
            Normal Users
          </Typography.Body>

          <div className="flex items-center gap-2 mt-3">
            <img src={user} alt="list" />
            <Typography.Heading4 variant="bold" className="text-primaryText">
              {data?.userCountResult?.rolesCount?.user || 0}
            </Typography.Heading4>
          </div>
        </div>
        <div className="w-[1px] h-16 bg-gray-200" />
        <div>
          <Typography.Body
            variant="medium"
            className="text-secondaryText whitespace-nowrap"
          >
            Inactive Users
          </Typography.Body>

          <div className="flex items-center gap-2 mt-3">
            <img src={inactiveUsers} alt="list" />
            <Typography.Heading4 variant="bold" className="text-primaryText">
              {data?.userCountResult?.inactiveCount || 0}
            </Typography.Heading4>
          </div>
        </div>
      </div>

      <div className="md:text-sm text-[12px] text-gray-500 mt-3">
        Last Update: 22 Jan 2025, 12:28 PM
      </div>
    </div>
  );
};

export default UserStatistics;
