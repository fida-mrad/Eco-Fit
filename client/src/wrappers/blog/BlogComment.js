import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {blogsController} from "../../Services/blogsApi";

const BlogComment = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState('');


    const fetchBlog = async () => {
        try {
            const response = await blogsController.getBlogById(id);
            console.log(response.data);
            setBlog(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            const response = await blogsController.deleteComment(id, commentId);
            console.log(response);
            fetchBlog();
        } catch (error) {
            console.error(error);
            alert('Failed to delete Comment. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let data = {
                text: text
            }
            const response = await blogsController.addComment(id,data);
            console.log(response);
            setText('');
            fetchBlog();
        } catch (error) {
            console.error(error);
            alert('Failed to add Comment. Please try again.');
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [id]);


    return (<Fragment>
            <div className="blog-comment-wrapper mt-55">
                <h4 className="blog-dec-title">comments : {blog?.comments?.length}</h4>
                {blog.comments?.map((c, index) => {
                    let formattedDate = new Date(c.createdAt).toLocaleDateString();

                    return (<>
                            {index % 2 === 0 ? <div className="single-comment-wrapper mt-35">
                                <div className="blog-comment-img">
                                    <img
                                        src={process.env.PUBLIC_URL + "/assets/img/blog/60111.jpg"}
                                        alt=""
                                    />
                                </div>
                                <div className="blog-comment-content">
                                    <h4>{c.author}</h4>
                                    <span>{formattedDate}</span>
                                    <p>
                                        {c.text}
                                    </p>
                                    <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
                                </div>
                            </div> : <div className="single-comment-wrapper mt-50 ml-120">
                                <div className="blog-comment-img">
                                    <img
                                        src={process.env.PUBLIC_URL + "/assets/img/blog/60111.jpg"}
                                        alt=""
                                    />
                                </div>
                                <div className="blog-comment-content">
                                    <h4>{c.author}</h4>
                                    <span>{formattedDate}</span>
                                    <p>{c.text}
                                    </p>

                                    <button className="btn btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
                                </div>

                            </div>}


                        </>)
                })}
            </div>
            <div className="blog-reply-wrapper mt-50">
                <h4 className="blog-dec-title">post a comment</h4>
                <form className="blog-form" onSubmit={handleSubmit}>
                    <div className="row">
                        {/*<div className="col-md-12">*/}
                        {/*    <div className="leave-form">*/}
                        {/*        <input type="text" placeholder="Full Name"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-md-12">
                            <div className="text-leave">
                                <textarea placeholder="Message"  type="text" id="text" value={text} onChange={(event) => setText(event.target.value)} required/>
                                <input type="submit" name="text" defaultValue="SEND MESSAGE"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>);
};

export default BlogComment;
