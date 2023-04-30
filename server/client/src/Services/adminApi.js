import axios from "axios";

const url = "http://localhost:8000";
export const agentController = {
  async getAgents() {
    return await axios.get(`${url}/agent/getall`, { withCredentials: true });
  },
  async banAgent(agentID) {
    return axios
      .post(`${url}/admin/banAgent`, agentID, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async approveAgent(agentID) {
    return axios
      .post(`${url}/admin/approve`, agentID, { withCredentials: true })
      .catch((err) => {
        return err.response;
      });
  },
  async updateAgent(updatedData) {
    return axios
      .put(`${url}/agent/updateAgent`, updatedData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
};
export const adminController = {
  async addAdmin(data) {
    return axios
      .post(`${url}/admin/add`, data, { withCredentials: true })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async updateAdmin(updatedData) {
    return axios
      .put(`${url}/admin/updateAdmin`, updatedData, {
        withCredentials: true,
        // headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
};
