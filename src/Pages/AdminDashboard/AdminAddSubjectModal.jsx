import Typography from "@/Components/Typography";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import CustomVideoUploader from "@/Shared/Form/CustomVideoUploader";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AdminAddSubjectModal = ({ children }) => {
  const [resetUploadedFile, setResetUploadedFile] = useState(1);
  const query = useQueryClient();
  const { chapter } = useParams();
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
  const { handleSubmit, reset, setValue, watch } = methods;

  const { createEntity } = useCrudOperations("subject/create");

  const onSubmit = (formData) => {
    const updatedData = {
      bodyData: { ...formData, chapter: chapter || formData?.chapter },
      category: "Theory",
    };
    createEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["subject/all"],
        });
        query.invalidateQueries({
          queryKey: [`subject/${chapter}`],
        });
        setResetUploadedFile(Math.random());
        setValue("image", "");
        reset();
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

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className=" overflow-y-auto max-h-screen  max-w-4xl bg-[#ECF2F8] "
      >
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              {" "}
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">Add a Subject</span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="sm:col-span-2">
                <CustomInput
                  name="name"
                  placeholder="Intersections at grade and at the glance"
                  label="Subject Title"
                />
              </div>

              <div
                className={`sm:col-span-2 grid gap-4 grid-cols-1 sm:grid-cols-2 ${
                  chapter ? "" : "md:grid-cols-4"
                }`}
              >
                <div className={`${chapter ? "hidden" : "sm:col-span-2"}`}>
                  <CustomSelect
                    isHidden={chapter ? true : false}
                    name="chapter"
                    label="Select Chapter"
                    options={chapterOptions}
                    placeholder="Select Chapter"
                    required={chapter ? false : true}
                  />
                </div>

                <CustomInput
                  type="number"
                  name="order"
                  placeholder="Enter Subject Number"
                  label="Subject No."
                />

                <CustomSelect
                  name="status"
                  label="Status"
                  options={statusOptions}
                  placeholder="Select Status"
                />
              </div>

              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="">
                  <CustomImageUpload
                    name="image"
                    label="Subject Thumbnail"
                    placeholder="Upload Subject Thumbnail"
                    resetUploadedFile={resetUploadedFile}
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

                <CustomVideoUploader
                  name="videoId"
                  label="Subject Video"
                  placeholder="Upload Subject video"
                  title={watch("name")}
                  description={watch("description")}
                />
              </div>

              <div className="sm:col-span-2">
                <CustomInput
                  type="textarea"
                  rows={3}
                  name="description"
                  placeholder="Leave a description here..."
                  label="Write about subject"
                />
              </div>
            </div>
          </form>
        </FormProvider>

        <DialogFooter className="flex gap-5 items-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="text-sm px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
            disabled={createEntity?.isPending}
          >
            {createEntity?.isPending ? (
              <Spinner size={20} className="text-white" />
            ) : (
              "Add A Subject"
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

export default AdminAddSubjectModal;
