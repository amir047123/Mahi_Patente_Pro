import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import demoUser from "@/assets/AdminDashboard/demo-user.svg";
import { Link } from "react-router-dom";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import FilterComponent from "@/Shared/FilterComponent";

const AdminDashboardUsersManage = () => {
  const [filters, setFilters] = useState({});
  const { useFetchEntities } = useCrudOperations("user/users");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities();

  useEffect(() => {
    if (isSuccess && response?.success) {
      console.log(response?.data);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Users Manage", path: "users-manage" }]}
      />

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        fields={[
          {
            type: "date",
            name: "date",
          },
          {
            type: "progress",
            name: "progress",
            options: ["100% to 0%", "0% to 100%"],
          },

          {
            type: "search",
            name: "searchText",
          },
        ]}
      />

      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#EAF2FA] rounded-full ">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap  uppercase tracking-wider">
                User ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Profile
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Joined On
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Progress(%)
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Last Login
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="py-6 text-center">
                  <div className="flex items-center justify-center">
                    <Spinner size={40} />
                  </div>
                </td>
              </tr>
            ) : response?.data?.length > 0 ? (
              response?.data?.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b">
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {user?._id?.slice(0, 8)}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText whitespace-nowrap">
                    <img
                      className="w-10 rounded-full"
                      src={user?.profile.profilePicture || demoUser}
                      alt="user"
                    />
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText ">
                    {user?.profile?.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-green-600 ">
                    {user?.auth?.email}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText font-medium">
                    <span className="block">
                      {new Date(user?.createdAt)?.toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>
                      {new Date(user?.createdAt)?.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {user?.progress}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    <span className="block">
                      {new Date(user?.auth?.lastLogin)?.toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <span>
                      {new Date(user?.auth?.lastLogin)?.toLocaleString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        }
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-blue-600 flex justify-center gap-2">
                    <Link
                      className="flex gap-2 items-center"
                      to={`/admin-dashboard/users-manage/${user._id}`}
                    >
                      <UserRoundPen size={20} /> View Profile
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={8} className="py-4 text-center !text-sm">
                  No User Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-5 mb-10 bg-white p-4 rounded-xl">
        <ItemPerPage />
        <PaginationCompo />
      </div>
    </>
  );
};

export default AdminDashboardUsersManage;
