import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:3000/",
// //   responseType: "json",
// });
const url = "http://localhost:3000";

export const authClientApi = {
    async login(credentials) {
        return await axios.post(`${url}/auth/login`, credentials, {
            withCredentials: true,
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
            .catch((err) => {
                console.log(err);
                return err.response;
            });
    },
    async logout() {
        return await axios.get(`${url}/auth/logout`, {withCredentials: true}
        )
            ;
    },
    async Register (data){
        return await axios.post(`${url}/auth/register` , data)
    },

};
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
  };
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
  };
  export const clientController = {
    async getClients() {
      return await axios.get(`${url}/auth/getall`, { withCredentials: true });
    },
    async banClient(clientId) {
      return axios
        .post(`${url}/admin/banClient`, clientId, { withCredentials: true })
        .catch((err) => {
          console.log(err);
          return err.response;
        });
    },
  };
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
        .post(`${url}/admin/approve`, agentID,{ withCredentials: true })
        .catch((err) => {
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
  };