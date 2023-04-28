import axios from "axios";
const url = "http://localhost:8000";
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
export const authAgent = {
  async register(data) {
    return await axios
      .post(`${url}/agent/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      // .then((response) => {
      //   console.log(response);
      //   return response;
      // })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async login(credentials) {
    return await axios
      .post(`${url}/agent/login`, credentials, {
        withCredentials: true,
      })
      .catch((err) => {
        return err.response;
      });
  },
  async details() {
    return await axios
      .get(`${url}/agent/get`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async logout() {
    return await axios.get(`${url}/agent/logout`, { withCredentials: true });
  },
  async reset(data) {
    return await axios
      .post(`${url}/agent/reset`, data, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async changePassword(data) {
    return await axios
      .post(`${url}/agent/change`, data, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async forgot(email) {
    return await axios
      .post(`${url}/agent/forgot`, email, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
};
