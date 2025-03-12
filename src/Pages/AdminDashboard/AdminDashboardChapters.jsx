import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useState } from "react";

import AdminAddChapterModal from "./AdminAddChapterModal";
import AdminChapterCard from "@/Components/AdminDashboard/AdminChapterCard";
import AdminAddChapterCard from "@/Components/AdminDashboard/AdminAddChapterCard";
import toast from "react-hot-toast";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import WarningModal from "@/Shared/WarningModal";
import FilterComponent from "@/Shared/FilterComponent";

const AdminDashboardChapters = () => {
  const [filters, setFilters] = useState({});
  const [isWarningModalOpen, setIsWarningModalOpen] = useState("");
  const [isDeletingSuccess, setIsDeletingSuccess] = useState(false);
  const [itemIndex, setItemIndex] = useState(-1);
  const query = useQueryClient();
  const { deleteEntity } = useCrudOperations("quiz-chapter");

  const handleDelete = async () => {
    const deleteId = response?.data?.[itemIndex]?._id;

    deleteEntity.mutate(deleteId, {
      onSuccess: (updatedData) => {
        toast.success(updatedData?.message);
        setIsDeletingSuccess(true);
        query.invalidateQueries({
          queryKey: ["quiz-chapter/all"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const { useFetchEntities } = useCrudOperations("quiz-chapter/all");

  const {
    data: response,
    error,
    isError,
    isLoading,
  } = useFetchEntities(filters);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <WarningModal
        onConfirm={handleDelete}
        isOpen={isWarningModalOpen}
        setIsOpen={() => {
          setItemIndex(-1);
          setIsWarningModalOpen(false);
          setIsDeletingSuccess(false);
        }}
        isDeleting={deleteEntity.isPending}
        success={isDeletingSuccess}
        closeSuccess={() => {
          setItemIndex(-1);
          setIsDeletingSuccess(false);
        }}
        msg="SUC200 - Chapter Deleted Successfully"
        desc="You are about to delete this chapter with its subjects and questions permanently."
        refetchData={() => {}}
      />

      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Chapters", path: "quiz-manage/chapters" }]}
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
            type: "order",
            name: "order",
            options: ["A-Z", "Z-A"],
          },

          {
            type: "search",
            name: "searchText",
          },
          {
            type: "button",
            compo: (
              <AdminAddChapterModal>
                <span className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
                  Add a Chapter
                </span>
              </AdminAddChapterModal>
            ),
          },
        ]}
      />

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
        {response?.data?.map((item, index) => (
          <AdminChapterCard
            key={index}
            item={item}
            index={index}
            setItemIndex={setItemIndex}
            setIsWarningModalOpen={setIsWarningModalOpen}
          />
        ))}
        <AdminAddChapterCard />
      </div>
    </>
  );
};

export default AdminDashboardChapters;
