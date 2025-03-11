import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { UserRoundPen } from "lucide-react";
import {  useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import FilterComponent from "@/Shared/FilterComponent";
import AdminDashboardEditNotificationModal from "@/Components/AdminDashboard/AdminDashboardAddNotificationModal";

const AdminDashboardNotificationManage = () => {
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 10,
    totalPages: 1,
  });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const notifications = [
    {
      id: "#001",
      notificationTitle: "System Update Notice",
      targetUsers: "All Users",
      status: "Delivered",
      scheduledFor: "-",
      sendOn: "16 Feb 2025, 12:30 PM",
      actionButton: "Edit",
    },
  ];


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
            type: "status",
            name: "status",
            options: ["Delivered", "Seen", "Scheduled", "Failed"],
          },

          {
            type: "search",
            name: "searchText",
          },

          {
            type: "button",
            compo: (
              <button
                onClick={() => {
                  setIsEditModalOpen(true);
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
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Scheduled For
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Send On
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {notifications.map((n) => (
              <tr key={n?.id} className="hover:bg-gray-50 border-b">
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.id}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText ">
                  {n?.notificationTitle}
                </td>
                <td className="py-4 px-4 text-sm text-green-600 ">
                  {n?.targetUsers}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.status}
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.scheduledFor}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.sendOn}
                </td>

                <td className="py-4 px-4 text-sm text-blue-600 flex justify-center gap-2">
                  <button
                    className="flex gap-2 items-center"
                    onClick={() => {
                      setIsEditModalOpen(true);
                    }}
                  >
                    <UserRoundPen size={20} /> Edit
                  </button>
                </td>
              </tr>
            ))}
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
      <AdminDashboardEditNotificationModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default AdminDashboardNotificationManage;
