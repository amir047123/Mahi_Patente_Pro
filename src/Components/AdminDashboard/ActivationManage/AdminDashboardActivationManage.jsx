import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import FilterComponent from "@/Shared/FilterComponent";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import AdminDashboardCreateActivationModal from "./AdminDashboardCreateActivationModal";
import AdminDashboardViewActivationModal from "./AdminDashboardViewActivationModal";

const AdminDashboardActivationManage = () => {
  const [filters, setFilters] = useState({
    status: "",
    currentPage: 1,
    itemPerPage: 10,
    totalPages: 1,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [item, setItem] = useState(null);

  const { useFetchEntities } = useCrudOperations("subscription/all");
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

  const handleCopy = async (item) => {
    const activationCode = item?.token;
    try {
      if (!activationCode) {
        toast.error("Failed to copy activation code");
        return;
      }
      await navigator.clipboard.writeText(activationCode);
      toast.success(`${activationCode?.slice(0, 5)}... copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy activation code", err);
    }
  };

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Activation Manage", path: "activation-manage" }]}
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
            options: ["Active", "Inactive"],
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
                  setIsCreateModalOpen(true);
                }}
              >
                <span className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
                  Generate Activation Code
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
                Date & Time
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                User Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                User Mobile No.
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Plan Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Duration
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Valid Until
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Activation Code
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
            {isLoading ? (
              <tr>
                <td colSpan={10} className="py-6 text-center">
                  <div className="flex items-center justify-center">
                    <Spinner size={40} />
                  </div>
                </td>
              </tr>
            ) : response?.data?.data?.length > 0 ? (
              response?.data?.data?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 border-b">
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    <span className="text-nowrap block">
                      {item?.startDate
                        ? new Date(item?.startDate)?.toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {item?.subscriber?.user?.profile?.name || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {item?.subscriber?.user?.auth?.phone || "N/A"}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {item?.package?.name || "N/A"}
                  </td>

                  <td className="py-4 px-4 text-sm text-green-600 ">
                    €{item?.price || 0}
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText">
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

                  <td className="py-4 px-4 text-sm text-secondaryText">
                    <span className="text-nowrap block">
                      {item?.expiresAt
                        ? new Date(item?.expiresAt)?.toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-sm text-secondaryText">
                    <button onClick={() => handleCopy(item)}>
                      {item?.token ? `${item?.token?.slice(0, 6)}...` : "N/A"}
                    </button>
                  </td>

                  <td
                    className={`p-2 py-3 ${
                      item?.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item?.status}
                  </td>
                  <td className="py-4 px-4 text-sm text-blue-600 ">
                    <button
                      className="flex gap-2 items-center"
                      onClick={() => {
                        setItem(item);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <ReceiptText size={20} /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={10} className="py-4 text-center !text-sm">
                  No Activations Found!
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
      <AdminDashboardCreateActivationModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />

      <AdminDashboardViewActivationModal
        isOpen={isViewModalOpen}
        setIsOpen={setIsViewModalOpen}
        item={item}
      />
    </>
  );
};

export default AdminDashboardActivationManage;
