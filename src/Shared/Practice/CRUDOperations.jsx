import Typography from "@/Components/Typography";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdUpdate } from "react-icons/md";

export default function CRUDOperations() {
  const query = useQueryClient();

  /**------------------------* */

  const [filters, setFilters] = useState({
    totalPages: 1,
    currentPage: 1,
    itemPerPage: 10,
    searchText: "",
  });
  const { useFetchEntities } = useCrudOperations("practice/get-all");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities(filters);

  useEffect(() => {
    if (isSuccess && response?.data?.totalPages !== 0) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        totalPages: response?.data?.totalPages,
      }));
    }
  }, [isSuccess, response, filters?.currentPage]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  /**--------------* */

  const [data, setData] = useState("");
  const { createEntity } = useCrudOperations("practice/create");
  const createPractice = () => {
    createEntity.mutate(
      { title: data },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          query.invalidateQueries({
            queryKey: ["practice/get-all"],
          });
          setData("");
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  /**************/

  const { updateEntity: updateData } = useCrudOperations("practice");
  const handleUpdate = async (id) => {
    const item = response?.data?.find((item) => item?._id === id);
    const updatedData = {
      updatedData: {
        ...item,
        title: item?.title + " Updated ",
      },
      _id: id,
    };

    updateData.mutate(updatedData, {
      onSuccess: (updatedData) => {
        toast.success(updatedData?.message);
        query.invalidateQueries({
          queryKey: ["practice/get-all"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  /**************** */
  const { deleteEntity: deleteData } = useCrudOperations("practice");
  const handleDelete = async (id) => {
    deleteData.mutate(id, {
      onSuccess: (updatedData) => {
        toast.success(updatedData?.message);
        query.invalidateQueries({
          queryKey: ["practice/get-all"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <div>
      <div className="my-4">
        <Typography.Heading4 className="mb-4 pb-4 border-b border-slate-300">
          CRUD Operations
        </Typography.Heading4>
      </div>
      <div className="flex items-center gap-2">
        <input
          className="border border-black rounded-full px-2 py-1.5"
          placeholder="Title Of Practice"
          onChange={(e) => setData(e.target.value)}
          value={data}
        />
        <button
          className="bg-green-500 text-white font-semibold px-3 py-1.5 rounded-full"
          onClick={createPractice}
        >
          Create Data
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {response?.data?.length > 0 ? (
          response?.data?.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <p>{item?.title}</p>
              <buttton
                className="cursor-pointer"
                onClick={() => handleDelete(item?._id)}
              >
                <Trash size={20} className="text-red-500" />
              </buttton>
              <buttton
                className="cursor-pointer"
                onClick={() => handleUpdate(item?._id)}
              >
                <MdUpdate size={20} className="text-red-500" />
              </buttton>
            </div>
          ))
        ) : (
          <div>No Data Found!</div>
        )}
      </div>
      <br />
      <div className="flex items-center gap-2">
        <input
          className="border border-black rounded-full px-2 py-1.5"
          placeholder="Search"
          onChange={(e) =>
            setFilters((prev) => {
              return { ...prev, searchText: e.target.value };
            })
          }
          value={filters?.searchText}
        />
      </div>
    </div>
  );
}
