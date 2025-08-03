// src/api/axios.js
import axios from "axios";
import { store } from "../redux/store";
import { setSessionStatus } from "../redux/SessionStatus/SessionSlice";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send cookies
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setSessionStatus()); // clear user from redux
      window.location.href = "/signin"; // redirect
    }
    return Promise.reject(error);
  }
);

export default api;
