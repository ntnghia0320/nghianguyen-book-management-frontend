import axios from "axios";
import { API_URL } from "../const";

const headers = {
  'Content-Type': 'application/json',
}

const register = async (userRegister: User) => {
  const response = await axios.post(API_URL + "/auth/register", JSON.stringify(userRegister), { headers: headers });
  return response.data;
};

const login = async (userLogin: UserLogin) => {
  const response = await axios.post(API_URL + "/auth/login", JSON.stringify(userLogin), { headers: headers });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout
}

export default authService;