import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import CustomInput from "@/Shared/Form/CustomInput";

const AdminAddBlogCategoryModal = ({ isOpen, setIsOpen }) => {
    const [content, setContent] = useState("");
    const { createEntity } = useCrudOperations("blog-category");


    const methods = useForm({
        defaultValues: {
            name: "",
            description: "",
            slug: "",

        },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        createEntity.mutate(
            { ...data, content },
            {
                onSuccess: (res) => {
                    toast.success(res?.message || "Blog category created successfully");
                    methods.reset();
                    setContent("");
                    setIsOpen(false);
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to create blog category post");
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
                            <span className="whitespace-nowrap">Add Blog Category</span>
                        </DialogTitle>
                    </DialogClose>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form className="w-full p-0 sm:p-5 pb-6 rounded-xl bg-white" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            {/* name */}
                            <div>
                                <CustomInput
                                    name="name"
                                    label="Name"
                                    placeholder="Enter category name"
                                    required={true}
                                />
                            </div>



                            {/* Slug */}
                            <div>
                                <CustomInput
                                    name="slug"
                                    label="Slug"
                                    placeholder="Enter slug"
                                    required={false}
                                />
                            </div>



                            {/* Tags */}
                            <div>
                                <CustomInput
                                    name="description"
                                    label="Description"
                                    placeholder="Enter description"
                                    required={false}
                                />
                            </div>

                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Save Category
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default AdminAddBlogCategoryModal;
