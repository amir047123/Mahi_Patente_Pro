import { GoogleOAuthProvider } from "@react-oauth/google";
import YoutubeUploader from "./YoutubeUploader";
import toast from "react-hot-toast";

const CLIENT_ID =
  "734384427786-g2mid8endasnonkcdkda2h13d7c5lqh9.apps.googleusercontent.com";

const LoginToGoogle = () => {
  const handleSuccess = (videoId) => {
    toast.success("Upload successful! Video ID:", videoId);
    console.log("Upload successful! Video ID:", videoId);
  };

  const handleError = (error) => {
    toast.error("Upload error:", error);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex items-center justify-center my-10">
        <YoutubeUploader setVideoId={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginToGoogle;
