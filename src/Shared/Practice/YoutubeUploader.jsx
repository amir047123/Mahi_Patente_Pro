import { useState } from "react";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "@/Context/AuthContext";

const YoutubeUploader = ({ setVideoId, onError }) => {
  const { youtubeToken, setYoutubeToken } = useAuthContext();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (response) => {
      setYoutubeToken(response.access_token);
    },
    onError: () => {
      setStatusMessage("Authentication failed");
    },
    scope: "https://www.googleapis.com/auth/youtube.upload",
  });

  // Logout
  const logout = () => {
    googleLogout();
    setYoutubeToken(null);
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
    setStatusMessage("");
  };

  // Upload Video to YouTube
  const uploadVideo = async () => {
    if (!file || !youtubeToken) {
      setStatusMessage("Please select a file and login first.");
      return;
    }

    setStatusMessage("Uploading...");
    setUploadProgress(0);

    const metadata = {
      snippet: { title, description },
      status: { privacyStatus: "unlisted" },
    };

    const formData = new FormData();
    formData.append(
      "snippet",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status",
        formData,
        {
          headers: { Authorization: `Bearer ${youtubeToken}` },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(percent);
            }
          },
        }
      );

      if (response.data.id) {
        setStatusMessage("Upload successful!");
        setUploadProgress(100);
        setVideoId && setVideoId(response.data.id);
      } else {
        setStatusMessage(response.data.error?.message || "Upload failed");
        onError && onError(response.data.error?.message);
      }
    } catch (error) {
      setStatusMessage("Error uploading video");
      onError && onError(error?.message || "Upload failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      {!youtubeToken ? (
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          onClick={login}
        >
          Login with Google
        </button>
      ) : (
        <>
          <button
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-600 transition"
            onClick={logout}
          >
            Logout
          </button>

          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 mb-4"
          />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={uploadVideo}
          >
            Upload Video
          </button>

          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="bg-gray-200 w-full h-4 rounded-lg overflow-hidden">
                <div
                  className="bg-green-500 h-4 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-center mt-2">{uploadProgress}% uploaded</p>
            </div>
          )}

          {statusMessage && (
            <p className="text-center mt-4 text-gray-700">{statusMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

export default YoutubeUploader;
