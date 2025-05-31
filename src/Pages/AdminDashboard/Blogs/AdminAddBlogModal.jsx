import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/Components/ui/Spinner";
import JoditEditor from "jodit-react";

const AdminAddBlogModal = ({ isOpen, setIsOpen }) => {
    const [content, setContent] = useState("")
    const query = useQueryClient();
    const editor = useRef(null);
    const methods = useForm();
    const {
        handleSubmit,
        reset,
        register,
        control,
        formState: { errors },
    } = methods;

    // Placeholder options for category and author
    const categories = [
        { value: '', label: 'Select a category' },
        { value: 'tech', label: 'Tech' },
        { value: 'lifestyle', label: 'Lifestyle' },
    ];


    const onSubmit = async (data) => {
        // You can handle file upload and rich text here
        console.log('Blog Post Data:', { ...data, content });
        reset();
        setIsOpen(false);
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

                <form className="w-full p-0 sm:p-5 pb-6 rounded-xl bg-white" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/80"
                                placeholder="Title"
                                {...register('title', { required: 'Title is required' })}
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-2">{errors.title.message}</p>}
                        </div>
                        {/* Meta Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/80"
                                placeholder="Meta Description"
                                {...register('metaDescription')}
                            />
                        </div>
                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/80"
                                placeholder="Slug"
                                {...register('slug')}
                            />
                        </div>
                        {/* Main Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Main Image (Recommended Size 750 × 400) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-secondary/5 file:text-secondary hover:file:bg-secondary/10 border rounded-md"
                                {...register('mainImage', { required: 'Main image is required' })}
                            />
                            {errors.mainImage && <p className="text-red-500 text-xs mt-2">{errors.mainImage.message}</p>}
                        </div>
                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/80"
                                placeholder="tag1, tag2, tag3"
                                {...register('tags')}
                            />
                        </div>
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/80 bg-white"
                                {...register('category', { required: 'Category is required' })}
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value} disabled={cat.value === ''}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category.message}</p>}
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
            </DialogContent>
        </Dialog>
    );
};

export default AdminAddBlogModal;
