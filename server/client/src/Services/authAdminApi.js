import axios from "axios";

const url = "http://localhost:8000";
export const authAdmin = {
  async isAdmin(credentials) {
    return await axios
      .post(`${url}/admin/isAdmin`, credentials, {
        withCredentials: true,
      })
      .catch((err) => {
        return err.response;
      });
  },
  async login(credentials) {
    return await axios
      .post(`${url}/admin/login`, credentials, {
        withCredentials: true,
      })
      .catch((err) => {
        return err.response;
      });
  },
  async details() {
    return await axios
      .get(`${url}/admin/get`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .catch((err) => {
        return err.response;
      });
  },
  async logout() {
    return await axios.get(`${url}/admin/logout`, { withCredentials: true });
  },
  async reset(data) {
    return await axios
      .post(`${url}/admin/reset`, data, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async changePassword(data) {
    return await axios
      .post(`${url}/admin/change`, data, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async forgot(email) {
    return await axios
      .post(`${url}/admin/forgot`, email, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
};
