import { baseURL } from "@/Config";
import { useState } from "react";

const useAudioUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadAudio = async (file) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("audioFile", file);

    try {
      const response = await fetch(`${baseURL}/upload/audio-upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      setUploading(false);
      return data.file;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setUploading(false);
      return null;
    }
  };

  return { uploading, error, uploadAudio };
};

export default useAudioUploader;
