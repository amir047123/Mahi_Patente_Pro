import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomImageUploader from "@/Shared/Form/CustomImageUploader";
import ErrorMessage from "@/Shared/Form/ErrorMessage";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

const SEOSettings = () => {
    const { useFetchEntities, createEntity, updateEntity } = useCrudOperations("seo");
    const methods = useForm({
        defaultValues: {
            siteName: "",
            siteTitle: "",
            metaKeywords: "",
            metaDescription: "",
            googleTagManagerId: "",
            gtmEnabled: true,
            favicon: null,
            metaImage: null,
        },
    });
    const { handleSubmit, watch, formState: { errors }, reset } = methods;
    const gtmEnabled = watch("gtmEnabled");
    const fetchedId = useRef(null);

    // Fetch SEO settings on mount
    const { data: seoData, isSuccess } = useFetchEntities();
    useEffect(() => {
        if (isSuccess && seoData?.data?._id) {
            const seo = seoData.data;
            fetchedId.current = seo._id;
            // Populate the form with fetched data
            reset({
                ...seo,
                gtmEnabled: seo.gtmEnabled !== undefined ? seo.gtmEnabled : true,
                googleTagManagerId: seo.googleTagManagerId || "",
            });
        }
    }, [isSuccess, seoData, reset]);

    const onSubmit = (data) => {
        if (fetchedId.current) {
            // Update
            updateEntity.mutate({ ...data, _id: fetchedId.current }, {
                onSuccess: (res) => {
                    toast.success(res?.message || "SEO settings updated");
                },
                onError: (error) => {
                    toast.error(error?.message || "Update failed");
                },
            });
        } else {
            // Create
            createEntity.mutate(data, {
                onSuccess: (res) => {
                    toast.success(res?.message || "SEO settings saved");
                    if (res?.data?._id) fetchedId.current = res.data._id;
                },
                onError: (error) => {
                    toast.error(error?.message || "Save failed");
                },
            });
        }
    };

    return (
        <>
            <DashboardBreadcrumb
                role="admin"
                items={[{ name: "SEO Settings", path: "customization/seo-settings" }]}
            />
            <div className="bg-white p-5 rounded-2xl max-w-4xl mx-auto mt-6">
                <FormProvider {...methods}>
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Favicon Upload */}
                        <div className="">
                            <CustomImageUploader
                                name="favicon"
                                label="Favicon (Recommended: 16x16 or 32x32)"
                                required={true}
                                previewShown={true}
                                value={methods.watch("favicon")}
                            />
                            {errors.favicon && <ErrorMessage message={errors.favicon.message} />}
                        </div>

                        {/* Large Icon/Avatar */}
                        <div className="flex">
                            <img src={methods.watch("favicon")} alt="img" className=" rounded-full flex items-center justify-center w-16 h-16 bg-black">

                            </img>
                        </div>

                        {/* Site Name */}
                        <div>
                            <CustomInput
                                name="siteName"
                                label="Site Name"
                                placeholder="Enter Site Name"
                                required={true}
                            />
                        </div>
                        {/* Site Title */}
                        <div>
                            <CustomInput
                                name="siteTitle"
                                label="Site Title"
                                placeholder="Site title"
                                required={true}
                            />
                        </div>
                        {/* Meta Image Upload */}
                        <div className="">
                            <CustomImageUploader
                                name="metaImage"
                                label="Meta Image (Recommended: 1200x630)"
                                required={true}
                                previewShown={true}
                                value={methods.watch("metaImage")}
                            />
                            {errors.metaImage && <ErrorMessage message={errors.metaImage.message} />}
                        </div>
                        <div className="flex">
                            <img src={methods.watch("metaImage")} alt="img" className=" rounded-full flex items-center justify-center w-16 h-16 bg-black">

                            </img>
                        </div>
                        {/* Meta Keywords */}
                        <div>
                            <CustomInput
                                name="metaKeywords"
                                label="Meta Keywords for (Home Page)"
                                placeholder="Enter meta keywords"
                                required={true}
                            />
                        </div>
                        {/* Meta Description */}
                        <div>
                            <CustomInput className="rounded-md"
                                name="metaDescription"
                                label="Meta Description for (Home Page)"
                                placeholder="Enter Meta Description"
                                type="textarea"
                                rows={3}
                                required={true}
                            />
                        </div>
                        {/* Google Tag Manager Toggle */}
                        <div className=" flex items-center gap-4 mt-2">
                            <span className="block text-sm font-medium text-gray-700">Enable Google Tag Manager:</span>
                            <button
                                type="button"
                                aria-pressed={gtmEnabled}
                                onClick={() => methods.setValue("gtmEnabled", !gtmEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/80 ${gtmEnabled ? 'bg-secondary' : 'bg-gray-200'}`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${gtmEnabled ? 'translate-x-5' : 'translate-x-1'}`}
                                />
                            </button>
                            <span className="ml-2 text-sm font-medium text-gray-900">Yes</span>
                        </div>
                        {/* GTM ID */}
                        {gtmEnabled && (
                            <div className="">
                                <CustomInput
                                    name="googleTagManagerId"
                                    label="GTM ID"
                                    placeholder="GTM-XXXXXX"
                                    required={false}
                                />
                            </div>
                        )}
                        {/* Update Button */}
                        <div className=" mt-4">
                            <button type="submit" className="w-full bg-secondary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-full transition-colors">
                                {fetchedId.current ? "Update SEO Setting" : "Save SEO Setting"}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
};

export default SEOSettings;