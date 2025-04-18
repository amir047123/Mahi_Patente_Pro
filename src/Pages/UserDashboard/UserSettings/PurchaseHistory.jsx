import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import FilterComponent from "@/Shared/FilterComponent";
import ItemPerPage from "@/Shared/ItemPerPage";
import PaginationCompo from "@/Shared/PaginationCompo";
import { useAuthContext } from "@/Context/AuthContext";

export default function PurchaseHistory() {
  const { user } = useAuthContext();
  const { useFetchEntities } = useCrudOperations(
    "subscription/user-subscriptions"
  );
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 10,
    totalPages: 1,
    package: "",
    userId: user?._id || user?.auth?.email || user?.profile?.phone,
  });

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
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
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Settings", path: "settings" },
          { name: "Purchase History", path: "settings/purchase-history" },
        ]}
      />

      <div className=" h-full mb-4">
        <FilterComponent
          filters={filters}
          setFilters={setFilters}
          fields={[
            {
              type: "date",
              name: "date",
            },
            {
              type: "package",
              name: "package",
              options: ["Basic", "Premium", "Pro", "Business", "Enterprise"],
            },
            {
              type: "status",
              name: "status",
              options: ["Active", "Used", "Expired", "Cancelled"],
            },
          ]}
        />
        <div className="px-4 py-5 bg-white rounded-2xl text-left h-[98%] overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-secondary !font-normal text-nowrap bg-[#EAF2FA] text-sm">
                <th className="p-2 rounded-l-full pl-4">Subscription ID</th>
                <th className="p-2">Purchase Date & Time</th>
                <th className="p-2 text-center">Subscription Name</th>
                <th className="p-2 text-center">Amount</th>
                <th className="p-2 text-center">Duration</th>
                <th className="p-2 rounded-r-full text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center">
                    <div className="flex items-center justify-center">
                      <Spinner size={40} />
                    </div>
                  </td>
                </tr>
              ) : response?.data?.subscriptions?.length > 0 ? (
                response?.data?.subscriptions?.map((item, index) => (
                  <tr key={index} className="text-secondaryText border-b">
                    <td className="p-2 py-3">{item?._id?.slice(0, 8)}</td>
                    <td className="p-2 py-3 pl-4">
                      <span className="text-nowrap block">
                        {new Date(item?.startDate)?.toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-nowrap">
                        {new Date(item?.startDate)?.toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="text-center p-2 py-3">
                      {item?.package?.name}
                    </td>
                    <td className="text-center p-2 py-3">{item?.price}</td>
                    <td className="text-center p-2 py-3 capitalize">
                      {item?.package?.duration === 30
                        ? "1 month"
                        : item?.package?.duration === 90
                        ? "3 month"
                        : item?.package?.duration === 180
                        ? "6 month"
                        : item?.package?.duration === 365
                        ? "1 year"
                        : `${item?.package?.duration || 0} days`}
                    </td>

                    <td
                      className={`text-center p-2 py-3 ${
                        item?.status === "Active"
                          ? "text-green-500"
                          : item?.status === "Used"
                          ? "text-blue-500"
                          : item?.status === "Expired"
                          ? "text-orange-500"
                          : "text-red-500"
                      }`}
                    >
                      {item?.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td colSpan={6} className="py-4 text-center !text-sm">
                    No Purchase History Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between mt-10">
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
        </div>
      </div>
    </div>
  );
}
