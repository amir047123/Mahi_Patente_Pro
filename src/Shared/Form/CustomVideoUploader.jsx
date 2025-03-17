/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CircleX, Paperclip } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import useVideoUploader from "@/Hooks/useVideoUploader";
import { useAuthContext } from "@/Context/AuthContext";
import { FaYoutube } from "react-icons/fa6";

const CustomVideoUploader = ({
  name,
  label = "",
  required = true,
  isEditable = true,
  setIsUploading = () => {},
  value,
  resetUploadedFile = 1,
  index = -1,
  labelShown = true,
  isHidden = false,
  title = "",
  description,
}) => {
  const { youtubeToken, ytLogin } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState(value || null);
  const { uploadVideo, statusMessage, isUploading } = useVideoUploader();

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const [uploadedVideoId, setUploadedVideoId] = useState(null);

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
  }, [register, name, required, label, resetUploadedFile]);

  useEffect(() => {
    setIsUploading(isUploading);

    return () => {
      setIsUploading(false);
    };
  }, [isUploading, setIsUploading]);

  const handleFileChangeDirectly = async (file) => {
    try {
      await uploadVideo(file, title, description, setUploadedVideoId);
      if (uploadedVideoId) {
        setValue(name, uploadedVideoId, { shouldValidate: true });
        setSelectedFile(uploadedVideoId);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        console.error("Failed to upload file. Please try again.");
      }
    } catch (error) {
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
    if (resetUploadedFile !== 1) {
      setSelectedFile(null);
      setValue(name, null, { shouldValidate: true });
    }
  }, [resetUploadedFile]);

  useEffect(() => {
    if (statusMessage) {
      fileInputRef.current.value = "";
    }
  }, [statusMessage]);

  return (
    <div
      className={`${!isEditable && "pointer-events-none"} min-w-36 ${
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

      {!youtubeToken ? (
        <button
          type="button"
          className={`flex items-center justify-between px-4 text-red-600 rounded-3xl py-2.5 w-full ${
            isEditable
              ? "cursor-pointer bg-white border  dark:border dark:border-gray-700 dark:bg-[#1A2B3C] hover:bg-white/70"
              : "cursor-not-allowed bg-white/70"
          }`}
          onClick={ytLogin}
        >
          <span> Login to upload video</span>
          <FaYoutube size={20} />
        </button>
      ) : (
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
                  className={`flex items-center justify-between px-4 text-gray-600 rounded-3xl py-2.5 ${
                    isEditable
                      ? "cursor-pointer bg-white border  dark:border dark:border-gray-700 dark:bg-[#1A2B3C] hover:bg-white/70"
                      : "cursor-not-allowed bg-white/70"
                  }`}
                >
                  <span>Choose File</span>
                  <Paperclip size={20} />
                </label>
                <input
                  id={name}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  placeholder="Upload Video"
                />
              </div>
              {selectedFile && (
                <div className="w-14 relative">
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

            {/* {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="bg-gray-200 w-full h-4 rounded-lg overflow-hidden">
                <div
                  className="bg-green-500 h-4 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center mt-2">{uploadProgress}% uploaded</p>
            </div>
          )} */}

            {/* <span
            className={`text-green-500 text-sm mx-4 ${
              !isUploading && !uploadedFile ? "hidden" : ""
            }`}
          >
            {isUploading && (
              <p className="text-center mt-2">{uploadProgress}% uploaded</p>
            )} */}
            {/* {uploading && `Uploading ${uploadedFile?.name}...`} */}
            {/* {!isUploading && uploadedFile && `Uploaded Successful.`} */}
            {/* {!uploading && uploadedFile && `Uploaded ${uploadedFile?.name}.`} */}
            {/* </span> */}
          </div>
        </div>
      )}

      {statusMessage && <ErrorMessage message={statusMessage} />}

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default CustomVideoUploader;
