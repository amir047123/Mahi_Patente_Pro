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
    formState: { errors },
    setError,
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  console.log(errors);

  const { createEntity } = useCrudOperations("quiz/create");

  const onSubmit = (formData) => {
    console.log(formData);
    if (formData?.meta?.quizType !== "true_false") {
      const options = formData?.options ?? [];

      if (options.length !== 4) {
        toast.error("There must be exactly four options.");
        return;
      }

      const values = options.map((item) => item?.value?.trim()).filter(Boolean);
      const images = options.map((item) => item?.image?.trim()).filter(Boolean);
      const indexArr = [0, 1, 2, 3];

      if (values.length !== 4 && formData?.meta?.quizType === "text") {
        toast.error("Please enter text for each option.");
        indexArr.forEach((index) => {
          setError(`options[${index}].value`, {
            type: "manual",
            message: "Please enter text.",
          });
        });

        return;
      }

      if (
        images.length !== 4 &&
        formData?.meta?.quizType === "image_selector"
      ) {
        toast.error("Please upload image for each option.");
        indexArr.forEach((index) => {
          setError(`options[${index}].image`, {
            type: "manual",
            message: "Please upload image.",
          });
        });

        return;
      }

      const uniqueValues = new Set(values);
      const uniqueImages = new Set(images);

      if (uniqueValues.size !== 4 && formData?.meta?.quizType === "text") {
        toast.error("All options must be unique.");

        indexArr.forEach((index) => {
          setError(`options[${index}].value`, {
            type: "manual",
            message: "All options must be unique.",
          });
        });

        return;
      }

      if (
        uniqueImages.size !== 4 &&
        formData?.meta?.quizType === "image_selector"
      ) {
        indexArr.forEach((index) => {
          setError(`options[${index}].image`, {
            type: "manual",
            message: "All options must be unique.",
          });
        });

        return;
      }
    }

    const updatedData = {
      ...formData,
      options:
        formData?.meta?.quizType === "true_false"
          ? ["True", "False"]
          : formData?.meta?.quizType === "text"
          ? formData?.options?.map((item) => item?.value)
          : formData?.options?.map((item) => item?.image),
      media: {
        ...formData?.media,
        image:
          formData?.meta?.quizType === "image_selector"
            ? undefined
            : formData?.media?.image,
      },
      inherit: {
        ...formData?.inherit,
        chapter:
          quizCategory === "theory" ? formData?.inherit?.chapter : undefined,
        subject:
          quizCategory === "theory" ? formData?.inherit?.subject : undefined,
      },
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

  const quizTypeOptions = [
    { key: "true_false", label: "True/False" },
    { key: "image_selector", label: "Image" },
    { key: "text", label: "Text" },
  ];

  const correctAnswerTrueFalseOptions = [
    { key: "0", label: "True" },
    { key: "1", label: "False" },
  ];

  const correctAnswerTextImageOptions = [
    { key: "0", label: "A" },
    { key: "1", label: "B" },
    { key: "2", label: "C" },
    { key: "3", label: "D" },
  ];

  const getOptionsLabel = (index) => {
    switch (index) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
    }
  };

  const [quizType, setQuizType] = useState("");
  const [quizCategoryId, setQuizCategoryId] = useState("");
  const [quizCategory, setQuizCategory] = useState("");

  useEffect(() => {
    if (quizCategoryId) {
      const category = categoryOptions?.find(
        (item) => item?.key === quizCategoryId
      );
      setQuizCategory(category?.label?.toLocaleLowerCase());
    }
  }, [quizCategoryId, categoryOptions]);

  useEffect(() => {
    remove();
    switch (quizType) {
      case "text":
        remove();
        append({ value: "" });
        append({ value: "" });
        append({ value: "" });
        append({ value: "" });
        break;
      case "image_selector":
        remove();
        append({ image: "" });
        append({ image: "" });
        append({ image: "" });
        append({ image: "" });
        break;
      default:
        remove();
        break;
    }
  }, [quizType, append, remove]);

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
                setValue={setQuizCategoryId}
              />

              <CustomSelect
                required={quizCategory === "theory"}
                name="inherit.chapter"
                label="Select Chapter"
                options={chapterOptions}
                placeholder="Select Chapter"
                isEditable={quizCategory === "theory"}
              />
              <CustomSelect
                required={quizCategory === "theory"}
                name="inherit.subject"
                label="Select Subject"
                options={subjectOptions}
                placeholder="Select Subject"
                isEditable={quizCategory === "theory"}
              />
            </div>

            <CustomSelect
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

            <CustomImageUpload
              required={quizType !== "image_selector"}
              name="media.image"
              placeholder="Upload Image"
              label="Upload Image"
              isEditable={quizType !== "image_selector"}
            />

            <CustomInput name="media.sound" placeholder="Sound" label="Sound" />

            <div className="col-span-2 border border-slate-300"></div>

            <CustomSelect
              name="meta.quizType"
              label="Select Quiz Type"
              options={quizTypeOptions}
              placeholder="Select Quiz Type"
              setValue={setQuizType}
            />

            <CustomSelect
              name={`correctAnswer`}
              label={`Correct Answer`}
              placeholder="Select Answer Value"
              options={
                quizType === "true_false"
                  ? correctAnswerTrueFalseOptions
                  : correctAnswerTextImageOptions
              }
            />

            {fields.map((field, index) => (
              <div key={field.id} className="gap-6">
                <CustomInput
                  required={quizType === "text"}
                  name={`options[${index}].value`}
                  placeholder="Options Value"
                  label={`Option ${getOptionsLabel(index)}`}
                  index={index}
                  isHidden={quizType === "text" ? false : true}
                />

                <CustomImageUpload
                  required={quizType === "image_selector"}
                  name={`options[${index}].image`}
                  placeholder="Options Value"
                  label={`Option ${getOptionsLabel(index)}`}
                  index={index}
                  isHidden={quizType === "image_selector" ? false : true}
                />
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
