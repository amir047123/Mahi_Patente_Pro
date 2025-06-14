import { useAuthContext } from "@/Context/AuthContext";
import useVideoUploader from "@/Hooks/useVideoUploader";
import { useState } from "react";
import toast from "react-hot-toast";

const YoutubeUploader = () => {
  const { youtubeToken, ytLogin, ytLogout } = useAuthContext();
  const { uploadVideo, uploadProgress, statusMessage } = useVideoUploader();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedVideoId, setUploadedVideoId] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    await uploadVideo(file, title, description, setUploadedVideoId);
  };

  console.log(uploadedVideoId);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      {!youtubeToken ? (
        <button
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          onClick={ytLogin}
        >
          Login with Google
        </button>
      ) : (
        <>
          <button
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-600 transition"
            onClick={ytLogout}
          >
            Logout
          </button>

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
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 mb-4"
            placeholder="Upload Video"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            onClick={handleUpload}
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
            <p className="text-center mt-4 text-red-500">{statusMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

export default YoutubeUploader;
