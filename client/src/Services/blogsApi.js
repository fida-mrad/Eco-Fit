import axios from "axios";

const url = "http://localhost:8000";

export const blogsController = {
    async getBlogs(){
        return await axios.get(`${url}/blogs/`, { withCredentials: true });

    },
    async getBlogsById(){
        return await axios.get(`${url}/blogs/'/:blogId'`, { withCredentials: true });
    }




}