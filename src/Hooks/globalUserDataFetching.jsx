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
    console.error("No token");
  }
};
export default fetchuserData;
