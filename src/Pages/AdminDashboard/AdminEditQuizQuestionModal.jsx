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
import { ArrowLeft, Languages } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminEditQuizQuestionModal = ({ isOpen, setIsOpen, item }) => {
  const query = useQueryClient();

  const methods = useForm();
  const { handleSubmit, setValue, watch, setError, clearErrors } = methods;

  const dificultyOptions = [
    { key: "Easy", label: "Easy" },
    { key: "Medium", label: "Medium" },
    { key: "Hard", label: "Hard" },
  ];

  const correctAnswerTrueFalseOptions = [
    { key: "0", label: "True" },
    { key: "1", label: "False" },
  ];

  const statusOptions = [
    { key: "Active", label: "Active" },
    { key: "Inactive", label: "Inactive" },
  ];

  const { updateEntity } = useCrudOperations("quiz");

  const onSubmit = (formData) => {
    const updatedData = {
      ...formData,
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
    setValue("question", item?.question);
    setValue("questionBn", item?.questionBn);
    setValue("media.image", item?.media?.image);
    setValue("meta.difficulty", item?.meta?.difficulty);
    setValue("meta.status", item?.meta?.status);
    setValue("correctAnswer", item?.correctAnswer);
    setValue("explaination", item?.explaination);
  }, [item, setValue]);

  const { createEntity: translate } = useCrudOperations("translate");

  const translateText = () => {
    const question = watch(`question`);
    if (!question) {
      toast.error("Please enter a question to translate");
      setError(`question`, {
        type: "manual",
        message: "Please enter a question to translate",
      });
      return;
    } else {
      clearErrors(`question`);
    }
    translate.mutate(
      { sourceText: question },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          setValue(`questionBn`, data?.data?.translatedText);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" overflow-y-auto max-h-screen  max-w-4xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              {" "}
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">Edit Quiz Question</span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative">
                <CustomInput
                  type="textarea"
                  name={`question`}
                  placeholder="Quiz Question"
                  label="Quiz Question"
                  rows={3}
                  iconType="question"
                />

                <button
                  onClick={() => translateText()}
                  className="absolute top-[60px] right-2 mr-4 flex items-center gap-2"
                  type="button"
                  disabled={translate?.isPending}
                >
                  {translate?.isPending ? (
                    <Spinner />
                  ) : (
                    <Languages size={20} style={{ color: "gray" }} />
                  )}
                </button>
              </div>

              <div className="col-span-2 relative">
                <CustomInput
                  type="textarea"
                  name={`questionBn`}
                  placeholder="Quiz Question (Bangla)"
                  label="Quiz Question (Bangla)"
                  rows={3}
                />
              </div>

              <div className="col-span-2 grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
                <CustomImageUpload
                  required={false}
                  name={`media.image`}
                  placeholder="Upload Image"
                  label="Upload Image (Optional)"
                  value={item?.media?.image}
                />

                <CustomSelect
                  name={`meta.status`}
                  label="Status"
                  options={statusOptions}
                  placeholder="Select Status"
                  required={false}
                />
              </div>

              <div className="col-span-2 grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
                <CustomSelect
                  name={`meta.difficulty`}
                  label="Difficulty"
                  options={dificultyOptions}
                  placeholder="Select Difficulty"
                />

                <CustomSelect
                  name={`correctAnswer`}
                  label="Answer"
                  placeholder="Select Value"
                  options={correctAnswerTrueFalseOptions}
                />
              </div>

              <div className="col-span-2">
                <CustomInput
                  type="textarea"
                  name={`explaination`}
                  placeholder="Write Question Explanation Here"
                  label="Write Explanation Here"
                  rows={3}
                  required={false}
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

export default AdminEditQuizQuestionModal;
