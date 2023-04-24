import React, { useEffect, useState, useRef } from "react";
import { authClientApi } from "../services/Api";
import "../components/Sign.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
// import background from '../assets/images/background.jpg'
import ReCAPTCHA from "react-google-recaptcha";
import {
  CButton,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModal,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle } from "@coreui/icons";
const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const captchaRef = useRef(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showalert, setShowAlert] = useState(false);
  const [formFields, setformFields] = useState(defaultFormFields);
  const [ErrorForms, setErrorForms] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    // const storedPassword = localStorage.getItem("password");
    // if (storedEmail && storedPassword) {
    if (storedEmail) {
      setformFields({ email: storedEmail });
      // setformFields({ email : storedEmail, password : storedPassword });
      setRememberMe(true);
    }
  }, []);
  function handleVerify(recaptchaToken) {
    setIsVerified(true);
  }
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
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
      }, 1500);
    }
  };
  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };
  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput?.classList.add("error");
  };
  const handleValidation = () => {
    let error = {};
    if (!formFields.email) {
      error.email = "Email is required !";
      changeBorderColorOnError("email");
    }
    if (!formFields.password) {
      error.password = "password is required !";
      changeBorderColorOnError("password");
    }
    return error;
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // pour ne pas faire refresh
    setErrorForms(handleValidation());
    const token = captchaRef.current.getValue();
    const data = {
      ...formFields,
      token: token,
    };
    const res = await authClientApi.login(data);
    if (rememberMe) {
      localStorage.setItem("email", formFields.email);
      // localStorage.setItem("password", formFields.password);
    } else {
      localStorage.removeItem("email");
      // localStorage.removeItem("password");
    }
    if (res.status === 200) {
      captchaRef.current.reset();
      navigate("/");
    }
  };
  const google = (event) => {
    event.preventDefault();
    console.log("Clicked Google");
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    // <div className="container" style={{backgroundImage : `url(${background})`}}>
    <div className="container">
      <div className=" row m-4 d-flex justify-content-center">
        <div className="col-6 align-self-center">
          <div className="login-card-light p-3 shadow-lg rounded">
            <div className="pt-3">
              <h2 className="text-danger">Sign In</h2>
            </div>

            <form className="mt-5">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Email Address"
                  name="email"
                  value={formFields.email}
                  onChange={handleInputValueChange}
                />
                <span className="error-text">{ErrorForms.email}</span>
              </div>

              <div className="form-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-sm"
                  placeholder="Password"
                  name="password"
                  value={formFields.password}
                  onChange={handleInputValueChange}
                />
                <i
                  className="fa fa-eye"
                  id="togglePassword"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={handleTogglePassword}
                ></i>
                <span className="error-text">{ErrorForms.password}</span>
              </div>

              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberCheckBox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  className="form-check-label text-dark"
                  htmlFor="rememberCheckBox"
                >
                  Remember me?
                </label>
              </div>
              <div className="form-group">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY}
                  ref={captchaRef}
                  onChange={handleVerify}
                />
              </div>
              <div className="mt-5">
                <button
                  disabled={!isVerified}
                  onClick={handleSubmit}
                  className="btn btn-sm btn-danger col"
                >
                  Login
                </button>
                <div className="social-login-buttons">
                  <button className="google-signin-button" onClick={google}>
                    Sign in with Google
                  </button>
                  <button className="facebook-signin-button">
                    Sign in with Facebook
                  </button>
                </div>
              </div>

              <div className="text-center mt-2">
                <Link onClick={() => setVisible(!visible)}>
                  Forgot Password?
                </Link>
              </div>
              <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
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
                      <div>Email Sent , Please check your Inbox</div>
                    </CAlert>
                  )}
                  Please Enter Your Email Address To Reset Your Password
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
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" onClick={handleSend}>
                    Send
                  </CButton>
                </CModalFooter>
              </CModal>
              <div className="mt-5">
                <p className="text-center" style={{ fontSize: 17 }}>
                  Don't have an account ?
                  <a href="/signup" style={{ fontSize: 17 }}>
                    {" "}
                    Click here to register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
