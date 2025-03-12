import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useEffect, useState } from "react";
import PaginationCompo from "@/Shared/PaginationCompo";
import ItemPerPage from "@/Shared/ItemPerPage";
import AdminEditChooseTheSignalModal from "./AdminEditChooseTheSignalModal";
import toast from "react-hot-toast";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import Spinner from "@/Components/ui/Spinner";
import FilterComponent from "@/Shared/FilterComponent";

const AdminDashboardChooseTheSignalQuestions = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [filters, setFilters] = useState({});
  const { useFetchEntities } = useCrudOperations("quiz");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities({ category: "Choose 4 to 1 Signal" });

  useEffect(() => {
    if (isSuccess && response?.success) {
      console.log(response?.data);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  useEffect(() => {
    if (!isEditModalOpen) {
      setItem(null);
    }
  }, [isEditModalOpen]);

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Choose 4 to 1", path: "quiz-manage/choose-4-to-1" }]}
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
            type: "level",
            name: "level",
            options: ["Hard", "Medium", "Easy"],
          },

          {
            type: "search",
            name: "searchText",
          },
          {
            type: "link",
            name: "Add Choose 4 to 1 Signal Question",
            path: "/admin-dashboard/quiz-manage/choose-4-to-1/add-choose-4-to-1",
          },
        ]}
      />

      <div className="overflow-x-auto bg-white p-5 rounded-2xl">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#EAF2FA] rounded-full ">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap  uppercase tracking-wider">
                Quiz ID
              </th>

              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Quiz Question
              </th>

              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Correct Image
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Image Options
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-secondary whitespace-nowrap uppercase tracking-wider">
                Last Update
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
            ) : response?.data?.questions?.length > 0 ? (
              response?.data?.questions?.map((quiz, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-secondaryText">
                    {quiz.id}
                  </td>

                  <td className="py-4 px-4 text-sm text-secondaryText line-clamp-2">
                    {quiz?.question}
                  </td>

                  <td className="py-4 px-4 text-sm text-secondaryText whitespace-nowrap">
                    <img
                      className="w-16 rounded-lg"
                      src={quiz?.options[parseInt(quiz?.correctAnswer)]}
                      alt=""
                    />
                  </td>

                  <td className="py-4 px-4 text-sm text-secondaryText font-medium ">
                    <div className="flex gap-1">
                      {quiz?.options?.map((option, index) => (
                        <img
                          key={index}
                          className="w-16 rounded-lg"
                          src={option}
                          alt="quiz"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText text-nowrap">
                    <span className="block">
                      {new Date(quiz?.updatedAt)?.toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>
                      {new Date(quiz?.updatedAt)?.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-secondaryText flex justify-center gap-5">
                    <button
                      onClick={() => {
                        setItem(quiz);
                        setIsEditModalOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>{" "}
                    </button>
                    <button className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={6} className="py-4 text-center !text-sm">
                  No Question Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <AdminEditChooseTheSignalModal
          item={item}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
        />
      </div>

      <div className="flex justify-between mt-5 mb-10 bg-white p-4 rounded-xl">
        <ItemPerPage />
        <PaginationCompo />
      </div>
    </>
  );
};

export default AdminDashboardChooseTheSignalQuestions;
