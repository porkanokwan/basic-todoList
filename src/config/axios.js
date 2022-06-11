import axios from "axios";
import * as localStorageService from "../service/localStorage";
import { API_ENDPOINT_URL } from "./env";

// axios จะกลายเป็น obj ที่ config baseUrl ไว้เรียบร้อยแล้ว สามารถเรียกใช้ได้เลย
axios.defaults.baseURL = API_ENDPOINT_URL;

// ถ้าใน localStorage ค่า token อยู่ให้แนบ headers: { Authorization: } เข้าไปในทุกๆ request
axios.interceptors.request.use(
  // parameter ตัวที่ 1 : ถ้าก่อนส่ง request ทำงานสำเร็จจะทำงานที่นี่
  (config) => {
    const token = localStorageService.getToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config; // ทุก request จะ config  headers.Authorization = "Bearer " + token; ให้เราอัตโนมัติ
  },
  // parameter ตัวที่ 2 : ถ้าก่อนส่ง request ทำงานไม่สำเร็จจะทำงานที่นี่
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
