import React, { useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
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
  cilLockUnlocked,
  cilCheckCircle,
  cilWarning,
} from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import { authAdmin } from "../../../Services/authAdminApi";

function AdminLogin() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [showalert, setShowAlert] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleForgotPasswordEmailChange = (event) => {
    setForgotPasswordEmail(event.target.value);
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
        "Password is be at least 8 characters long!";
      return passwordValidation;
    } else {
      passwordValidation.isValid = true;
      return passwordValidation;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (validatePassword(password).isValid && isValidEmail(email)) {
    const res = await authAdmin.login(formData);
    if (res.status === 200) navigate("/admin");
    else {
      setError(true);
      setAlertMessage(res.data.msg);
      setTimeout(() => {
        setError((prev) => !prev);
      }, 2000);
    }
    // }
  };
  const [showEmailSendErrorAlert, setshowEmailSendErrorAlert] = useState(false);
  const handleSend = async (event) => {
    event.preventDefault();
    const data = {
      email: forgotPasswordEmail,
    };
    const res = await authAdmin.forgot(data);
    console.log(res);
    if (res.status === 200) {
      setShowAlert(true);
      setForgotPasswordEmail("");
      setTimeout(() => {
        setVisible(false);
        setShowAlert(false);
      }, 1500);
    } else {
      setshowEmailSendErrorAlert(true);
      setTimeout(() => {
        setshowEmailSendErrorAlert(false);
      }, 3000);
    }
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            {error && <CAlert color="danger">{alertMessage}</CAlert>}
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit} noValidate validated={validated}>
                  <h1>Sign In</h1>
                  <p className="text-medium-emphasis">Login to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
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
                  <CInputGroup className="mb-3">
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
                      required
                      feedbackInvalid={
                        validatePassword(password).validationMesssage
                      }
                      feedbackValid="Looks Good."
                      valid={validatePassword(password).isValid}
                      invalid={!validatePassword(password).isValid}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    {/* <CButton color="primary" onClick={handleSubmit}> */}
                    <CButton color="primary" type="submit">
                      Sign In
                    </CButton>
                  </div>
                  <CCol lg={12} xs={6} className="text-center">
                    <CButton
                      color="link"
                      className="px-0"
                      onClick={() => setVisible(!visible)}
                    >
                      Forgot password?
                    </CButton>
                  </CCol>
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
                      {showEmailSendErrorAlert && (
                        <CAlert
                          color="danger"
                          className="d-flex align-items-center"
                        >
                          <CIcon
                            icon={cilWarning}
                            className="flex-shrink-0 me-2"
                            width={24}
                            height={24}
                          />
                          <div>Something Went Wrong , Please Try Again !</div>
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
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default AdminLogin;
