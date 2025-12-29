import axios from "axios";

const api = axios.create({
  baseURL: "https://quizz-app-e5k2.onrender.com/api",
  withCredentials: true
});

export default api;

