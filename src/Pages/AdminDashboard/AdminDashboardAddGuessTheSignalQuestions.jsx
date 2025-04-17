import Typography from "@/Components/Typography";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import WarningModal from "@/Shared/WarningModal";
import { CirclePlus, CircleX } from "lucide-react";
import { useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import guessEmpty from "@/assets/AdminDashboard/guess-empty.png";
import CustomInput from "@/Shared/Form/CustomInput";
import Spinner from "@/Components/ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";

const AdminDashboardAddGuessTheSignalQuestions = () => {
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

  const { handleSubmit, control, watch, getValues, register, setError } =
    methods;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "quizs",
  });

  const { createEntity } = useCrudOperations("quiz/create");

  const onSubmit = (formData) => {
    if (!formData?.quizs || !Array.isArray(formData.quizs)) {
      toast.error("Invalid quiz data.");
      return;
    }

    const updatedData = {
      category: "Guess the Signal",
      bodyData: [],
    };

    let hasError = false;

    formData.quizs.forEach((quiz, quizIndex) => {
      const answers = [
        quiz?.answerA?.trim(),
        quiz?.answerB?.trim(),
        quiz?.answerC?.trim(),
        quiz?.answerD?.trim(),
      ].filter(Boolean);

      if (answers.length !== 4) {
        toast.error(`Quiz ${quizIndex + 1} must have exactly four options.`);
        hasError = true;
        return;
      }

      const uniqueAnswers = new Set(answers);

      if (uniqueAnswers.size !== 4) {
        toast.error(`Quiz ${quizIndex + 1} must have unique options.`);
        hasError = true;

        // Set error for duplicate values
        const seen = new Set();
        ["A", "B", "C", "D"].forEach((label) => {
          const answer = quiz[`answer${label}`]?.trim();
          if (seen.has(answer)) {
            setError(`quizs[${quizIndex}].answer${label}`, {
              type: "manual",
              message: "Each option must be unique.",
            });
          } else {
            seen.add(answer);
          }
        });

        return;
      }

      updatedData.bodyData.push({
        correctAnswer: quiz?.correctAnswer,
        options: [quiz?.answerA, quiz?.answerB, quiz?.answerC, quiz?.answerD],
        meta: {
          quizType: "text",
          difficulty: "Easy",
        },
        media: {
          image: quiz?.image,
        },
      });
    });

    if (hasError) return;

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
          { name: "Guess the Signal", path: "quiz-manage/guess-the-signal" },
          {
            name: "Add Guess the Signal",
            path: "quiz-manage/guess-the-signal/add-guess-the-signal",
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
                    className="!bg-[#F3F4F6] h-14 px-4 rounded-2xl border flex items-center gap-2 pr-10 relative cursor-move"
                  >
                    <span className="text-primary">{index + 1}.</span>
                    <img
                      src={watch(`quizs[${index}].image`) || guessEmpty}
                      alt="question"
                      className="w-12 h-10 object-cover rounded"
                    />
                    <span className="line-clamp-1">
                      {getCorrectAnswer(index)}
                    </span>
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
                    <label
                      className="block text-primary_text text-base mb-2"
                      htmlFor={`quizs[${index}].image`}
                    >
                      Image Preview
                    </label>

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

                  <div className="grid grid-cols-1 min-[475px]:grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-4 border-b pb-4 mb-4">
                    <div className="pt-4 lg:py-4 pr-4 min-[475px]:border-r sm:border-r-0 lg:!border-r w-full text-center flex items-center justify-center">
                      <img
                        src={watch(`quizs[${index}].image`) || guessEmpty}
                        alt="question"
                        className="lg:w-full h-full object-scale-down border rounded-2xl"
                      />
                    </div>

                    <div className="min-[475px]:col-span-2 sm:col-span-1 lg:col-span-2 sm:flex sm:flex-col sm:justify-between">
                      <div className="mt-3">
                        <CustomImageUpload
                          name={`quizs[${index}].image`}
                          placeholder="Upload Question Image"
                          label="Upload Question Image"
                          index={index}
                          previewShown={false}
                        />
                      </div>

                      <Typography.Body
                        variant="regular"
                        className="text-secondary my-1 pb-2 !text-sm"
                      >
                        <span className="text-secondaryText">Note</span>: Please
                        make sure the image dimensions are 280px in width and
                        280px in height.
                      </Typography.Body>
                    </div>
                  </div>

                  <div>
                    <label className="block text-primary_text text-base mb-4">
                      Enter Options
                    </label>

                    <div className="grid min-[475px]:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="w-full relative">
                        <div className="mr-10">
                          <CustomInput
                            type="text"
                            name={`quizs[${index}].answerA`}
                            placeholder="Quiz Answer A"
                            label="Answer A"
                            labelShown={false}
                            index={index}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="0"
                          type="radio"
                          className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
                          defaultChecked
                        />
                      </div>

                      <div className="w-full relative">
                        <div className="mr-10">
                          <CustomInput
                            type="text"
                            name={`quizs[${index}].answerB`}
                            placeholder="Quiz Answer B"
                            label="Answer B"
                            labelShown={false}
                            index={index}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="1"
                          type="radio"
                          className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
                        />
                      </div>

                      <div className="w-full relative">
                        <div className="mr-10">
                          <CustomInput
                            type="text"
                            name={`quizs[${index}].answerC`}
                            placeholder="Quiz Answer C"
                            label="Answer C"
                            labelShown={false}
                            index={index}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="2"
                          type="radio"
                          className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
                        />
                      </div>

                      <div className="w-full relative">
                        <div className="mr-10">
                          <CustomInput
                            type="text"
                            name={`quizs[${index}].answerD`}
                            placeholder="Quiz Answer D"
                            label="Answer D"
                            labelShown={false}
                            index={index}
                          />
                        </div>

                        <input
                          {...register(`quizs[${index}].correctAnswer`)}
                          value="3"
                          type="radio"
                          className="ml-2 size-5 absolute top-3 right-1 accent-pink-500 cursor-pointer"
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
              disabled={createEntity?.isPending}
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

export default AdminDashboardAddGuessTheSignalQuestions;
