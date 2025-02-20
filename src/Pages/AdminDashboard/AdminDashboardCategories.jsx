import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminDashboardCategories = () => {
  const query = useQueryClient();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const { createEntity } = useCrudOperations("quiz-category/create");

  const onSubmit = (formData) => {
    createEntity.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["quiz-category/all"],
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
        items={[{ name: "Categories", path: "categories" }]}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <CustomInput
              name="name"
              placeholder="Category Title"
              label="Chapter Title"
            />
            <CustomInput
              type="number"
              name="order"
              placeholder="Category Number"
              label="Category Number"
            />

            <CustomInput
              name="image"
              placeholder="Category Image"
              label="Category Image"
            />

            <CustomSelect
              name="status"
              label="Select Status"
              options={statusOptions}
              placeholder="Select Status"
            />

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

export default AdminDashboardCategories;
