import axios from "axios";

const url = "http://localhost:8000";

export const authClientApi = {
  async login(credentials) {
    return await axios
      .post(`${url}/auth/login`, credentials, {
        withCredentials: true,
      })
      .catch((err) => {
        return err.response;
      });
  },
  async details() {
    return await axios
      .get(`${url}/auth/get`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res) => {
        return res;
      });
  },
  async logout() {
    return await axios.get(`${url}/auth/logout`, { withCredentials: true });
  },
  async Register(data) {
    return await axios.post(`${url}/auth/register`, data).catch((err) => {
      return err.response;
    });
  },
  async reset(data) {
    return await axios
      .post(`${url}/auth/reset`, data, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async changePassword(data) {
    return await axios
      .post(`${url}/auth/change`, data, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async forgot(email) {
    return await axios
      .post(`${url}/auth/forgot`, email, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
};
