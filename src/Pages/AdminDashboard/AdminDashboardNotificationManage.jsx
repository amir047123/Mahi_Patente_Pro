import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import FilterComponent from "@/Shared/FilterComponent";
import AdminDashboardAddNotificationModal from "@/Components/AdminDashboard/AdminDashboardAddNotificationModal";
import AdminDashboardEditNotificationModal from "@/Components/AdminDashboard/AdminDashboardEditNotificationModal";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";

const AdminDashboardNotificationManage = () => {
  const [filters, setFilters] = useState({
    status: "",
    currentPage: 1,
    itemPerPage: 10,
    totalPages: 1,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [item, setItem] = useState(null);

  const { useFetchEntities } = useCrudOperations("notification/all");
  const {
    data: response,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useFetchEntities(filters);

  useEffect(() => {
    if (isSuccess && response?.success) {
      setFilters((prev) => ({
        ...prev,
        totalPages:
          response?.data?.totalPages === 0 ? 1 : response?.data?.totalPages,
      }));
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
          // {
          //   type: "status",
          //   name: "status",
          //   options: ["Delivered", "Seen", "Scheduled", "Failed"],
          // },

          {
            type: "search",
            name: "searchText",
          },

          {
            type: "button",
            compo: (
              <button
                onClick={() => {
                  setIsAddModalOpen(true);
                }}
              >
                <span className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
                  Add Notification
                </span>
              </button>
            ),
          },
        ]}
      />

      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#EAF2FA] rounded-full ">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap  uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Notification Title
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Target Users
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Scheduled For
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Created on
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <div className="flex items-center justify-center">
                    <Spinner size={40} />
                  </div>
                </td>
              </tr>
            ) : response?.data?.data?.length > 0 ? (
              response?.data?.data?.map((n, i) => (
                <tr key={i} className="hover:bg-gray-50 border-b">
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {n?._id}
                  </td>

                  <td className="py-4 px-4 text-sm text-secondaryText ">
                    {n?.title}
                  </td>
                  <td className="py-4 px-4 text-sm text-green-600 capitalize">
                    {n?.target} user
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {n?.time ? (
                      <>
                        <span className="text-nowrap block">
                          {new Date(n?.time)?.toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-nowrap">
                          {new Date(n?.time)?.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </span>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-4 px-4 text-sm text-secondaryText">
                    <span className="text-nowrap block">
                      {new Date(n?.createdAt)?.toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-nowrap">
                      {new Date(n?.createdAt)?.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-sm text-blue-600 flex justify-center gap-2">
                    <button
                      className="flex gap-2 items-center"
                      onClick={() => {
                        setItem(n);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <UserRoundPen size={20} /> Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={6} className="py-4 text-center !text-sm">
                  No Notification Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-5 p-4 rounded-xl mb-10 bg-white">
        <ItemPerPage
          itemPerPage={filters?.itemPerPage}
          onLimitChange={(newItemPerPage) =>
            setFilters((prev) => ({
              ...prev,
              itemPerPage: newItemPerPage,
              currentPage: 1,
            }))
          }
        />
        <PaginationCompo
          currentPage={filters?.currentPage}
          totalPages={filters?.totalPages}
          onPageChange={(page) =>
            setFilters((prev) => ({ ...prev, currentPage: page }))
          }
        />
      </div>
      <AdminDashboardAddNotificationModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
      />

      <AdminDashboardEditNotificationModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        item={item}
      />
    </>
  );
};

export default AdminDashboardNotificationManage;
