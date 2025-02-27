import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminAddChapterModal = ({children}) => {
  const query = useQueryClient();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { useFetchEntities } = useCrudOperations("quiz-category/all");

  const methods = useForm();
  const { handleSubmit, reset, setValue } = methods;

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
  }, [isSuccess, response, setValue]);

  useEffect(() => {
    if (categoryOptions.length > 0) {
      const theoryCategory = categoryOptions?.find(
        (item) => item?.label?.toLowerCase() === "theory"
      );
      setValue("category", theoryCategory?.key);
    }
  }, [categoryOptions, setValue]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

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
    <Dialog className="">
      <DialogTrigger>
        {children}
       
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              {" "}
              <ArrowLeft /> <span className="whitespace-nowrap">Add a Chapter</span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1">
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
                  isEditable={false}
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
          </form>
        </FormProvider>

        <DialogFooter className="flex gap-5 items-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-secondary hover:bg-secondary/90 px-6 py-2.5 text-sm font-medium text-white rounded-full w-full"
          >
            Add Chapter
          </button>
          <DialogClose asChild>
            <button className="border border-secondary/50 px-6 py-2.5 text-sm font-medium text-secondary rounded-full w-full">
              Cancel
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddChapterModal;
