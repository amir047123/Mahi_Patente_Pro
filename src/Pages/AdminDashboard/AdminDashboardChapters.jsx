import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminDashboardChapters = () => {
  const query = useQueryClient();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { useFetchEntities } = useCrudOperations("quiz-category/all");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities();

  useEffect(() => {
    if (isSuccess && response?.success) {
      const category = response?.data?.map((item) => ({
        key: item?._id,
        label: item?.name,
      }));
      setCategoryOptions(category);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const { createEntity } = useCrudOperations("quiz-chapter/create");

  const onSubmit = (formData) => {
    createEntity.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["quiz-chapter/all"],
        });
        // reset();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const statusOptions = [
    { key: "Active", label: "Active" },
    { key: "Inactive", label: "Inactive" },
  ];

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Chapters", path: "chapter" }]}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <CustomInput
              name="name"
              placeholder="Chapter Title"
              label="Chapter Title"
            />
            <CustomInput
              type="number"
              name="order"
              placeholder="Chapter Number"
              label="Chapter Number"
            />

            <div className="col-span-2 grid grid-cols-3 gap-6">
              <CustomSelect
                name="category"
                label="Select Category"
                options={categoryOptions}
                placeholder="Select Category"
              />

              <CustomImageUpload
                name="image"
                label="Upload Image"
                placeholder="Upload Image"
              />

              <CustomSelect
                name="status"
                label="Select Status"
                options={statusOptions}
                placeholder="Select Status"
              />
            </div>

            <div className="col-span-2">
              <CustomInput
                type="textarea"
                rows={3}
                name="description"
                placeholder="Chapter Description"
                label="Chapter Description"
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 rounded-full text-white font-semibold text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdminDashboardChapters;
