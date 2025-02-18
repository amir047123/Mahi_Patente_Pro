import toast from "react-hot-toast";
import axios from "axios";
import { baseURL } from "@/Config";

const fetchuserData = async (token) => {
  if (token) {
    const response = await axios.get(`${baseURL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response;
  } else {
    if (!process?.env?.NODE_ENV) {
      toast.error("No token found");
    } else {
      console.error("No token");
    }
  }
};
export default fetchuserData;
