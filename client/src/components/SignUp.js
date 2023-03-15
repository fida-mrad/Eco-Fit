import React, {useState} from "react";
import {authClientApi} from "../../src/services/Api";
import "../components/Sign.css";


const defaultFormFields = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
    profileimg: ""
}

function SignUp() {


    const [formFields, setformFields] = useState(defaultFormFields);
    const [ErrorForms, setErrorForms] = useState({})
    const handleInputValueChange = (event) => {
        const {name, value} = event.target;
        setformFields({...formFields, [name]: value})
    }
    const changeBorderColorOnError = (inputName) => {
        let formInput = document.getElementById(`${inputName}`);
        formInput?.classList.add("error")
    }
    const handleValidations = () => {
        let error = {}

        if (!formFields.firstname) {
            error.firstname = "Firstname is required !";
            changeBorderColorOnError("firstname");
        }
        if (!formFields.lastname) {
            error.lastname = "Lastname is required !";
            changeBorderColorOnError("lastname");
        }
        if (!formFields.username) {
            error.username = "Username is required !";
            changeBorderColorOnError("username");
        }
        if (!formFields.email) {
            error.email = "Email is required!";
            changeBorderColorOnError("email");
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formFields.email)) {
            error.email = "Invalid email address!";
            changeBorderColorOnError("email");
        }
        if (!formFields.password) {
            error.password = "Password is required!";
            changeBorderColorOnError("password");
        } else if (formFields.password.length < 7) {
            error.password = "Password must be at least 7 characters long!";
            changeBorderColorOnError("password");
        } else if (!/[A-Z]/.test(formFields.password)) {
            error.password = "Password must contain at least one uppercase letter!";
            changeBorderColorOnError("password");
        } else if (!/[a-z]/.test(formFields.password)) {
            error.password = "Password must contain at least one lowercase letter!";
            changeBorderColorOnError("password");
        } else if (!/\d/.test(formFields.password)) {
            error.password = "Password must contain at least one digit!";
            changeBorderColorOnError("password");
        }

        if (!formFields.phone) {
            error.phone = "Phone number is required!";
            changeBorderColorOnError("phone");
        } else if (formFields.phone.length !== 8) {
            error.phone = "Phone number must be exactly 8 digits long!";
            changeBorderColorOnError("phone");
        }
        if (!formFields.birthdate) {
            error.birthdate = "Birthdate is required!";
            changeBorderColorOnError("birthdate");
        } else {
            const birthdate = new Date(formFields.birthdate);
            const age = calculateAge(birthdate);
            if (age < 16) {
                error.birthdate = "You must be at least 16 years old to register!";
                changeBorderColorOnError("birthdate");
            }
        }

        function calculateAge(birthday) {
            const ageDifferenceMs = Date.now() - birthday.getTime();
            const ageDate = new Date(ageDifferenceMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        return error
    }

    const handleSubmit = async (event) => {
        // let error = {}
        event.preventDefault(); // pour ne pas faire refresh // console.log(formFields);
        setErrorForms(handleValidations())
        if (Object.keys(ErrorForms).length > 0) {
            return;
        }
        console.log(formFields)
        const res = await authClientApi.Register(formFields);
        if (res.status === 200) ;
        console.log("c bon")
        // if (res.status === 400);
        // error.email = "email address exist !";
        // changeBorderColorOnError("email");




    }

    return (
        <div className="container">
            <div className=" row m-4 d-flex justify-content-center">
                <div className=" col-6 align-self-center">
                    <div className="login-card-light p-3 shadow-lg rounded">
                        <div className="pt-3">
                            <h2 className="text-danger">Register</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6">

                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-sm"
                                       placeholder="firstname" name="firstname" value={formFields.firstname}
                                       onChange={handleInputValueChange}
                                />
                                <span className="error-text">{ErrorForms.firstname}</span>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-sm"
                                       placeholder="lastname" name="lastname" value={formFields.lastname}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.lastname}</span>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-sm"
                                       placeholder="username" name="username" value={formFields.username}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.username}</span>
                            </div>
                            <div className="form-group">
                                <input type="email"
                                       className="form-control form-control-sm"
                                       placeholder="email" name="email" value={formFields.email}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.email}</span>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control form-control-sm"
                                       placeholder="password" name="password" value={formFields.password}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.password}</span>
                            </div>
                            <div className="form-group">
                                <input type="number"
                                       className="form-control form-control-sm"
                                       placeholder="phone" name="phone" value={formFields.phone}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.phone}</span>
                            </div>
                            <div className="form-group">
                                <input type="date"
                                       className="form-control form-control-sm"
                                        name="birthdate" value={formFields.birthdate}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.birthdate}</span>
                            </div>
                            <div className="form-group">
                                <input type="file"
                                       className="form-control form-control-sm"
                                       name="profileimg" value={formFields.profileimg}
                                       onChange={handleInputValueChange}/>
                            </div>

                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="rememberCheckBox"/>
                                <label className="form-check-label text-dark" htmlFor="rememberCheckBox">Remember
                                    me?</label>
                            </div>

                            <div className="mt-5 form-group">
                                <button className="btn btn-sm btn-danger col">
                                    Register
                                </button>
                            </div>

                            <div className="text-center mt-2">
                                <a href="#">Forgot Password?</a>
                            </div>

                            <div className="mt-5">
                                <p className="text-center">
                                    Don't have an account?
                                    <a href="/signin">Already have an account ?</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUp;
