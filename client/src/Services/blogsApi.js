import axios from "axios";

const url = "http://localhost:8000";

export const blogsController = {
    async getBlogs(){
        return await axios.get(`${url}/blogs/`, { withCredentials: true });

    },
    async getBlogById(blogId){
        return await axios.get(`${url}/blogs/${blogId}`, { withCredentials: true });
    },

    async addBlog(data) {
        return axios
            .post(`${url}/blogs/addBlog`, data, { withCredentials: true },{
                headers: { "Content-Type": "multipart/form-data" }})
            .catch((err) => {
                console.log(err);
                return err.response;
            });
    },


    async addComment(blogId, data) {
        return axios.post(`${url}/blogs/${blogId}/comments`, data, { withCredentials: true });
    }

}