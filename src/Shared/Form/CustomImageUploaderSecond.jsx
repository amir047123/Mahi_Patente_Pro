/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import useImageUploader from "@/Hooks/useImageUploader";
import { CircleX } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import uploadImageFile from "@/assets/AdminDashboard/uploadImage.svg";

const CustomImageUploaderSecond = ({
  name,
  label = "",
  required = true,
  isEditable = true,
  setIsUploading = () => {},
  value,
  resetUploadedFile,
  index = -1,
  labelShown = true,
  isHidden = false,
  previewShown = true,
}) => {
  const [selectedFile, setSelectedFile] = useState(value || null);
  const [, setUploadedFile] = useState(null);
  const { uploading, error, uploadImage } = useImageUploader();
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef(null);

  let errorMessage;
  let fieldName;
  let arrayName;

  if (index < 0) {
    const nameType = name.split(".");

    if (nameType.length > 1) {
      const keys = name.split(".");

      errorMessage = keys.reduce((acc, key) => {
        if (acc && typeof acc === "object" && key in acc) {
          return acc[key];
        }
        return undefined;
      }, errors)?.message;
    } else {
      errorMessage = errors?.[name]?.message;
    }
  } else {
    fieldName = name.split(".").pop();
    arrayName = name.split("[")[0];

    errorMessage = errors?.[arrayName]?.[index]?.[fieldName]?.message;
  }

  useEffect(() => {
    register(name, {
      required: required
        ? `${label || fieldName || name || "This field"} is required`
        : false,
    });
  }, [register, name, required, label]);

  useEffect(() => {
    setIsUploading(uploading);

    return () => {
      setIsUploading(false);
    };
  }, [uploading, setIsUploading]);

  const handleFileChangeDirectly = async (file) => {
    setUploadedFile(file);
    try {
      const uploadedFileUrl = await uploadImage(file);
      if (uploadedFileUrl) {
        setValue(name, uploadedFileUrl, { shouldValidate: true });
        setSelectedFile(uploadedFileUrl);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        console.error("Failed to upload file. Please try again.");
        setUploadedFile(null);
      }
    } catch (error) {
      setUploadedFile(null);
      console.error(
        "An error occurred while uploading:",
        error instanceof Error ? error.message : error
      );
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileChangeDirectly(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue(name, null, { shouldValidate: true });
    setUploadedFile(null);
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChangeDirectly(file);
    }
  }, []);

  useEffect(() => {
    if (resetUploadedFile) {
      setSelectedFile(null);
      setUploadedFile(null);
    }
  }, [resetUploadedFile]);

  return (
    <div
      className={`${!isEditable && "pointer-events-none"} ${
        isHidden ? "hidden" : ""
      }`}
    >
      {label && labelShown && (
        <label
          className="block text-primary_text text-base mb-2"
          htmlFor={name}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex justify-center items-start gap-3">
        <div
          className={`w-full ${errors[name] ? "border-red-500" : ""}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center gap-2">
            <div className="relative inline-block w-full">
              <label
                htmlFor={name}
                className={`flex items-center justify-between ${
                  selectedFile ? "" : "px-4 py-2.5"
                } rounded-xl ${
                  isEditable
                    ? "cursor-pointer bg-gray-100 border focus:bg-gray-100 dark:border dark:border-gray-700 dark:bg-[#1A2B3C]"
                    : "cursor-not-allowed bg-white/70"
                }`}
              >
                <img
                  src={selectedFile || uploadImageFile}
                  alt="Uploaded Preview"
                  className={`w-full h-full object-cover rounded-md ${
                    selectedFile ? "p-2" : "p-4"
                  } `}
                />
              </label>
              <input
                id={name}
                type="file"
                accept="image/*, application/pdf"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            {previewShown && selectedFile && (
              <div className="w-14 relative">
                {selectedFile.endsWith("pdf") ? (
                  <embed
                    src={selectedFile}
                    type="application/pdf"
                    width="40px"
                    height="40px"
                    className="rounded"
                  />
                ) : (
                  <img
                    src={selectedFile}
                    alt="Uploaded Preview"
                    className="max-h-10 max-w-10 object-cover rounded-md"
                  />
                )}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-white absolute right-0 top-0 z-10 rounded-lg"
                >
                  <CircleX size={20} className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          <span
            className={`text-green-500 text-sm mx-4 ${
              !uploading ? "hidden" : ""
            }`}
          >
            {uploading && `Uploading File...`}
            {/* {uploading && `Uploading ${uploadedFile?.name}...`} */}
            {/* {!uploading && uploadedFile && `Uploaded Successful.`} */}
            {/* {!uploading && uploadedFile && `Uploaded ${uploadedFile?.name}.`} */}
          </span>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default CustomImageUploaderSecond;
