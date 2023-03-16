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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked,cilUser } from "@coreui/icons";
import { authAgent } from "../../../Services/Api";
import { Link, useNavigate } from "react-router-dom";

function AgentLogin() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const goToRegister=(e)=>{
    e.preventDefault();
    startTransition(() => {
    navigate('/agentregister')
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    const res = await authAgent.login(formData);
    console.log(res.data.msg);
    if (res.status === 200) navigate("/agent");
    else {
      setError(true);
      setAlertMessage(res.data.msg);
      setTimeout(() => {
        setError((prev) => !prev);
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
          <CForm onSubmit={handleSubmit} noValidate validated={validated} >
              <h1>Login</h1>
              <p className="text-medium-emphasis">Sign In to your account</p>
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
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleChange("password")}
                      value={password}
                      feedbackInvalid="Please enter your Password"
                      feedbackValid="Looks Good."
                      valid={password.length>=1}
                      invalid={password.length<1}
                    />
              </CInputGroup>
              <CRow>
                <CCol xs={6}>
                  <CButton color="primary" className="px-4" type="submit">
                    Login
                  </CButton>
                </CCol>
                <CCol xs={6} className="text-right">
                  <CButton color="link" className="px-0">
                    Forgot password?
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
          <CCardBody className="text-center">
            <div>
              <h2>Sign up</h2>
              <p style={{color:"white"}}>
                Register now if you don't have an account so you can join the Eco-Fit Brands List !
              </p>
              {/* <Link to="/agentregister"> */}
                <CButton color="primary" className="mt-3" active tabIndex={-1} onClick={goToRegister}>
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
