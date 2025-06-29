import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import CustomAudioUploader from "@/Shared/Form/CustomAudioUploader";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import WarningModal from "@/Shared/WarningModal";
import { useQueryClient } from "@tanstack/react-query";
import { CirclePlus, CircleX, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AdminDashboardAddQuizQuestions = () => {
  const query = useQueryClient();
  const { chapter, subject } = useParams();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState("");
  const [isDeletingSuccess, setIsDeletingSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [quizIndex, setQuizIndex] = useState("");
  const [chapterId, setChapterId] = useState("");
  const [chapterOptions, setChapterOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [breadCrumbData, setBreadCrumbData] = useState([
    { name: "Questions", path: "quiz-manage/add-quiz" },
  ]);

  const methods = useForm({
    defaultValues: {
      quizs: [{}],
    },
  });

  const {
    handleSubmit,

    control,
    setError,
    setValue,
    watch,
    clearErrors,
    getValues,
  } = methods;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "quizs",
  });

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

  const { useFetchEntities: useFetchChapters } =
    useCrudOperations("quiz-chapter/all");

  const {
    data: chaptersResponse,
    isSuccess: chapterSuccess,
    error: chapterError,
    isError: chapterIsError,
    isLoading: chapterIsLoading,
  } = useFetchChapters();

  useEffect(() => {
    if (chapterSuccess && chaptersResponse?.success) {
      const chapters = chaptersResponse?.data?.chapters?.map((item) => ({
        key: item?._id,
        label: item?.name,
      }));
      setChapterOptions(chapters);
    }
  }, [chapterSuccess, chaptersResponse]);

  if (chapterIsError && !chapterIsLoading) {
    toast.error(chapterError?.message);
  }

  useEffect(() => {
    if (chapter) {
      chapterOptions?.map((item) => {
        if (item?.key === chapter) {
          setChapterId(item?.key);
          setValue("chapter", item?.key);
        }
      });
    }
  }, [chapterOptions, chapter, setValue]);

  const { useEntityById: useFetchSubjects } = useCrudOperations("subject");

  const {
    data: subjectsResponse,
    isSuccess: subjectSuccess,
    error: subjectError,
    isError: subjectIsError,
    isLoading: subjectIsLoading,
  } = useFetchSubjects(chapterId);

  useEffect(() => {
    if (subjectSuccess && subjectsResponse?.success) {
      const subjects = subjectsResponse?.data?.subjects?.map((item) => ({
        key: item?._id,
        label: item?.name,
      }));
      setSubjectOptions(subjects);
    }
  }, [subjectSuccess, subjectsResponse]);

  if (subjectIsError && !subjectIsLoading) {
    toast.error(subjectError?.message);
  }

  useEffect(() => {
    if (subject) {
      subjectOptions?.map((item) => {
        if (item?.key === subject) {
          setValue("subject", item?.key);
        }
      });
    }
  }, [subjectOptions, subject, setValue]);

  const { createEntity } = useCrudOperations("quiz/create");

  const onSubmit = (formData) => {
    const staticData = {
      options: ["True", "False"],
      inherit: {
        chapter: formData?.chapter,
        subject: formData?.subject,
      },
    };

    const updatedData = {
      category: "Theory",
      bodyData: formData?.quizs?.map((item) => {
        return {
          ...item,
          meta: {
            difficulty: item?.difficulty,
            quizType: "true_false",
            status: item?.status,
          },
          media: {
            image: item?.image,
            sound: item?.sound,
          },
          ...staticData,

          difficulty: undefined,
          image: undefined,
          sound: undefined,
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

  useEffect(() => {
    setValue("subject", "");
  }, [chapterId, setValue]);

  useEffect(() => {
    if (chapter && subject && chaptersResponse && subjectsResponse) {
      const selectedSubjectOption = subjectsResponse?.data?.subjects?.find(
        (item) => item?._id === subject,
      );
      const selectedChapterOption = chaptersResponse?.data?.chapters?.find(
        (item) => item?._id === chapter,
      );

      setBreadCrumbData([
        { name: "Chapters", path: "quiz-manage/chapters" },
        {
          name: `${selectedChapterOption?.name}`,
          path: `quiz-manage/chapters/${selectedChapterOption?._id}`,
        },
        {
          name: `${selectedSubjectOption?.name}`,
          path: `quiz-manage/chapters/${selectedChapterOption?._id}/${selectedSubjectOption?._id}`,
        },
        {
          name: `Add Quiz`,
          path: `quiz-manage/chapters/${selectedChapterOption?._id}/${selectedSubjectOption?._id}/add-quiz`,
        },
      ]);
    }
  }, [chapter, subject, chaptersResponse, subjectsResponse]);

  const { createEntity: translate } = useCrudOperations("translate");

  const translateText = (index) => {
    const question = watch(`quizs[${index}].question`);
    if (!question) {
      toast.error("Please enter a question to translate");
      setError(`quizs[${index}].question`, {
        type: "manual",
        message: "Please enter a question to translate",
      });
      return;
    } else {
      clearErrors(`quizs[${index}].question`);
    }
    translate.mutate(
      { sourceText: question },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          setValue(`quizs[${index}].questionBn`, data?.data?.translatedText);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      },
    );
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

  return (
    <>
      <DashboardBreadcrumb role="admin" items={breadCrumbData} />

      <WarningModal
        onConfirm={removeQuizConfirmed}
        isOpen={isWarningModalOpen}
        setIsOpen={() => {
          setQuizIndex(null);
          setIsWarningModalOpen(false);
          setIsDeletingSuccess(false);
        }}
        isDeleting={isDeleting}
        success={isDeletingSuccess}
        closeSuccess={() => {
          setQuizIndex(null);
          setIsDeletingSuccess(false);
        }}
        msg="SUC200 - Item Removed"
        refetchData={() => {}}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 mt-5 rounded-[32px] mb-4">
            <CustomSelect
              name="chapter"
              label="Select Chapter"
              options={chapterOptions}
              placeholder="Select Chapter"
              setValue={setChapterId}
              isEditable={chapter ? false : true}
            />
            <CustomSelect
              name="subject"
              label="Select Subject"
              options={subjectOptions}
              placeholder="Select Subject"
              isEditable={subject ? false : true}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-[32px] flex justify-between items-center flex-col">
              <div className="grid grid-cols-1 gap-2 w-full">
                <Typography.Body
                  variant="semibold"
                  className="text-gray-600 border-b mb-1 pb-2"
                >
                  Quizes
                </Typography.Body>

                {fields?.map((field, index) => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    className="!bg-[#F3F4F6] h-9 px-4 rounded-full flex items-center gap-1 pr-10 relative cursor-move"
                  >
                    <span className="text-primary">{index + 1}.</span>
                    <span className="line-clamp-1">
                      {watch(`quizs[${index}].question`)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeQuiz(index)}
                      className="absolute right-4 top-2.5 text-red-500"
                    >
                      <CircleX size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => append({ question: "", questionBn: "" })}
                className="flex items-center justify-center w-fit gap-1 text-green-500 font-semibold text-sm mt-4"
              >
                <span>Add Question</span>
                <CirclePlus size={16} />
              </button>
            </div>
            <div className="sm:col-span-2 bg-white p-6 rounded-[32px]">
              {fields?.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-4">
                  <div
                    className={`${
                      index > 0
                        ? "border-b-[1px] border-secondary col-span-2 mt-4"
                        : "hidden"
                    }`}
                  ></div>
                  <div className="col-span-2 relative">
                    <CustomInput
                      type="textarea"
                      name={`quizs[${index}].question`}
                      placeholder="Quiz Question"
                      label="Quiz Question"
                      rows={3}
                      index={index}
                      iconType="question"
                    />

                    <button
                      onClick={() => translateText(index)}
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

                    <div className="flex items-center gap-2 absolute top-0.5 right-4 text-sm z-10">
                      <span className="text-secondary">
                        Quiz No. {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => append({ question: "", questionBn: "" })}
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

                  <div className="col-span-2 relative">
                    <CustomInput
                      type="textarea"
                      name={`quizs[${index}].questionBn`}
                      placeholder="Quiz Question (Bangla)"
                      label="Quiz Question (Bangla)"
                      rows={3}
                      index={index}
                    />
                  </div>

                  <div className="col-span-2 grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <CustomAudioUploader
                      name={`quizs[${index}].sound`}
                      placeholder="Upload Suound"
                      label="Upload Sound"
                      index={index}
                    />

                    <CustomSelect
                      name={`quizs[${index}].status`}
                      label="Status"
                      options={statusOptions}
                      placeholder="Select Status"
                      index={index}
                      required={false}
                    />
                  </div>

                  <div className="col-span-2 grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                    <CustomSelect
                      name={`quizs[${index}].difficulty`}
                      label="Difficulty"
                      options={dificultyOptions}
                      placeholder="Select Difficulty"
                      index={index}
                    />

                    <CustomSelect
                      name={`quizs[${index}].correctAnswer`}
                      label="Answer"
                      placeholder="Select Value"
                      options={correctAnswerTrueFalseOptions}
                      index={index}
                    />

                    <div className="">
                      <CustomImageUpload
                        required={false}
                        name={`quizs[${index}].image`}
                        label="Upload Image (Optional)"
                        placeholder="Upload Image (Optional)"
                        index={index}
                      />
                      <Typography.Body
                        variant="regular"
                        className="text-secondary my-1 pb-2 !text-sm"
                      >
                        <span className="text-secondaryText">Note</span>: Please
                        make sure the image dimensions are 280px in width and
                        280px in height.
                      </Typography.Body>
                    </div>
                    <CustomInput
                      type="textarea"
                      name={`quizs[${index}].explanation`}
                      placeholder="Write Question Explanation Here"
                      label="Write Explanation Here"
                      rows={3}
                      index={index}
                      required={false}
                    />
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

export default AdminDashboardAddQuizQuestions;
