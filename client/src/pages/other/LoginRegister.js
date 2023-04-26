import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ReCAPTCHA from "react-google-recaptcha";
import { authClientApi } from "../../Services/authClientApi";
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

const LoginRegister = () => {
  let { pathname } = useLocation();
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const [formFields, setformFields] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [ErrorForms, setErrorForms] = useState({});
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [showalert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setformFields({ email: storedEmail });
      setRememberMe(true);
    }
  }, []);

  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };
  function handleVerify(recaptchaToken) {
    setIsVerified(true);
  }
  const handleExpired = () => {
    setIsVerified(false);
  };
  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.style.borderColor = "red";
  };
  const handleValidation = () => {
    let error = {};
    if (!formFields.email) {
      error.email = "Email is required !";
      changeBorderColorOnError("email");
    }
    if (!formFields.password) {
      error.password = "Password is required !";
      changeBorderColorOnError("password");
    } else if (formFields.password.length < 8) {
      error.password = "Password is 8 characters long !";
      changeBorderColorOnError("password");
    }
    return error;
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // pour ne pas faire refresh
    setErrorForms(handleValidation());
    if (Object.keys(handleValidation()).length === 0) {
      const token = captchaRef.current.getValue();
      const data = {
        ...formFields,
        token: token,
      };
      const res = await authClientApi.login(data);
      if (rememberMe) {
        localStorage.setItem("email", formFields.email);
      } else {
        localStorage.removeItem("email");
      }
      if (res.status === 200) {
        captchaRef.current.reset();
        navigate("/");
      } else {
        console.log(res.data);
        captchaRef.current.reset();
        setIsVerified(false);
        const loginFailedToast = (
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
              <div className="fw-bold me-auto">Login Failed !</div>
            </CToastHeader>
            <CToastBody>{res.data.msg}</CToastBody>
          </CToast>
        );
        addToast(loginFailedToast);
      }
    }
    // else{
    //   captchaRef.current.reset();
    //   setIsVerified(false);
    // }
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const handleSend = async (event) => {
    event.preventDefault();
    const data = {
      email: email,
    };
    const res = await authClientApi.forgot(data);
    if (res.status === 200) {
      setShowAlert(true);
      setTimeout(() => {
        setVisible(false);
        setShowAlert(false);
      }, 2000);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const google = (event) => {
    event.preventDefault();
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <CToaster
                          ref={toaster}
                          push={toast}
                          placement="top-center"
                        />
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <span className="error-text">
                                {ErrorForms.email}
                              </span>
                              <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formFields.email}
                                onChange={handleInputValueChange}
                              />
                              <span className="error-text">
                                {ErrorForms.password}
                              </span>
                              <input
                                id="password"
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

                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                  />
                                  <label className="ml-10">Remember me</label>
                                  <Link onClick={() => setVisible(true)}>
                                    Forgot Password?
                                  </Link>
                                  <CModal
                                    visible={visible}
                                    onClose={() => setVisible(false)}
                                  >
                                    <CModalHeader
                                      onClose={() => setVisible(false)}
                                    >
                                      <CModalTitle>Email Address</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                      {showalert && (
                                        <CAlert
                                          color="success"
                                          className="d-flex align-items-center"
                                        >
                                          <CIcon
                                            icon={cilCheckCircle}
                                            className="flex-shrink-0 me-2"
                                            width={24}
                                            height={24}
                                          />
                                          <div>
                                            Email Sent , Please check your Inbox
                                          </div>
                                        </CAlert>
                                      )}
                                      Please Enter Your Email Address To Reset
                                      Your Password
                                      <CInputGroup className="mt-3 mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput
                                          placeholder="Email"
                                          autoComplete="email"
                                          onChange={handleChange}
                                          value={email}
                                        />
                                      </CInputGroup>
                                    </CModalBody>
                                    <CModalFooter>
                                      <CButton
                                        color="secondary"
                                        onClick={() => setVisible(false)}
                                      >
                                        Close
                                      </CButton>
                                      <CButton
                                        color="primary"
                                        onClick={handleSend}
                                      >
                                        Send
                                      </CButton>
                                    </CModalFooter>
                                  </CModal>
                                  <ReCAPTCHA
                                    sitekey={process.env.REACT_APP_SITE_KEY}
                                    ref={captchaRef}
                                    onChange={handleVerify}
                                    onExpired={handleExpired}
                                  />
                                </div>
                                <button
                                  type="submit"
                                  style={{
                                    cursor: !isVerified
                                      ? "not-allowed"
                                      : "default",
                                  }}
                                  disabled={!isVerified}
                                  onClick={handleSubmit}
                                >
                                  <span>Login</span>
                                </button>
                                <button
                                  style={{
                                    backgroundColor: "#db4437",
                                  }}
                                  onClick={google}
                                >
                                  Sign in with Google
                                </button>
                              </div>
                            </form>
                            <div className="mt-5">
                              <p
                                className="text-center"
                                style={{ fontSize: 17 }}
                              >
                                Don't have an account ?
                                <a href="/register" style={{ fontSize: 17 }}>
                                  {" "}
                                  Click here to register
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Username"
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane> */}
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

export default LoginRegister;
