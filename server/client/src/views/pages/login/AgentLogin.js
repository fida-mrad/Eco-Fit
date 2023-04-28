import React, { startTransition, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModal,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilLockLocked,
  cilUser,
  cilLockUnlocked,
  cilCheckCircle,
  cilWarning,
} from "@coreui/icons";
import { authAgent } from "../../../Services/Api";
import { Link, useNavigate } from "react-router-dom";

function AgentLogin() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showalert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailSendAlert, setEmailSendAlert] = useState({
    show: false,
    color: "",
    msg: "",
    icon: null,
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleForgotPasswordEmailChange = (event) => {
    setForgotPasswordEmail(event.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const validatePassword = (password) => {
    let passwordValidation = { isValid: false, validationMesssage: "" };
    if (!password) {
      passwordValidation.validationMesssage = "Password is required!";
      return passwordValidation;
    } else if (password.length < 8) {
      passwordValidation.validationMesssage =
        "Password must be at least 8 characters long!";
      return passwordValidation;
    } else if (!/[A-Z]/.test(password)) {
      passwordValidation.validationMesssage =
        "Password must contain at least one uppercase letter!";
      return passwordValidation;
    } else if (!/[a-z]/.test(password)) {
      passwordValidation.validationMesssage =
        "Password must contain at least one lowercase letter!";
      return passwordValidation;
    } else if (!/\d/.test(password)) {
      passwordValidation.validationMesssage =
        "Password must contain at least one digit!";
      return passwordValidation;
    } else {
      passwordValidation.isValid = true;
      return passwordValidation;
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    startTransition(() => {
      navigate("/agentregister");
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // setValidated(true);

    // if (validatePassword(password).isValid && isValidEmail(email)) {
    const res = await authAgent.login(formData);
    if (res.status === 200) navigate("/agent");
    else {
      setError(true);
      setAlertMessage(res.data.msg);
      setTimeout(() => {
        setError((prev) => !prev);
      }, 2000);
    }
    // }
  };
  const handleSend = async (event) => {
    event.preventDefault();
    const data = {
      email: forgotPasswordEmail,
    };
    const res = await authAgent.forgot(data);
    if (res.status === 200) {
      setEmailSendAlert({
        show: true,
        msg: "Email Sent , Please check your Inbox",
        color: "success",
        icon: cilCheckCircle,
      });
      setTimeout(() => {
        setEmailSendAlert({
          show: false,
          msg: "",
        });
        setVisible(false);
      }, 2000);
      setForgotPasswordEmail("");
    } else {
      setEmailSendAlert({
        show: true,
        msg: res.data.msg,
        color: "danger",
        icon: cilWarning,
      });
      setTimeout(() => {
        setEmailSendAlert({
          show: false,
          msg: "",
        });
      }, 2000);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            {error && <CAlert color="danger">{alertMessage}</CAlert>}
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onSubmit={handleSubmit}
                    noValidate
                    validated={validated}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={handleChange("email")}
                        value={email}
                        required
                        feedbackInvalid="Please provide a valid Email."
                        feedbackValid="Looks Good."
                        valid={isValidEmail(email)}
                        invalid={!isValidEmail(email)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon
                          icon={showPassword ? cilLockUnlocked : cilLockLocked}
                          onClick={handleTogglePassword}
                          style={{ cursor: "pointer" }}
                        />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={handleChange("password")}
                        value={password}
                        feedbackInvalid={
                          validatePassword(password).validationMesssage
                        }
                        feedbackValid="Looks Good."
                        valid={validatePassword(password).isValid}
                        invalid={!validatePassword(password).isValid}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() => setVisible(!visible)}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                      <CModal
                        visible={visible}
                        onClose={() => setVisible(false)}
                      >
                        <CModalHeader onClose={() => setVisible(false)}>
                          <CModalTitle>Email Address</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          {emailSendAlert.show && (
                            <CAlert
                              color={emailSendAlert.color}
                              className="d-flex align-items-center"
                            >
                              <CIcon
                                icon={emailSendAlert.icon}
                                className="flex-shrink-0 me-2"
                                width={24}
                                height={24}
                              />
                              <div>{emailSendAlert.msg}</div>
                            </CAlert>
                          )}
                          Please Enter Your Email Address To Reset Your Password
                          <CInputGroup className="mt-3 mb-3">
                            <CInputGroupText>@</CInputGroupText>
                            <CFormInput
                              placeholder="Email"
                              autoComplete="email"
                              onChange={handleForgotPasswordEmailChange}
                              value={forgotPasswordEmail}
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
                            disabled={
                              !isValidEmail(forgotPasswordEmail) ||
                              forgotPasswordEmail === ""
                            }
                            onClick={handleSend}
                          >
                            Send
                          </CButton>
                        </CModalFooter>
                      </CModal>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p style={{ color: "white" }}>
                      Register now if you don't have an account so you can join
                      the Eco-Fit Brands List !
                    </p>
                    {/* <Link to="/agentregister"> */}
                    <CButton
                      color="primary"
                      className="mt-3"
                      active
                      tabIndex={-1}
                      onClick={goToRegister}
                    >
                      Register Now!
                    </CButton>
                    {/* </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default AgentLogin;
