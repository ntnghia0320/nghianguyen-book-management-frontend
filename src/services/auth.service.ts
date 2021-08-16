import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const headers = {
  'Content-Type': 'application/json',
}

const register = async (userRegister: User) => {
  const response = await axios.post(API_URL + "register", JSON.stringify(userRegister), { headers: headers });
  return response.data;
};

const login = async (userLogin: UserLogin) => {
  const response = await axios.post(API_URL + "login", JSON.stringify(userLogin), { headers: headers });
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