import {Link} from "react-router-dom";
import {blogsController} from "../../Services/blogsApi";
import {Fragment, useEffect, useState} from "react";

const BlogFeaturedSingle = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await blogsController.getBlogs();
                setBlogs(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchBlogs();
    }, []);

    // Randomize blogs order and take the first 3 blogs
    const randomBlogs = blogs.sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <Fragment>
            {console.log(blogs)}
            {randomBlogs.map((blog) => (
                <div className="col-lg-4 col-sm-6" key={blog._id}>
                    <div className="blog-wrap mb-30 scroll-zoom">
                        <div className="blog-img">
                            <Link to={process.env.PUBLIC_URL}>
                                <img
                                    src={"http://localhost:8000/uploads/" + blog.images[0]}
                                    alt=""
                                    style={{
                                        width: "370px",
                                        height: "270px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Link>
                        </div>
                        <div className="blog-content-wrap">
                            <div className="blog-content text-center">
                                <h3>
                                </h3>
                                <span>
                                    {blog.title}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default BlogFeaturedSingle;
