import axios from "axios";
import { getCookie } from "./Cookie";

const api = axios.create({
  baseURL: "http://13.209.69.234/"
});

// Alter defaults after instance has been created
//api.defaults.headers.common['Authorization'] = AUTH_TOKEN;

api.interceptors.request.use(function (config) {
  const token = getCookie("token");
  // config.headers.common["token"] = `${accessToken}`;
  config.headers.common["authorization"] = `Bearer ${token}`;
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const apis = {
  // user
  signup: (signup) => api.post("/api/signup", signup),
  login: (login) => api.post("/api/login", login ),
  getLoginUserInfo: () => api.get("/api/auth"),
  kakaoLogin: (code) => api.get(`/api/kakao/callback?code=${code}`),
};