import { API_CONFIG, ENDPOINTS } from "./endpoints";
import {
  getAuth,
  postAuth,
  putAuth,
  deleteAuth,
  getPublic,
  postPublic,
} from "./axiosClient";
import { data } from "react-router-dom";

export const adminRegister = (data) => postPublic(ENDPOINTS.ADMIN_REGISTER, data);
export const loginUser = (data) => postPublic(ENDPOINTS.ADMIN_LOGIN, data);
export const addTeacher = (data) => postPublic(ENDPOINTS.ADD_TEACHER, data);
export const getClasses = () => getPublic(ENDPOINTS.GET_CLASS);
export const addClass = (data) => postPublic(ENDPOINTS.ADD_CLASS, data);
export const getSubjects = (data) => postPublic(ENDPOINTS.GET_SUBJECT, data);
export const addSubject = (data) => postPublic(ENDPOINTS.ADD_SUBJECT, data);
export const getTeacher = () => getPublic(ENDPOINTS.GET_TEACHER);
export const getComplaint = () => getPublic(ENDPOINTS.GET_COMPLAINT);
export const addComplaintCategory = (data) => postPublic(ENDPOINTS.ADD_COMPLAINT_CATEGORY, data);
export const getNotice = (data) => postPublic(ENDPOINTS.GET_NOTICE, data);
export const addNotice = (data) => postPublic(ENDPOINTS.ADD_NOTICE, data);
export const getHomework  = (data) => postPublic(ENDPOINTS.GET_HOMEWORK, data);
export const getMarks = (data) => postPublic(ENDPOINTS.GET_MARKS, data);
export const getAttendance = (data) => postPublic(ENDPOINTS.GET_ATTENDANCE, data);
export const getTeacherSchedule = () => getPublic(ENDPOINTS.GET_TEACHER_SCHEDULE);
export const getExamType = () => getPublic(ENDPOINTS.GET_EXAM_TYPE);
export const addExamType = (data) => postPublic(ENDPOINTS.ADD_EXAM_TYPE, data);

export const apiService = {
  adminRegister,
  loginUser,
  addTeacher,
  getClasses,
  addClass,
  getSubjects,
  addSubject,
  getTeacher,
  getComplaint,
  addComplaintCategory,
  getNotice,
  addNotice,
  getHomework,
  getMarks,
  getAttendance,
  getTeacherSchedule,
  getExamType,
  addExamType
};