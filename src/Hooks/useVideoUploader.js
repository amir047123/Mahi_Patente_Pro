import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/Context/AuthContext";
import toast from "react-hot-toast";

const CHUNK_SIZE = 5 * 1024 * 1024;

const useVideoUploader = () => {
  const { youtubeToken } = useAuthContext();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadVideo = async (
    file,
    title = `video-${Date.now()}`,
    description,
    setUploadedVideoId
  ) => {
    if (!file || !youtubeToken) {
      setStatusMessage("Please select a file and login first.");
      return;
    }

    setIsUploading(true);
    setStatusMessage("Initializing upload...");
    setUploadProgress(0);

    const metadata = {
      snippet: { title, description },
      status: { privacyStatus: "unlisted" },
    };

    try {
      const res = await axios.post(
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        metadata,
        {
          headers: {
            Authorization: `Bearer ${youtubeToken}`,
            "Content-Type": "application/json",
            "X-Upload-Content-Length": file.size,
            "X-Upload-Content-Type": file.type,
          },
        }
      );

      const uploadUrl = res.headers.location;

      if (uploadUrl) {
        setStatusMessage("Uploading...");
        await uploadChunks(uploadUrl, file, setUploadedVideoId);
      } else {
        toast.error("Failed to get upload URL");
        setStatusMessage("Failed to get upload URL");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message;
      toast.error(errorMessage || "Error initializing upload:");
      setStatusMessage(errorMessage || "Error initializing upload");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadChunks = async (uploadUrl, file, setUploadedVideoId) => {
    let offset = 0;

    while (offset < file.size) {
      const chunk = file.slice(offset, offset + CHUNK_SIZE);
      try {
        const res = await axios.put(uploadUrl, chunk, {
          headers: {
            "Content-Range": `bytes ${offset}-${offset + chunk.size - 1}/${
              file.size
            }`,
          },
          onUploadProgress: (event) => {
            if (event.loaded) {
              const percent = Math.round(
                ((offset + event.loaded) / file.size) * 100
              );
              setUploadProgress(percent);
              setStatusMessage(`${percent}% uploaded`);
            }
          },
          validateStatus: (status) =>
            status === 200 || status === 201 || status === 308,
        });

        if (res?.status === 200 || res?.status === 201) {
          setStatusMessage(`Upload successful : ${file?.name}`);
          setUploadProgress(100);
          setUploadedVideoId && setUploadedVideoId(res?.data?.id);
          return;
        }

        if (res?.status === 308) {
          uploadUrl = res?.headers?.location || uploadUrl;
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.error?.message;

        toast.error(errorMessage || "Error uploading chunk:");
        setStatusMessage(errorMessage || "Error uploading video");
        return;
      }

      offset += CHUNK_SIZE;
    }
  };

  return {
    uploadVideo,
    uploadProgress,
    statusMessage,
    isUploading,
    setIsUploading,
  };
};

export default useVideoUploader;
