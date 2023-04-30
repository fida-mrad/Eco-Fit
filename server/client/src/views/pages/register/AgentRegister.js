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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilImage } from "@coreui/icons";
import { authAgent } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";

const AgentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    brandname: "",
    profileimg: null,
  });
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { firstname, lastname, email, password, brandname, profileimg } =
    formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleFileInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
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
  const formIsValid = () => {
    return (
      isValidEmail(email) &&
      validatePassword(password).isValid &&
      firstname !== "" &&
      lastname !== "" &&
      brandname !== "" &&
      profileimg !== null &&
      confirmPassword === password
    );
  };
  const handleSubmit = async () => {
    const result = formIsValid();
    if (result) {
      const data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        brand: {
          brandname: brandname,
        },
        profileimg: profileimg,
      };
      const res = await authAgent.register(data);
      console.log(data);
      if (res.status === 201) {
        navigate("/agentlogin");
      } else {
        setError(true);
        setAlertMessage(res.data.msg);
        setTimeout(() => {
          setError((prev) => !prev);
        }, 2000);
      }
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
                <CForm encType="multipart/form-data">
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Firstname"
                      autoComplete="firsname"
                      onChange={handleChange("firstname")}
                      value={firstname}
                      invalid={firstname === ""}
                      feedbackInvalid="First Name Is Required"
                      valid={firstname !== ""}
                      feedbackValid="Looks Good"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Lastname"
                      autoComplete="lastname"
                      onChange={handleChange("lastname")}
                      value={lastname}
                      invalid={lastname === ""}
                      feedbackInvalid="Last Name Is Required"
                      valid={lastname !== ""}
                      feedbackValid="Looks Good"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      id="email"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleChange("email")}
                      value={email}
                      feedbackInvalid="Please provide a valid Email."
                      feedbackValid="Looks Good."
                      valid={isValidEmail(email)}
                      invalid={!isValidEmail(email)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
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
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="confirmPassword"
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                      invalid={
                        password !== confirmPassword || confirmPassword === ""
                      }
                      feedbackInvalid="Please Verify Your Password"
                      valid={
                        password === confirmPassword && confirmPassword !== ""
                      }
                      feedbackValid="Looks Good"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Brandname"
                      autoComplete="brandname"
                      onChange={handleChange("brandname")}
                      value={brandname}
                      invalid={brandname === ""}
                      feedbackInvalid="Your Brand's Name Is Required"
                      valid={brandname !== ""}
                      feedbackValid="Looks Good"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilImage} />
                      </CInputGroupText>
                      {/* <CFormInput
                        placeholder="ProfileImage"
                        autoComplete="profileimg"
                        onChange={handleChange("profileimg")}
                        value={profileimg}
                      /> */}
                      <CFormInput
                        type="file"
                        id="formFile"
                        name="profileimg"
                        onChange={handleFileInput}
                        invalid={profileimg === null}
                        feedbackInvalid="Please Select Your Profile Image"
                        valid={profileimg !== null}
                        feedbackValid="Done!"
                      />
                    </CInputGroup>
                    <CButton
                      color="success"
                      disabled={password !== confirmPassword}
                      onClick={handleSubmit}
                    >
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AgentRegister;
