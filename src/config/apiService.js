import { API_CONFIG, ENDPOINTS } from "./endpoints";
import {
  getAuth,
  postAuth,
  putAuth,
  deleteAuth,
  getPublic,
  postPublic,
} from "./axiosClient";

export const adminRegister = (data) => postPublic(ENDPOINTS.ADMIN_REGISTER, data);
export const loginUser = (data) => postPublic(ENDPOINTS.ADMIN_LOGIN, data);
export const addTeacher = (data) => postPublic(ENDPOINTS.ADD_TEACHER, data);


export const apiService = {
adminRegister,
loginUser,
addTeacher
};