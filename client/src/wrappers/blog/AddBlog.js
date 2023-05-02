import {Fragment, useState} from "react";
import {useLocation} from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { blogsController } from "../../Services/blogsApi";
import axios from "axios";


const Blog = () => {
    let {pathname} = useLocation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [body, setBody] = useState('');
    const [images, setImages] = useState([]);

    const handleFileInput =  async (e) => {
        const files = e.target.files;
        const data =  new FormData;

        for (let i=0  ; i< files.length ; i++){
            data.append("photos" , files[i])
        }
        const response = await axios.post(`http://localhost:8000/blogs/uploadByFile`, data , {
            headers : {
                "Content-Type" : "multipart/form-data"
            },
        });

        const {data : filenames} = response;
        setImages((prevValue)=> [... prevValue , ... filenames] )
        e.target.value="";

    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let data = {
                title,
                description,
                description2,
                description3,
                body,
                images : images
            }
           await axios.post(`http://localhost:8000/blogs/addBlog`, data).then(
               ()=>{
                   window.location.href = "/blog-new";
               }
           )
            alert('Blog added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add blog. Please try again.');
        }
    };

    return (
        <Fragment>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        {label: "Home", path: process.env.PUBLIC_URL + "/"},
                        {label: "Add new blog", path: process.env.PUBLIC_URL + pathname}
                    ]}
                />

                <div>
                    <div className="container">
                        <div className="custom-row-2">
                            <div className="col-12 col-lg-4 col-md-5">
                                <div className="contact-info-wrap">
                                    <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-phone"/>
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>+012 345 678 102</p>
                                            <p>+012 345 678 102</p>
                                        </div>
                                    </div>
                                    <div className="single-contact-info">
                                        <div className="contact-icon">
                                            <i className="fa fa-globe"/>
                                        </div>
                                        <div className="contact-info-dec">
                                            <p>
                                                <a href="#!">
                                                    yourname@email.com
                                                </a>
                                            </p>
                                            <p>
                                                <a href="#!">
                                                    yourwebsitename.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="single-contact-info">

                                        <div className="contact-info-dec">
                                            <p>Address goes here, </p>
                                            <p>street, Crossroad 123.</p>
                                        </div>
                                    </div>
                                    <div className="contact-social text-center">
                                        <h3>Follow Us</h3>
                                        <ul>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-facebook"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-pinterest-p"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-tumblr"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-vimeo"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-twitter"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-8 col-md-7">
                                <div className="contact-form">
                                    <div className="contact-title mb-30">
                                        <h2>Add a new blog here ...</h2>
                                    </div>
                                    <form onSubmit={handleSubmit} className="contact-form-style" enctype="multipart/form-data">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <input placeholder="Titre" type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} required />                                            </div>
                                            <div className="col-lg-12">
                                                <input placeholder="Premiere description" type="text" id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
                                            </div>
                                            <div className="col-lg-12">
                                                <input placeholder="Deuxieme description" type="text" id="description2" value={description2} onChange={(event) => setDescription2(event.target.value)} required />
                                            </div>
                                            <div className="col-lg-12">
                                                <input placeholder="troisième description" type="text" id="description3" value={description3} onChange={(event) => setDescription3(event.target.value)} required />
                                            </div>
                                            <div className="col-lg-12">
                                                <textarea placeholder="Body" id="body" value={body} onChange={(event) => setBody(event.target.value)} required />
                                                <hr/>
                                                <div className="col-lg-12">
                                                    <input type="file"  onChange={handleFileInput} multiple />
                                                </div>
                                                <div style={{
                                                    display : "flex",
                                                    alignItems: "center",
                                                    gap : "8px"
                                                }}>

                                                {
                                                    images.map((image, k) => (
                                                        <div key={k} >
                                                            <img src={"http://localhost:8000/uploads/" + image}
                                                             style={{
                                                                 width : "100px",
                                                                 borderRadius : "1rem"
                                                             }}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                                <button className="submit" type="submit">
                                                    SEND
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="form-message"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default Blog;
