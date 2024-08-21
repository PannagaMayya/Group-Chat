import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/group-chat/v1",
  timeout: 10000,
});

export default axiosInstance;
