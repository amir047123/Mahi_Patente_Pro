import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import CustomInput from "@/Shared/Form/CustomInput";
import Spinner from "@/Components/ui/Spinner";

const AdminEditBlogCategoryModal = ({ isOpen, setIsOpen, item }) => {
    const { updateEntity } = useCrudOperations("blog-category");

    const methods = useForm({
        defaultValues: {
            name: "",
            slug: "",
            description: "",
        },
    });

    const { handleSubmit } = methods;

    useEffect(() => {
        if (isOpen && item) {
            methods.reset({
                name: item?.name || "",
                slug: item?.slug || "",
                description: item?.description || "",
            });
        }
    }, [isOpen, item, methods]);

    const onSubmit = (data) => {
        updateEntity.mutate(
            { ...data, _id: item?._id },
            {
                onSuccess: (res) => {
                    toast.success(res?.message || "Blog category updated successfully");
                    setIsOpen(false);
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to update blog category");
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
                            <span className="whitespace-nowrap">Edit Blog Category</span>
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

                            {/* Description */}
                            <div>
                                <CustomInput
                                    name="description"
                                    label="Description"
                                    placeholder="Enter description"
                                    required={false}
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                type="submit"
                                disabled={updateEntity?.isPending}
                                className="flex-1 bg-secondary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {updateEntity?.isPending ? (
                                    <Spinner size={20} className="text-white" />
                                ) : (
                                    "Update Category"
                                )}
                            </button>
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    className="flex-1 border border-secondary/50 text-secondary font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </DialogClose>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default AdminEditBlogCategoryModal;
