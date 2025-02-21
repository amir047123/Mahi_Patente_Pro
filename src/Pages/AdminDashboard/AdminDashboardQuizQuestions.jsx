import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import CustomImageUpload from "@/Shared/Form/CustomImageUploader";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminDashboardQuizQuestions = () => {
  const query = useQueryClient();

  const [categoryOptions, setCategoryOptions] = useState([]);
  const { useFetchEntities } = useCrudOperations("quiz-category/all");

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
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const [chapterOptions, setChapterOptions] = useState([]);
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
      const chapters = chaptersResponse?.data?.map((item) => ({
        key: item?._id,
        label: item?.name,
      }));
      setChapterOptions(chapters);
    }
  }, [chapterSuccess, chaptersResponse]);

  if (chapterIsError && !chapterIsLoading) {
    toast.error(chapterError?.message);
  }

  const [subjectOptions, setSubjectOptions] = useState([]);
  const { useFetchEntities: useFetchSubjects } =
    useCrudOperations("subject/all");

  const {
    data: subjectsResponse,
    isSuccess: subjectSuccess,
    error: subjectError,
    isError: subjectIsError,
    isLoading: subjectIsLoading,
  } = useFetchSubjects();

  useEffect(() => {
    if (subjectSuccess && subjectsResponse?.success) {
      const subjects = subjectsResponse?.data?.map((item) => ({
        key: item?._id,
        label: item?.name,
      }));
      setSubjectOptions(subjects);
    }
  }, [subjectSuccess, subjectsResponse]);

  if (subjectIsError && !subjectIsLoading) {
    toast.error(subjectError?.message);
  }

  const methods = useForm({
    defaultValues: {
      options: [{}],
    },
  });
  const {
    handleSubmit,
    reset,
    control,
    resetField,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  console.log(errors);

  const { createEntity } = useCrudOperations("quiz/create");

  const onSubmit = (formData) => {
    const updatedData = {
      ...formData,
      correctAnswer:
        formData?.meta?.quizType === "true_false"
          ? formData?.correctAnswerTrueFalse
          : formData?.correctAnswerTextImage,
      options:
        formData?.meta?.quizType === "true_false"
          ? ["True", "False"]
          : formData?.meta?.quizType === "text"
          ? formData?.options?.map((item) => item?.value)
          : formData?.options?.map((item) => item?.image),
      correctAnswerTrueFalse: undefined,
      correctAnswerTextImage: undefined,
    };
    createEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["subject/all"],
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

  const dificultyOptions = [
    { key: "Easy", label: "Easy" },
    { key: "Medium", label: "Medium" },
    { key: "Hard", label: "Hard" },
  ];

  const [quizType, setQuizType] = useState("");

  useEffect(() => {
    remove();
    resetField("correctAnswerTrueFalse");
    resetField("correctAnswerTextImage");

    if (quizType === "image_selector") {
      append({ image: "" });
      append({ image: "" });
      append({ image: "" });
      append({ image: "" });
    }
    //  else if (quizType === "true_false") {
    // append({ type: "true_false", value: "" });
    // append({ type: "true_false", value: "" });
    // resetField("options");
    // resetField("correctAnswer");
    // }
    else if (quizType === "text") {
      append({ value: "" });
      append({ value: "" });
      append({ value: "" });
      append({ value: "" });
    } else {
      remove();
    }
  }, [quizType]);

  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Questions", path: "question" }]}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="col-span-2">
              <CustomInput
                type="textarea"
                name="question"
                placeholder="Quiz Question"
                label="Quiz Question"
                rows={3}
              />
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-4">
              <CustomSelect
                name="inherit.category"
                label="Select Category"
                options={categoryOptions}
                placeholder="Select Category"
              />

              <CustomSelect
                name="inherit.chapter"
                label="Select Chapter"
                options={chapterOptions}
                placeholder="Select Chapter"
              />
              <CustomSelect
                name="inherit.subject"
                label="Select Subject"
                options={subjectOptions}
                placeholder="Select Subject"
              />
            </div>

            <CustomSelect
              required={false}
              name="meta.status"
              label="Select Status"
              options={statusOptions}
              placeholder="Select Status"
            />
            <CustomSelect
              name="meta.difficulty"
              label="Select Difficulty"
              options={dificultyOptions}
              placeholder="Select Difficulty"
            />

            <div className={`${quizType !== "image_selector" ? "" : "hidden"}`}>
              <CustomImageUpload
                required={quizType !== "image_selector"}
                name="media.image"
                placeholder="Upload Image"
                label="Upload Image"
              />
            </div>

            <div
              className={`${quizType !== "image_selector" ? "" : "col-span-2"}`}
            >
              <CustomInput
                name="media.sound"
                placeholder="Sound"
                label="Sound"
              />
            </div>

            <div className="col-span-2 border border-slate-300"></div>

            <CustomSelect
              name="meta.quizType"
              label="Select Quiz Type"
              options={[
                { key: "text", label: "Text" },
                { key: "true_false", label: "True/False" },
                { key: "image_selector", label: "Image" },
              ]}
              placeholder="Select Quiz Type"
              setValue={setQuizType}
            />

            <div className={`${quizType === "true_false" ? "" : "hidden"} `}>
              <CustomSelect
                required={quizType === "true_false"}
                name={`correctAnswerTrueFalse`}
                label={`Correct Answer`}
                placeholder="Select Answer Value"
                options={[
                  { key: "true", label: "True" },
                  { key: "false", label: "False" },
                ]}
              />
            </div>

            <div className={`${quizType !== "true_false" ? "" : "hidden"} `}>
              <CustomInput
                required={quizType !== "true_false"}
                name="correctAnswerTextImage"
                placeholder="Correct Answer Number"
                label="Correct Answer Number"
                type="number"
                max={4}
              />
            </div>

            {fields.map((_, index) => (
              <div key={index} className="gap-6">
                <div className={`${quizType === "text" ? "" : "hidden"} `}>
                  <CustomInput
                    required={quizType === "text"}
                    name={`options[${index}].value`}
                    placeholder="Options Value"
                    label={`Select Options Value ${index + 1}`}
                    index={index}
                  />
                </div>

                <div
                  className={`${
                    quizType === "image_selector" ? "" : "hidden"
                  } `}
                >
                  <CustomImageUpload
                    required={quizType === "image_selector"}
                    name={`options[${index}].image`}
                    placeholder="Options Value"
                    label={`Select Options Value ${index + 1}`}
                    index={index}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 rounded-full text-white font-semibold text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AdminDashboardQuizQuestions;
