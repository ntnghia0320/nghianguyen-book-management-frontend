import axios from "axios";
import { API_URL } from "../const";
import authHeader from "./auth-header";

const getUsers = async () => {
  const response = await axios.get(API_URL + '/users', { headers: authHeader() });
  return response.data;
};

const getUsersByKeyword = async (param: string) => {
  const response = await axios.get(API_URL + `/users/search?${param}`);
  return response.data;
};

const updateUser = async (user: User, userId: number) => {
  const response = await axios.put(API_URL + `/users/${userId}`, JSON.stringify(user), { headers: authHeader() });
  return response.data;
};

const setRoleUser = async (userId: number, roleId: number) => {
  const response = await axios.put(API_URL + `/users/${userId}/roles/${roleId}`, JSON.stringify(`{}`), { headers: authHeader() });
  return response.data;
};

const userService = {
  setRoleUser,
  updateUser,
  getUsers,
  getUsersByKeyword
};

export default userService;
