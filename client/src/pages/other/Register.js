import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./phone-input.css"; // import your custom CSS file
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { authClientApi } from "../../services/authClientApi";
import {
  CAlert,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CFormInput,
  CModalFooter,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle } from "@coreui/icons";
import PhoneInput from "react-phone-number-input";

const Register = () => {
  let { pathname } = useLocation();
  let { token } = useParams();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ErrorForms, setErrorForms] = useState({});
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [formFields, setformFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
  });
  const [phoneNumber, setphoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };
  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput?.classList.add("error");
    // formInput.style.borderColor = "red";
  };
  const handleValidations = () => {
    let error = {};
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
    } else if (formFields.password.length < 8) {
      error.password = "Password must be at least 8 characters long!";
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

    if (!phoneNumber) {
      error.phone = "Phone number is required!";
      changeBorderColorOnError("phone");
    } else if (phoneNumber.length < 8) {
      error.phone = "Phone number must be at least 8 digits long!";
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
    return error;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorForms(handleValidations());
    if (Object.keys(handleValidations()).length === 0) {
      const data = {
        ...formFields,
        phone: phoneNumber,
      };
      const res = await authClientApi.Register(data);
      if (res.status === 201) {
        navigate("/login");
      } else {
        console.log(res.data.msg);
        addToast(errorToast(res.data.msg));
      }
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const errorToast = (message) => {
    return (
      <CToast>
        <CToastHeader closeButton>
          <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect width="100%" height="100%" fill="#ff3333"></rect>
          </svg>
          <div className="fw-bold me-auto">Register Failed !</div>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    );
  };
  return (
    <Fragment>
      <SEO titleTemplate="Register" description="EcoFit Register Page." />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Register",
              //   path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <CToaster
                          ref={toaster}
                          push={toast}
                          placement="top-center"
                        />
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit} noValidate>
                              <span className="error-text">
                                {ErrorForms.firstname}
                              </span>
                              <input
                                // id="firstname"
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formFields.firstname}
                                onChange={handleInputValueChange}
                              />
                              <span className="error-text">
                                {ErrorForms.lastname}
                              </span>
                              <input
                                // id="lastname"
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formFields.lastname}
                                onChange={handleInputValueChange}
                              />
                              <span className="error-text">
                                {ErrorForms.email}
                              </span>
                              <input
                                // id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={formFields.email}
                                onChange={handleInputValueChange}
                              />
                              <span className="error-text">
                                {ErrorForms.username}
                              </span>
                              <input
                                // id="username"
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formFields.username}
                                onChange={handleInputValueChange}
                              />
                              <span className="error-text">
                                {ErrorForms.password}
                              </span>
                              <input
                                //   id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formFields.password}
                                onChange={handleInputValueChange}
                              />
                                <i
                                  className="fa fa-eye"
                                  id="togglePassword"
                                  style={{
                                    position: "absolute",
                                    transform: "translate3d(-25px, 14px, 10px)",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleTogglePassword}
                                ></i>
                              <span className="error-text">
                                {ErrorForms.birthdate}
                              </span>
                              <input
                                // id="birthdate"
                                type="date"
                                name="birthdate"
                                value={formFields.birthdate}
                                onChange={handleInputValueChange}
                              />
                              <span className="error-text">
                                {ErrorForms.phone}
                              </span>
                              <div className="form-group">
                                {/* <div className="my-phone-input-wrapper"> */}
                                <PhoneInput
                                  //   className="form-control form-control-sm"
                                  placeholder="Enter phone number"
                                  name="phone"
                                  value={phoneNumber}
                                  onChange={setphoneNumber}
                                />
                              </div>
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                            <div className="mt-5">
                              <p
                                className="text-center"
                                style={{ fontSize: 16 }}
                              >
                                Already have an account ?
                                <a
                                  href="/login"
                                  style={{ fontSize: 16 }}
                                >
                                  {" "}
                                  Click here to Login
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Register;
