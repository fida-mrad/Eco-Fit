import React, {useState, useEffect, Fragment} from "react";
import {Link, useParams} from "react-router-dom";
import { blogsController } from "../../Services/blogsApi";

const SingleBlog = () => {
    const [blog, setBlog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await blogsController.getBlogById(id);
                setBlog(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlog();
    }, [id]);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : blog && blog.title ? (
        <Fragment>
            <div className="blog-details-top">
                <div className="blog-details-img">
                    <img
                        alt=""
                        src={ "http://localhost:8000/uploads/" + blog.images[0]}
                    />
                </div>
                <div className="blog-details-content">

                    <div className="blog-meta-2">
                        <ul>
                            <li>22 April, 2018</li>
                            <li>
                                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                                    4 <i className="fa fa-comments-o" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>
                        {blog.description}
                    </p>
                    <blockquote>
                        {blog.description2}


                    </blockquote>
                    <p>
                        {blog.description3}
                    </p>
                </div>
            </div>
            <div className="dec-img-wrapper">
                <div className="row">
                    <div style={{
                        display : "flex",
                        alignItems : "center",
                        gap : "6px"

                    }}>
                        {
                            blog.images.map(
                                (image, key) => (
                                    <div key={key}  className="dec-img mb-50 ">
                                        {
                                            key > 0 && (
                                                <img
                                                    alt=""
                                                    src={ "http://localhost:8000/uploads/" + image}
                                                    style={{
                                                        width : "466px",
                                                        height : "353px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            )
                                        }

                                </div>)
                            )
                        }

                    </div>
                </div>
                <p>
                    {blog.body}
                </p>
            </div>
            <div className="tag-share">
                <div className="dec-tag">
                    <ul>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                lifestyle ,
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                interior ,
                            </Link>
                        </li>
                        <li>
                            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                                outdoor
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="blog-share">
                    <span>share :</span>
                    <div className="share-social">
                        <ul>
                            <li>
                                <a className="facebook" href="#!">
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
            <div className="next-previous-post">
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    {" "}
                    <i className="fa fa-angle-left" /> prev post
                </Link>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                    next post <i className="fa fa-angle-right" />
                </Link>
            </div>
        </Fragment>
            ) : (
                <p>No blog found.</p>
            )}
        </div>
    );
};

export default SingleBlog;
