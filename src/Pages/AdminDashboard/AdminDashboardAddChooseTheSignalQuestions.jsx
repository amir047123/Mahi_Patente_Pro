import Typography from "@/Components/Typography";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import WarningModal from "@/Shared/WarningModal";
import { CirclePlus, CircleX } from "lucide-react";
import { useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import guessEmpty from "@/assets/AdminDashboard/guess-empty.png";
import CustomInput from "@/Shared/Form/CustomInput";
import Spinner from "@/Components/ui/Spinner";
import CustomImageUploaderSecond from "@/Shared/Form/CustomImageUploaderSecond";
import { useQueryClient } from "@tanstack/react-query";

const AdminDashboardAddChooseTheSignalQuestions = () => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState("");
  const [isDeletingSuccess, setIsDeletingSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [quizIndex, setQuizIndex] = useState("");
  const query = useQueryClient();

  const methods = useForm({
    defaultValues: {
      quizs: [{}],
    },
  });

  const { handleSubmit, reset, control, watch, getValues, register, setError } =
    methods;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "quizs",
  });

  const { createEntity } = useCrudOperations("quiz/create");

  const onSubmit = (formData) => {
    const options = formData?.quizs
      ?.flatMap((item) => [
        item?.answerA?.trim(),
        item?.answerB?.trim(),
        item?.answerC?.trim(),
        item?.answerD?.trim(),
      ])
      .filter(Boolean);

    if (options.length !== 4) {
      toast.error("There must be exactly four options.");
      return;
    }

    const uniqueValues = new Set(options);

    if (uniqueValues.size !== 4) {
      toast.error("Quizzes must have unique options.");

      formData.quizs.forEach((item, quizIndex) => {
        const answers = [
          item.answerA,
          item.answerB,
          item.answerC,
          item.answerD,
        ];
        const seen = new Set();

        answers.forEach((answer, idx) => {
          if (seen.has(answer?.trim())) {
            setError(
              `quizs[${quizIndex}].answer${String.fromCharCode(65 + idx)}`,
              {
                type: "manual",
                message: "Each option must be unique.",
              }
            );
          } else {
            seen.add(answer?.trim());
          }
        });
      });

      return;
    }

    const updatedData = {
      category: "Choose 4 to 1 Signal",
      bodyData: formData?.quizs?.map((item) => {
        return {
          question: item?.question,
          correctAnswer: item?.correctAnswer,
          options: [item?.answerA, item?.answerB, item?.answerC, item?.answerD],
          meta: {
            quizType: "image_selector",
            difficulty: "Easy",
          },
        };
      }),
    };

    createEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["quiz"],
        });
        // reset();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const removeQuiz = (index) => {
    if (getValues("quizs").length > 1) {
      setQuizIndex(index);
      setIsWarningModalOpen(true);
    }
  };

  const removeQuizConfirmed = () => {
    getValues("quizs").length > 1 && remove(quizIndex);
    setQuizIndex(null);
    setIsDeletingSuccess(true);
    setIsDeleting(false);
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const draggedIndex = dragItem.current;
    const overIndex = dragOverItem.current;

    if (draggedIndex !== overIndex) {
      move(draggedIndex, overIndex);
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const getCorrectAnswer = (index) => {
    const values = getValues(`quizs[${index}]`);
    switch (values?.correctAnswer) {
      case "0":
        return values?.answerA;
      case "1":
        return values?.answerB;
      case "2":
        return values?.answerC;
      case "3":
        return values?.answerD;
    }
  };

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[
          { name: "Choose 4 to 1", path: "quiz-manage/choose-4-to-1" },
          {
            name: "Add Choose 4 to 1",
            path: "quiz-manage/choose-4-to-1/add-choose-4-to-1",
          },
        ]}
      />

      <WarningModal
        onConfirm={removeQuizConfirmed}
        isOpen={isWarningModalOpen}
        setIsOpen={() => {
          setQuizIndex(null);
          setIsWarningModalOpen(false);
        }}
        isDeleting={isDeleting}
        success={isDeletingSuccess}
        closeSuccess={() => setIsDeletingSuccess(false)}
        msg="SUC200 - Item Removed"
        refetchData={() => {}}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-6 rounded-[32px] flex justify-between items-center flex-col">
              <div className="grid grid-cols-1 gap-2 w-full">
                <Typography.Body
                  variant="semibold"
                  className="text-gray-600 border-b mb-1 pb-2"
                >
                  Questions
                </Typography.Body>

                {fields?.map((field, index) => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    className="!bg-[#F3F4F6] h-14 px-4 rounded-2xl border flex items-center gap-1 pr-10 relative cursor-move"
                  >
                    <span className="text-primary">{index + 1}.</span>

                    <div className="w-full flex items-center justify-between gap-2">
                      <span className="line-clamp-1">
                        {watch(`quizs[${index}].question`)}
                      </span>
                      <img
                        src={getCorrectAnswer(index) || guessEmpty}
                        alt="question"
                        className="w-12 h-10 object-cover rounded"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeQuiz(index)}
                      className="absolute right-4 top-4.5 text-red-500"
                    >
                      <CircleX size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => append()}
                className="flex items-center justify-center w-fit gap-1 text-green-500 font-semibold text-sm mt-4"
              >
                <span>Add Question</span>
                <CirclePlus size={16} />
              </button>
            </div>
            <div className="sm:col-span-2 bg-white p-6 rounded-[32px]">
              {fields?.map((field, index) => (
                <div key={field.id} className="">
                  <div
                    className={`${
                      index > 0
                        ? "border-b-[1px] border-secondary col-span-3 my-4"
                        : "hidden"
                    }`}
                  ></div>
                  <div className="col-span-3 relative">
                    <CustomInput
                      type="textarea"
                      name={`quizs[${index}].question`}
                      placeholder="Enter Question"
                      label="Enter Question"
                      rows={3}
                      index={index}
                    />

                    <div className="flex items-center gap-2 absolute top-0.5 right-4 text-sm z-10">
                      <span className="text-secondary">
                        Question No. {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => append()}
                        className="w-fit text-green-500"
                      >
                        <CirclePlus size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeQuiz(index)}
                        className="w-fit text-red-500"
                      >
                        <CircleX size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      className="block text-primary_text text-base mb-4"
                      htmlFor={`quizs[${index}].image`}
                    >
                      Upload Image Options{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="grid min-[475px]:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full">
                          <CustomImageUploaderSecond
                            name={`quizs[${index}].answerA`}
                            placeholder="Quiz Answer A"
                            label="Answer A"
                            index={index}
                            labelShown={false}
                            previewShown={false}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="0"
                          type="radio"
                          className="accent-pink-500 cursor-pointer size-5"
                          defaultChecked
                        />
                      </div>

                      <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full">
                          <CustomImageUploaderSecond
                            name={`quizs[${index}].answerB`}
                            placeholder="Quiz Answer B"
                            label="Answer B"
                            index={index}
                            labelShown={false}
                            previewShown={false}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="1"
                          type="radio"
                          className="accent-pink-500 cursor-pointer size-5"
                        />
                      </div>

                      <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full">
                          <CustomImageUploaderSecond
                            name={`quizs[${index}].answerC`}
                            placeholder="Quiz Answer C"
                            label="Answer C"
                            index={index}
                            labelShown={false}
                            previewShown={false}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="2"
                          type="radio"
                          className="accent-pink-500 cursor-pointer size-5"
                        />
                      </div>

                      <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full">
                          <CustomImageUploaderSecond
                            name={`quizs[${index}].answerD`}
                            placeholder="Quiz Answer D"
                            label="Answer D"
                            index={index}
                            labelShown={false}
                            previewShown={false}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="3"
                          type="radio"
                          className="accent-pink-500 cursor-pointer size-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 sm:col-span-3">
            <button
              type="submit"
              className="px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
              disabled={createEntity?.isPending ? true : false}
            >
              {createEntity?.isPending ? (
                <Spinner size={24} className="text-white" />
              ) : (
                "Add A Question"
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdminDashboardAddChooseTheSignalQuestions;
