import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogsController } from "../../Services/blogsApi";

const BlogPosts = () => {
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

    return (
        <Fragment>
            {blogs.map((blog) => (
                <div key={blog._id} className="col-lg-6 col-md-6 col-sm-12">
                    <div className="blog-wrap-2 mb-30">
                        <div className="blog-img-2">
                            <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                                <img
                                    src={ "http://localhost:8000/uploads/" + blog.images[0]}
                                    alt=""
                                    style={{
                                        width : "750px",
                                        height : "440px",
                                        objectFit: "cover"
                                    }}
                                />
                            </Link>
                        </div>
                        <div className="blog-content-2">
                            <div className="blog-meta-2">
                                <ul>
                                    <li>{blog.createdAt}</li>
                                    <li>
                                        <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                                            {blog?.comments?.length} <i className="fa fa-comments-o" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <h4>
                                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>{blog.title}</Link>
                            </h4>
                            <p>{blog.description}</p>
                            <div className="blog-share-comment">
                                <div className="blog-btn-2">
                                    <Link to={process.env.PUBLIC_URL + `/blog-details-standard/${blog._id}`}>read more</Link>
                                </div>
                                <div className="blog-share">
                                    <span>share :</span>
                                    <div className="share-social">
                                        <ul>
                                            <li>
                                                <a className="facebook" href="https://www.facebook.com/profile.php?id=100090875011873">
                                                    <i className="fa fa-facebook" />
                                                </a>
                                            </li>
                                            <li>
                                                <a className="twitter" href="#!">
                                                    <i className="fa fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a className="instagram" href="#!">
                                                    <i className="fa fa-instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default BlogPosts;
