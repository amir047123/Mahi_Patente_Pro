import Typography from "@/Components/Typography";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminEditChapterModal = ({ isOpen, setIsOpen, item }) => {
  const query = useQueryClient();

  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  const { updateEntity } = useCrudOperations("quiz-chapter");

  const onSubmit = (formData) => {
    const updatedData = {
      ...formData,
      category: item?.category,
      _id: item?._id,
    };

    updateEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["quiz-chapter/all"],
        });
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

  useEffect(() => {
    setValue("name", item?.name);
    setValue("order", item?.order);
    setValue("status", item?.status);
    setValue("image", item?.image);
    setValue("description", item?.description);
  }, [item, setValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" overflow-y-auto max-h-screen  max-w-4xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              {" "}
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">Edit Chapter</span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="sm:col-span-2">
                <CustomInput
                  name="name"
                  placeholder="Road, vehicles, driver duties"
                  label="Chapter Title"
                />
              </div>

              <CustomInput
                type="number"
                name="order"
                placeholder="Enter Chapter Number"
                label="Chapter No."
              />
              <CustomSelect
                name="status"
                label="Status"
                options={statusOptions}
                placeholder="Select Status"
              />
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="">
                  <CustomImageUpload
                    name="image"
                    label="Chapter Thumbnail"
                    placeholder="Upload Chapter Thumbnail"
                    value={item?.image}
                  />
                  <Typography.Body
                    variant="regular"
                    className="text-secondary mt-2 !text-sm"
                  >
                    <span className="text-secondaryText">Note</span>: Please
                    make sure the logo dimensions are 113px in width and 162px
                    in height.
                  </Typography.Body>
                </div>

                <CustomInput
                  type="textarea"
                  rows={3}
                  name="description"
                  placeholder="Leave a description here..."
                  label="Write about chapter"
                />
              </div>
            </div>
          </form>
        </FormProvider>

        <DialogFooter className="flex gap-5 items-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="text-sm px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
            disabled={updateEntity?.isPending ? true : false}
          >
            {updateEntity?.isPending ? (
              <Spinner size={20} className="text-white" />
            ) : (
              "Save"
            )}
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

export default AdminEditChapterModal;
