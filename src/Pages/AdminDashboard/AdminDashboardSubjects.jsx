import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminDashboardSubjects = () => {
  const query = useQueryClient();
  const [chapterOptions, setChapterOptions] = useState([]);
  const { useFetchEntities } = useCrudOperations("quiz-chapter/all");

  const {
    data: response,
    isSuccess,
    error,
    isError,
    isLoading,
  } = useFetchEntities();

  useEffect(() => {
    if (isSuccess && response?.success) {
      const chapters = response?.data?.map((item) => ({
        key: item?._id,
        label: item?.name,
      }));
      setChapterOptions(chapters);
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const { createEntity } = useCrudOperations("subject/create");

  const onSubmit = (formData) => {
    createEntity.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["subject/all"],
        });
        // reset();
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
        items={[{ name: "Subjects", path: "subject" }]}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <CustomInput
              name="name"
              placeholder="Subject Title"
              label="Subject Title"
            />
            <CustomInput
              type="number"
              name="order"
              placeholder="Subject Number"
              label="Subject Number"
            />
            <CustomSelect
              name="chapter"
              label="Select Chapter"
              options={chapterOptions}
              placeholder="Select Chapter"
            />

            <CustomImageUpload
              name="image"
              label="Upload Image"
              placeholder="Upload Image"
            />
            <div className="col-span-2">
              <CustomInput
                type="textarea"
                rows={3}
                name="description"
                placeholder="Subject Description"
                label="Subject Description"
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

export default AdminDashboardSubjects;
