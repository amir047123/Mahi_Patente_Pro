import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@/Components/Typography";
import img from "@/assets/UserDashboard/demo-chapeter-img.svg";
import AdminSubjectCard from "@/Components/AdminDashboard/AdminSubjectCard";
import AdminAddSubjectModal from "./AdminAddSubjectModal";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import AdminAddSubjectCard from "@/Components/AdminDashboard/AdminAddSubjectCard";
import FilterComponent from "@/Shared/FilterComponent";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";

const AdminDashboardChapterDetails = () => {
  const [filters, setFilters] = useState({
    currentPage: 1,
    itemPerPage: 11,
    totalPages: 1,
  });
  const { chapter } = useParams();
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Chapters", path: "quiz-manage/chapters" },
  ]);

  const { useFetchEntities } = useCrudOperations(`subject/${chapter}`);

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
        totalPages: response?.data?.totalPages || 1,
      }));
      setBreadCrumbData([
        { name: "Chapters", path: "quiz-manage/chapters" },
        {
          name: `${response?.data?.chapter?.name}`,
          path: `quiz-manage/chapters/${response?.data?.chapter?._id}`,
        },
      ]);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  return (
    <>
      <DashboardBreadcrumb role="admin" items={breadCrumbData} />

      <div className=" gap-4 flex items-center justify-between py-5 border-b mb-5">
        <div className="gap-4 flex items-center">
          <img
            className="h-[100px] object-cover rounded-xl"
            src={response?.data?.chapter?.image || img}
            alt="image"
          />

          <div>
            <Typography.Body variant="medium" className="text-secondaryText">
              Chapter {response?.data?.chapter?.order}
            </Typography.Body>
            <Typography.Heading4
              className="text-primaryText leading-7 mt-2 line-clamp-1"
              variant="semibold"
            >
              {response?.data?.chapter?.name}
            </Typography.Heading4>
            <p className="text-secondaryText text-sm mt-2">
              5 Subject - 18 Question
            </p>
          </div>
        </div>

        <AdminAddSubjectModal>
          <span className="px-6 py-2 whitespace-nowrap text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
            Add a Subject
          </span>
        </AdminAddSubjectModal>
      </div>

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
        ]}
      />

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
        {response?.data?.subjects?.map((subject, index) => (
          <AdminSubjectCard key={index} subject={subject} />
        ))}

        <AdminAddSubjectCard />
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
          options={[
            {
              value: 11,
              label: "11",
            },
            {
              value: 22,
              label: "22",
            },
            {
              value: 33,
              label: "33",
            },
            {
              value: 44,
              label: "44",
            },
            {
              value: 55,
              label: "55",
            },
          ]}
        />
        <PaginationCompo
          currentPage={filters?.currentPage}
          totalPages={filters?.totalPages}
          onPageChange={(page) =>
            setFilters((prev) => ({ ...prev, currentPage: page }))
          }
        />
      </div>
    </>
  );
};

export default AdminDashboardChapterDetails;
