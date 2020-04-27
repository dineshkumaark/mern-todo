import axios from "axios";

export const axiosInstance = axios.create({
   baseURL: "http://192.168.43.197:5005",
   // timeout: 2000,
});

export const authToken = localStorage.getItem("w_auth");
