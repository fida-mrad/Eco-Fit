 import React, {useState} from "react";
import {authClientApi} from "../../src/services/Api";
import "../components/Sign.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";


const defaultFormFields = {
    email: "",
    password: "",
}

function SignIn() {

    const [formFields, setformFields] = useState(defaultFormFields);
    const [ErrorForms, setErrorForms] = useState({})
    const navigate = useNavigate();
    const handleInputValueChange = (event) => {
        const {name, value} = event.target;
        setformFields({...formFields, [name]: value})
    }
    const changeBorderColorOnError = (inputName) => {
        let formInput = document.getElementById(`${     inputName}`);
        formInput?.classList.add("error")
    }
    const handleValidation = () => {
        let error = {}
        if (!formFields.email) {
            error.email = "Email is required !";
            changeBorderColorOnError("email");
        }
        if (!formFields.password) {
            error.password = "password is required !";
            changeBorderColorOnError("password");
        }
        return error
    }
    const handleSubmit = async (event) => {
        event.preventDefault(); // pour ne pas faire refresh
        setErrorForms(handleValidation())
        console.log(formFields)
        const res = await authClientApi.login(formFields);
        if (res.status === 200)
            navigate("/")


    }
    return (

        <div className="container">
            <div className=" row m-4 d-flex justify-content-center">
                <div className="col-6 align-self-center">
                    <div className="login-card-light p-3 shadow-lg rounded">
                        <div className="pt-3">
                            <h2 className="text-danger">Sign In</h2>
                        </div>

                        <form className="mt-5">
                            <div className="form-group">
                                <input type="email"
                                       className="form-control form-control-sm"
                                       placeholder="Email Id" name="email" value={formFields.email}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.email}</span>
                            </div>

                            <div className="form-group">
                                <input type="password"
                                       className="form-control form-control-sm"
                                       placeholder="Password" name="password" value={formFields.password}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.password}</span>

                            </div>

                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="rememberCheckBox"/>
                                <label className="form-check-label text-dark" htmlFor="rememberCheckBox">Remember
                                    me?</label>
                            </div>

                            <div className="mt-5">
                                <button onClick={handleSubmit} className="btn btn-sm btn-danger col">
                                    Login
                                </button>
                                <div className="social-login-buttons">
                                    <button className="google-signin-button">Sign in with Google</button>
                                    <button className="facebook-signin-button">Sign in with Facebook</button>
                                </div>
                            </div>

                            <div className="text-center mt-2">
                                <a href="#">Forgot Password?</a>
                            </div>

                            <div className="mt-5">
                                <p className="text-center">
                                    Don't have an account?
                                    <a href="/signup">Click here to register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignIn;
