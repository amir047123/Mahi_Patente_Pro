import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useState } from "react";

const SEOSettings = () => {
    const [form, setForm] = useState({
        siteName: "",
        siteTitle: "",
        metaKeywords: "",
        metaDescription: "",
        gtmId: "",
        gtmEnabled: true,
        favicon: null,
        metaImage: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleToggleGTM = () => {
        setForm((prev) => ({
            ...prev,
            gtmEnabled: !prev.gtmEnabled,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SEO Settings Data:", form);
        // You can replace this with an API call
    };

    return (
        <>
            <DashboardBreadcrumb
                role="admin"
                items={[{ name: "SEO Settings", path: "customization/seo-settings" }]}
            />

            <div className="bg-white p-5 rounded-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Favicon Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Favicon (Recommended: 16x16 or 32x32)
                        </label>
                        <input
                            name="favicon"
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-md"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Large Icon/Avatar */}
                    <div className="flex my-4">
                        <div className="bg-blue-600 rounded-full p-5 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 19.5l1.5-6h16.5l1.5 6M6.75 10.5V6.75A3.75 3.75 0 0110.5 3h3a3.75 3.75 0 013.75 3.75V10.5" />
                            </svg>
                        </div>
                    </div>

                    {/* Site Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                        <input
                            name="siteName"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="CozyCommerce"
                            value={form.siteName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Site Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                        <input
                            name="siteTitle"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Home Page"
                            value={form.siteTitle}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Meta Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Image for (Home Page) (Recommended: 1200x630)
                        </label>
                        <input
                            name="metaImage"
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border rounded-md"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Meta Keywords */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords for (Home Page)</label>
                        <input
                            name="metaKeywords"
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e-commerce, online store"
                            value={form.metaKeywords}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Meta Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description for (Home Page)</label>
                        <textarea
                            name="metaDescription"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                            placeholder="Cozy-commerce is a next.js e-commerce boilerplate built with nextjs, typescript, tailwindcss, and prisma."
                            value={form.metaDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Google Tag Manager Toggle */}
                    <div className="flex items-center space-x-4">
                        <span className="block text-sm font-medium text-gray-700">Enable Google Tag Manager:</span>
                        <button
                            type="button"
                            aria-pressed={form.gtmEnabled}
                            onClick={handleToggleGTM}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${form.gtmEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                            <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${form.gtmEnabled ? 'translate-x-5' : 'translate-x-1'}`}
                            />
                        </button>
                        <span className="ml-2 text-sm font-medium text-gray-900">Yes</span>
                    </div>

                    {/* GTM ID */}
                    {form.gtmEnabled && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GTM ID</label>
                            <input
                                name="gtmId"
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-400"
                                placeholder="GTM-XXXXXX"
                                value={form.gtmId}
                                onChange={handleChange}
                                disabled={!form.gtmEnabled}
                            />
                        </div>
                    )}

                    {/* Update Button */}
                    <div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Update SEO Setting</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SEOSettings;