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
        <form className="bg-white px-6 pt-3 pb-6 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:grid sm:grid-cols-2 space-y-4 sm:space-y-0 gap-4 mt-4 ">
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

          <div className="text-center mt-7">
            <button
              type="submit"
              className="px-7 py-2.5 w-full bg-secondary rounded-full text-white font-semibold text-center hover:scale-105 duration-500 "
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
