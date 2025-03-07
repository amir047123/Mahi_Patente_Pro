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
import CustomInput from "@/Shared/Form/CustomInput";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CustomImageUploaderSecond from "@/Shared/Form/CustomImageUploaderSecond";

const AdminEditChooseTheSignalModal = ({ isOpen, setIsOpen, item }) => {
  const query = useQueryClient();

  const methods = useForm();
  const { handleSubmit, setValue, register } = methods;

  const { updateEntity } = useCrudOperations("quiz");

  const onSubmit = (formData) => {
    const updatedData = {
      question: formData?.question,
      correctAnswer: formData?.correctAnswer,
      options: [
        formData?.answerA,
        formData?.answerB,
        formData?.answerC,
        formData?.answerD,
      ],
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
    setValue("question", item?.question);
    setValue("correctAnswer", item?.correctAnswer);
  }, [item, setValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">
                Edit Choose 4 to 1 Question
              </span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1">
            <div className="mt-4">
              <div className="col-span-3 relative">
                <CustomInput
                  type="textarea"
                  name={`question`}
                  placeholder="Enter Question"
                  label="Enter Question"
                  rows={3}
                />
              </div>

              <div className="mt-4">
                <label
                  className="block text-primary_text text-base mb-4"
                  htmlFor={`image`}
                >
                  Upload Image Options <span className="text-red-500">*</span>
                </label>

                <div className="grid min-[475px]:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full">
                      <CustomImageUploaderSecond
                        name={`answerA`}
                        placeholder="Quiz Answer A"
                        label="Answer A"
                        labelShown={false}
                        previewShown={false}
                        value={item?.options?.[0]}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="0"
                      type="radio"
                      className="accent-pink-500 cursor-pointer size-5"
                    />
                  </div>

                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full">
                      <CustomImageUploaderSecond
                        name={`answerB`}
                        placeholder="Quiz Answer B"
                        label="Answer B"
                        labelShown={false}
                        previewShown={false}
                        value={item?.options?.[1]}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="1"
                      type="radio"
                      className="accent-pink-500 cursor-pointer size-5"
                    />
                  </div>

                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full">
                      <CustomImageUploaderSecond
                        name={`answerC`}
                        placeholder="Quiz Answer C"
                        label="Answer C"
                        labelShown={false}
                        previewShown={false}
                        value={item?.options?.[2]}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="2"
                      type="radio"
                      className="accent-pink-500 cursor-pointer size-5"
                    />
                  </div>

                  <div className="w-full flex flex-col justify-center items-center gap-4">
                    <div className="w-full">
                      <CustomImageUploaderSecond
                        name={`answerD`}
                        placeholder="Quiz Answer D"
                        label="Answer D"
                        labelShown={false}
                        previewShown={false}
                        value={item?.options?.[3]}
                      />
                    </div>

                    <input
                      {...register(`correctAnswer`)}
                      value="3"
                      type="radio"
                      className="accent-pink-500 cursor-pointer size-5"
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

export default AdminEditChooseTheSignalModal;
