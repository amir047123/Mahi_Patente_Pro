import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { UserRoundPen } from "lucide-react";
import {  useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import FilterComponent from "@/Shared/FilterComponent";
import AdminDashboardCreateSubscriptionModal from "./AdminDashboardCreateSubscriptionModal";

const AdminDashboardSubscriptionManage = () => {
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 10,
    totalPages: 1,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

const plans = [
  {
    planId: "#001",
    planName: "Standard Plan",
    price: "€19.99",
    duration: "Monthly",
    features: "Limited Lessons, Mock Tests, Free Resources",
    status: "Active",
  },
  {
    planId: "#002",
    planName: "Basic Plan",
    price: "€9.99",
    duration: "Monthly",
    features: "Limited Lessons, No Mock Tests, Free Resources",
    status: "Active",
  },
  {
    planId: "#003",
    planName: "Premium Plan",
    price: "€29.99",
    duration: "Monthly",
    features: "Unlimited Lessons, Mock Tests, Premium Support",
    status: "Active",
  },
  {
    planId: "#004",
    planName: "Pro Plan",
    price: "€49.99",
    duration: "Yearly",
    features: "All Premium Features, Personalized Coaching",
    status: "Inactive",
  },
  {
    planId: "#005",
    planName: "Enterprise Plan",
    price: "€99.99",
    duration: "Yearly",
    features: "Custom Features, Dedicated Support, Team Access",
    status: "Active",
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
            type: "status",
            name: "status",
            options: ["Active", "inactive"],
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
                  Create Subscription Plan
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
                Plan ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Plan Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Price
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Duration
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Features
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plans.map((n) => (
              <tr key={n?.planId} className="hover:bg-gray-50 border-b">
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.planId}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText ">
                  {n?.planName}
                </td>
                <td className="py-4 px-4 text-sm text-green-600 ">
                  {n?.price}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.duration}
                </td>
                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.features}
                </td>

                <td className="py-4 px-4 text-sm text-secondaryText">
                  {n?.status}
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
      <AdminDashboardCreateSubscriptionModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </>
  );
};

export default AdminDashboardSubscriptionManage;
