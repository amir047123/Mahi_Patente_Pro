import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomImageUploader from "@/Shared/Form/CustomImageUploader";
import ErrorMessage from "@/Shared/Form/ErrorMessage";
import JoditEditor from "jodit-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const AdminAddBlogModal = ({ isOpen, setIsOpen }) => {
    const [content, setContent] = useState("");
    const editor = useRef(null);
    const { createEntity } = useCrudOperations("blog");
    const { useFetchEntities } = useCrudOperations("blog-category");
    const {
        data: categories,
    } = useFetchEntities();


    const methods = useForm({
        defaultValues: {
            title: "",
            metaDescription: "",
            slug: "",
            thumbnail: null,
            tags: "",
            category: "",
        },
    });

    const { handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data) => {
        createEntity.mutate(
            { ...data, content },
            {
                onSuccess: (res) => {
                    toast.success(res?.message || "Blog post created successfully");
                    methods.reset();
                    setContent("");
                    setIsOpen(false);
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to create blog post");
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="overflow-y-auto max-h-screen max-w-4xl bg-[#ECF2F8] lg:p-7 p-3 sm:p-5">
                <DialogHeader>
                    <DialogClose asChild>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
                            <ArrowLeft />{' '}
                            <span className="whitespace-nowrap">Add Blog Post</span>
                        </DialogTitle>
                    </DialogClose>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form className="w-full p-0 sm:p-5 pb-6 rounded-xl bg-white" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            {/* Title */}
                            <div>
                                <CustomInput
                                    name="title"
                                    label="Title"
                                    placeholder="Enter blog title"
                                    required={true}
                                />
                            </div>

                            {/* Meta Description */}
                            <div>
                                <CustomInput
                                    name="metaDescription"
                                    label="Meta Description"
                                    placeholder="Enter meta description"
                                    type="textarea"
                                    rows={3}
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <CustomInput
                                    name="slug"
                                    label="Slug"
                                    placeholder="Enter slug"
                                />
                            </div>

                            {/* Main Image */}
                            <div>
                                <CustomImageUploader
                                    name="thumbnail"
                                    label="Main Image (Recommended Size 750 × 400)"
                                    required={true}
                                    previewShown={true}
                                    value={methods.watch("thumbnail")}
                                />
                                {errors.thumbnail && <ErrorMessage message={errors.thumbnail.message} />}
                            </div>

                            {/* Tags */}
                            <div>
                                <CustomInput
                                    name="tags"
                                    label="Tags (comma separated)"
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <Select className="py-2"
                                    onValueChange={(value) => methods.setValue("category", value)}
                                    defaultValue={methods.watch("category")}
                                >
                                    <SelectTrigger className="w-full border border-gray-200 rounded-full px-4 py-5 focus:outline-none focus:ring-2 focus:ring-secondary/80 bg-white">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.data?.map((category) => (
                                            <SelectItem key={category.name} value={category.name}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category && <ErrorMessage message={errors.category.message} />}
                            </div>

                            {/* Body */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    onChange={(newContent) => {
                                        setContent(newContent);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Save Post
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default AdminAddBlogModal;
