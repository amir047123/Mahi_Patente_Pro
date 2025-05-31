import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import FilterComponent from "@/Shared/FilterComponent";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import AdminAddBlogModal from "./AdminAddBlogModal";
import AdminEditBlogModal from "./AdminEditBlogModal";

const AdminBlogs = () => {
    const [filters, setFilters] = useState({
        status: "",
        currentPage: 1,
        itemPerPage: 10,
        totalPages: 1,
    });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [item, setItem] = useState(null);

    const { useFetchEntities } = useCrudOperations("package");
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
                items={[{ name: "Blogs", path: "blogs/posts" }]}
            />

            <FilterComponent title="Blogs"
                fields={[
                   
                    {
                        type: "button",
                        compo: (
                            <button
                                onClick={() => {
                                    setIsCreateModalOpen(true);
                                }}
                            >
                                <span className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
                                    Add Post
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
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="py-6 text-center">
                                    <div className="flex items-center justify-center">
                                        <Spinner size={40} />
                                    </div>
                                </td>
                            </tr>
                        ) : response?.data?.data?.length > 0 ? (
                            response?.data?.data?.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-b">
                                    <td className="py-4 px-4 text-sm text-secondaryText">
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-secondaryText">
                                        {item?.name || "N/A"}
                                    </td>

                                    <td className="py-4 px-4 text-sm text-green-600 ">
                                        €{item?.price || 0}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-secondaryText">
                                        {item?.duration === 30
                                            ? "1 month"
                                            : item?.duration === 90
                                                ? "3 month"
                                                : item?.duration === 180
                                                    ? "6 month"
                                                    : item?.duration === 365
                                                        ? "1 year"
                                                        : `${item?.duration || 0} days`}
                                    </td>

                                    <td className="py-4 px-4 text-sm text-secondaryText">
                                        {item?.features?.join(", ") || "N/A"}
                                    </td>

                                    <td
                                        className={`p-2 py-3 ${item?.status === "Active"
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
                                <td colSpan={8} className="py-4 text-center !text-sm">
                                    No Package Found!
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
            <AdminAddBlogModal
                isOpen={isCreateModalOpen}
                setIsOpen={setIsCreateModalOpen}
            />

            <AdminEditBlogModal
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                item={item}
            />
        </>
    );
};

export default AdminBlogs;
