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

const AdminAddSubjectModal = ({ children }) => {
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
        query.invalidateQueries({
          queryKey: ["subject", formData?.chapter],
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
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="max-w-4xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              {" "}
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">Add a Chapter</span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1">
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
                name="status"
                label="Select Status"
                options={statusOptions}
                placeholder="Select Status"
              />
              <CustomSelect
                isHidden={true}
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

export default AdminAddSubjectModal;
