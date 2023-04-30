import axios from "axios";

const url = "http://localhost:8000";

export const productsController = {
  async addProduct(data) {
    return axios
      .post(`${url}/products/addProduct`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async updateProduct(data) {
    return axios
      .put(`${url}/products/updateProduct`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async getProductsByBrand(brandId) {
    return axios
      .post(`${url}/products/getByBrand`, brandId, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
  async getProductById(id) {
    return axios
      .post(`${url}/products/getById`, id, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
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
  async updateClient(updatedData) {
    return axios
      .put(`${url}/client/updateClient`, updatedData, { withCredentials: true })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  },
};
