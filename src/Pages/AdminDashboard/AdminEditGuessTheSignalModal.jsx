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
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import guessEmpty from "@/assets/AdminDashboard/guess-empty.png";

const AdminEditGuessTheSignalModal = ({ isOpen, setIsOpen, item }) => {
  const query = useQueryClient();

  const methods = useForm();
  const { handleSubmit, setValue, watch, register } = methods;

  const { updateEntity } = useCrudOperations("quiz");

  const onSubmit = (formData) => {
    const updatedData = {
      correctAnswer: formData?.correctAnswer,
      options: [
        formData?.answerA,
        formData?.answerB,
        formData?.answerC,
        formData?.answerD,
      ],
      media: {
        image: formData?.media?.image,
      },
      _id: item?._id,
    };

    updateEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["quiz"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  useEffect(() => {
    setValue("answerA", item?.options?.[0]);
    setValue("answerB", item?.options?.[1]);
    setValue("answerC", item?.options?.[2]);
    setValue("answerD", item?.options?.[3]);
    setValue("media.image", item?.media?.image);
    setValue("correctAnswer", item?.correctAnswer);
  }, [item, setValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" overflow-y-auto max-h-screen  max-w-4xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">
                Edit Guess the Signal Question
              </span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1">
            <div className="mt-4">
              <div className="relative">
                <label
                  className="block text-primary_text text-base mb-2"
                  htmlFor={`media.image`}
                >
                  Image Preview
                </label>
              </div>

              <div className="grid grid-cols-1 min-[475px]:grid-cols-3  gap-4 border-b pb-4 mb-4">
                <div className="pt-4 lg:py-4 pr-4 min-[475px]:border-r w-full text-center flex items-center justify-center">
                  <img
                    src={watch(`media.image`) || guessEmpty}
                    alt="question"
                    className="lg:w-full h-full object-scale-down border rounded-2xl"
                  />
                </div>

                <div className="min-[475px]:col-span-2 sm:flex sm:flex-col sm:justify-between">
                  <div className="mt-3">
                    <CustomImageUpload
                      name={`media.image`}
                      placeholder="Upload Question Image"
                      label="Upload Question Image"
                      previewShown={false}
                      value={item?.image}
                    />
                  </div>

                  <Typography.Body
                    variant="regular"
                    className="text-secondary my-1 pb-2 !text-sm"
                  >
                    <span className="text-secondaryText">Note</span>: Please
                    make sure the image dimensions are 280px in width and 280px
                    in height.
                  </Typography.Body>
                </div>
              </div>

              <div>
                <label className="block text-primary_text text-base mb-4">
                  Enter Options
                </label>

                <div className="grid min-[475px]:grid-cols-2 gap-4">
                  <div className="w-full relative">
                    <div className="mr-10">
                      <CustomInput
                        type="text"
                        name={`answerA`}
                        placeholder="Quiz Answer A"
                        label="Answer A"
                        labelShown={false}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="0"
                      type="radio"
                      className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
                    />
                  </div>

                  <div className="w-full relative">
                    <div className="mr-10">
                      <CustomInput
                        type="text"
                        name={`answerB`}
                        placeholder="Quiz Answer B"
                        label="Answer B"
                        labelShown={false}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="1"
                      type="radio"
                      className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
                    />
                  </div>

                  <div className="w-full relative">
                    <div className="mr-10">
                      <CustomInput
                        type="text"
                        name={`answerC`}
                        placeholder="Quiz Answer C"
                        label="Answer C"
                        labelShown={false}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="2"
                      type="radio"
                      className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
                    />
                  </div>

                  <div className="w-full relative">
                    <div className="mr-10">
                      <CustomInput
                        type="text"
                        name={`answerD`}
                        placeholder="Quiz Answer D"
                        label="Answer D"
                        labelShown={false}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="3"
                      type="radio"
                      className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
                    />
                  </div>
                </div>
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

export default AdminEditGuessTheSignalModal;
