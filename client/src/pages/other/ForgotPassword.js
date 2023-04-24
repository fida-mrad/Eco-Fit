import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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

const ForgotPassword = () => {
  let { pathname } = useLocation();
  let { token } = useParams();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ErrorForms, setErrorForms] = useState({});
  const [toast, addToast] = useState(0);
  const toaster = useRef();

  const handleChange = (event) => {
    setPass(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.style.borderColor = "red";
  };
  const handleValidation = () => {
    let error = {};
    if (!pass) {
      error.password = "Please Enter a New Password!";
      changeBorderColorOnError("password");
    } else if (pass.length < 8) {
      error.password = "Password must be at least 8 characters long!";
      changeBorderColorOnError("password");
    } else if (!/[A-Z]/.test(pass)) {
      error.password = "Password must contain at least one uppercase letter!";
      changeBorderColorOnError("password");
    } else if (!/[a-z]/.test(pass)) {
      error.password = "Password must contain at least one lowercase letter!";
      changeBorderColorOnError("password");
    } else if (!/\d/.test(pass)) {
      error.password = "Password must contain at least one digit!";
      changeBorderColorOnError("password");
    }
    if (!confirmPassword) {
      error.confirmPassword = "Please Confirm Your New Password!";
      changeBorderColorOnError("confirmPassword");
    } else if (confirmPassword !== pass) {
      error.confirmPassword = "Please Check Your Password";
      changeBorderColorOnError("confirmPassword");
    }
    return error;
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
          <div className="fw-bold me-auto">Reset Password Failed !</div>
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    );
  };
  const sendPassword = async (event) => {
    event.preventDefault();
    setErrorForms(handleValidation());
    if (Object.keys(handleValidation()).length === 0) {
      const data = {
        token: token,
        password: pass,
      };
      const res = await authClientApi.reset(data);
      if (res.status === 200) {
        navigate("/login");
      } else {
        console.log(res.data.msg)
        addToast(errorToast(res.data.msg));
      }
    }
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Reset Password"
        description="EcoFit Reset Password Page."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Reset Password",
              //   path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="reset">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="reset">
                          <h4>Reset Password</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="reset">
                      <CToaster
                          ref={toaster}
                          push={toast}
                          placement="top-center"
                        />
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <span className="error-text">
                                {ErrorForms.password}
                              </span>
                              <input
                                id="password"
                                type="text"
                                placeholder="New Password"
                                name="password"
                                value={pass}
                                onChange={handleChange}
                              />
                              <span className="error-text">
                                {ErrorForms.confirmPassword}
                              </span>
                              <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm New Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                              />

                              <div className="button-box">
                                <button
                                  onClick={sendPassword}
                                  disabled={pass !== confirmPassword}
                                  style={{
                                    cursor:
                                      pass === "" ||
                                      confirmPassword === "" ||
                                      pass !== confirmPassword
                                        ? "not-allowed"
                                        : "default",
                                  }}
                                >
                                  <span>Change Password</span>
                                </button>
                              </div>
                            </form>
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

export default ForgotPassword;
