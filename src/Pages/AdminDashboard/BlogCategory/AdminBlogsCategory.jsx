import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useEffect, useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import FilterComponent from "@/Shared/FilterComponent";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import Spinner from "@/Components/ui/Spinner";
import { RiDeleteBin7Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import WarningModal from "@/Shared/WarningModal";
import { useQueryClient } from "@tanstack/react-query";
import AdminEditBlogCategoryModal from "./AdminEditBlogCategoryModal";
import AdminAddBlogCategoryModal from "./AdminAddBlogCategoryModal";

const AdminBlogsCategory = () => {
    const [filters, setFilters] = useState({
        status: "",
        currentPage: 1,
        itemPerPage: 10,
        totalPages: 1,
    });
    const query = useQueryClient();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState("");
    const [isDeletingSuccess, setIsDeletingSuccess] = useState(false);
    const [item, setItem] = useState(null);

    const { useFetchEntities, deleteEntity } = useCrudOperations("blog-category");
    const {
        data: response,
        error,
        isError,
        isLoading,
        isSuccess,
    } = useFetchEntities(filters);
    console.log(response)
    useEffect(() => {
        if (isSuccess && response?.success) {
            setFilters((prev) => ({
                ...prev,
                totalPages:
                    response?.data?.length === 0 ? 1 : response?.data?.length,
            }));
        }
    }, [isSuccess, response]);

    if (isError && !isLoading) {
        toast.error(error?.message);
    }


    const handleDelete = async () => {
        const deleteId = item?._id;

        deleteEntity.mutate(deleteId, {
            onSuccess: (updatedData) => {
                toast.success(updatedData?.message);
                setIsDeletingSuccess(true);
                query.invalidateQueries({
                    queryKey: ["/blog-category"],
                });
            },
            onError: (error) => {
                toast.error(error?.message);
            },
        });
    };

    return (
        <>
            <DashboardBreadcrumb
                role="admin"
                items={[{ name: "Category", path: "blogs/category" }]}
            />

            <FilterComponent title="Category"
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
                                    Add Category
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
                                Name
                            </th>

                            <th className="py-3 px-4 text-right text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
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
                                response?.data?.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 border-b">


                                    <td className="py-4 px-4 text-sm text-green-600 text-left">
                                        {item?.name || "N/A"}
                                    </td>



                                    <td className="py-4 px-4 text-sm text-blue-600 flex gap-2 items-center justify-end">
                                        <button
                                            className="bg-red-100 text-red-600 rounded-md p-2"
                                            onClick={() => {
                                                setItem(item);
                                                setIsWarningModalOpen(true);
                                            }}
                                        >
                                            <RiDeleteBin7Line />
                                        </button>
                                        <button name="edit"
                                            className="bg-red-100 text-red-600 rounded-md p-2"
                                            onClick={() => {
                                                setItem(item);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            <CiEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="">
                                <td colSpan={8} className="py-4 text-center !text-sm">
                                    No Blog Category Found!
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
            <AdminAddBlogCategoryModal
                isOpen={isCreateModalOpen}
                setIsOpen={setIsCreateModalOpen}
            />

            <AdminEditBlogCategoryModal
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
                item={item}
            />
            <WarningModal
                onConfirm={handleDelete}
                isOpen={isWarningModalOpen}
                setIsOpen={() => {
                    setIsWarningModalOpen(false);
                    setIsDeletingSuccess(false);
                }}
                isDeleting={deleteEntity.isPending}
                success={isDeletingSuccess}
                closeSuccess={() => {
                    setIsDeletingSuccess(false);
                }}
                msg="SUC200 - Blog Deleted Successfully"
                desc="You are about to delete this blog permanently."
                refetchData={() => { }}
            />
        </>
    );
};

export default AdminBlogsCategory;
