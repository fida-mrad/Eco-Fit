import {
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CButton,
  CAlert,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import React, { useEffect, useRef, useState } from "react";
import avatar from "../assets/images/avatars/user.jpg";
import { useAgent } from "../AgentContext";
import { useNavigate } from "react-router-dom";
import { agentController } from "../Services/adminApi";
import { authAgent } from "../Services/authAgentApi";
// import avatar from "../assets/images/avatars/2.jpg";
import {
  cilCheckCircle,
  cilWarning,
  cilLockLocked,
  cilLockUnlocked,
} from "@coreui/icons";
function MyProfileAgent() {
  const { agent } = useAgent();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(1);
  const [profileImage, setprofileImage] = useState({
    old: "",
    new: avatar,
    file: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [passwordChangeFields, setPasswordChangeFields] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [DangerAlert, setDangerAlert] = useState({
    show: false,
    msg: "",
  });
  const [updateAgentAlert, setUpdateAgentAlert] = useState({
    show: false,
    color: "",
    msg: "",
    icon: null,
  });
  useEffect(() => {
    console.log(agent);
    if (agent != null && agent.status >= 400) {
      navigate("/agentlogin");
    } else {
      const fetchImage = async () => {
        const response = await fetch(
          `http://localhost:8000/images/${agent?.data?.profileimg}`
        );
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setprofileImage((prevState) => ({
          new: url,
          old: url,
        }));
      };
      fetchImage();
      setformFields((prevState) => ({
        ...prevState,
        firstname: agent?.data.firstname,
        lastname: agent?.data.lastname,
        email: agent?.data.email,
        brandname: agent?.data.brand.brandname,
      }));
    }
  }, [agent]);
  const [formFields, setformFields] = useState({
    firstname: "",
    lastname: "",
    email: "",
    brandname: "",
  });
  const handleChange = (text) => (e) => {
    setformFields({ ...formFields, [text]: e.target.value });
  };
  const handlePasswordChangeFiels = (text) => (e) => {
    setPasswordChangeFields({
      ...passwordChangeFields,
      [text]: e.target.value,
    });
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };
  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword((prevShowPassword) => !prevShowPassword);
  };
  const updateAgent = async (event) => {
    event.preventDefault();
    const result = formIsValid();
    if (result) {
      let data = {
        // agentId: agent.data._id,
        firstname: formFields.firstname,
        lastname: formFields.lastname,
        email: formFields.email,
        brand: {
          brandname: formFields.brandname,
        },
        // profileimg: profileImage.file,
      };
      if (profileImage.file) {
        data = { ...data, profileimg: profileImage.file };
      }

      console.log(data);
      const res = await agentController.updateAgent(data);
      console.log(res);
      if (res.status === 201) {
        console.log("Agent Updated");
        // navigate("/agent");
        setUpdateAgentAlert({
          show: true,
          msg: "Password Updated Successfully",
          color: "success",
          icon: cilCheckCircle,
        });
        setTimeout(() => {
          navigate("/agent");
        }, 3000);
      } else {
        setUpdateAgentAlert({
          show: true,
          msg: res.data.msg,
          color: "danger",
          icon: cilWarning,
        });
        setTimeout(() => {
          setUpdateAgentAlert({
            show: false,
            msg: "",
            color: "danger",
            icon: cilWarning,
          });
        }, 3000);
      }
    }
  };
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const reader = new FileReader();
    const { files } = event.target;
    if (files && files.length !== 0) {
      reader.onload = () => {
        setprofileImage((prevState) => ({
          ...prevState,
          new: reader.result,
          file: files[0],
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const resetProfileImage = () => {
    setprofileImage((prev) => ({
      ...prev,
      new: prev.old,
      file: null,
    }));
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const formIsValid = () => {
    return (
      isValidEmail(formFields.email) &&
      formFields.firstname !== "" &&
      formFields.lastname !== "" &&
      formFields.brandname !== "" &&
      formFields.email !== ""
    );
  };
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
  const changePassword = async () => {
    const res = await authAgent.changePassword(passwordChangeFields);
    if (res.status === 201) {
      console.log("Password Changed");
      setPasswordChangeFields({
        currentPassword: "",
        newPassword: "",
      });
      setConfirmPassword("");
      setshowSuccessAlert(true);
      setTimeout(() => {
        setshowSuccessAlert((prev) => !prev);
        navigate("/agent");
      }, 1500);
    } else {
      console.log(res.data.msg);
      setDangerAlert({
        show: true,
        msg: res.data.msg,
      });
      setTimeout(() => {
        setDangerAlert((prevState) => ({
          ...prevState,
          show: !prevState.show,
        }));
      }, 3000);
    }
  };
  return (
    // <>
    // <CNav variant="underline">
    //   <CNavItem>
    //     <CNavLink href="#" active>
    //       Account
    //     </CNavLink>
    //   </CNavItem>
    //   <CNavItem>
    //     <CNavLink href="#">Security</CNavLink>
    //   </CNavItem>
    //   <CNavItem>
    //     <CNavLink href="/agent/dashboard">Dashboard</CNavLink>
    //   </CNavItem>
    //   <CNavItem>
    //     <CNavLink href="#" disabled>
    //       Disabled
    //     </CNavLink>
    //   </CNavItem>
    // </CNav>
    // </>
    <>
      <CNav variant="tabs" role="tablist">
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === 1}
            onClick={() => setActiveKey(1)}
          >
            Profile
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#!"
            active={activeKey === 2}
            onClick={() => setActiveKey(2)}
          >
            Security
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent style={{ marginTop: "10px" }}>
        <CTabPane
          role="tabpanel"
          aria-labelledby="profile-tab"
          visible={activeKey === 1}
        >
          {updateAgentAlert.show && (
            <CAlert
              color={updateAgentAlert.color}
              className="d-flex align-items-center"
            >
              <CIcon
                icon={updateAgentAlert.icon}
                className="flex-shrink-0 me-2"
                width={24}
                height={24}
              />
              <div>{updateAgentAlert.msg}</div>
            </CAlert>
          )}
          <img
            // src={agentAvatar}
            src={profileImage.new}
            alt="Agent Profile"
            style={{
              width: "120px",
              height: "120px",
              marginRight: " 1.5625rem",
              borderRadius: "6px",
            }}
          />
          {/* <div> */}
          <CButton onClick={handleClick}>Upload New Image</CButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {/* </div> */}
          <CButton
            onClick={resetProfileImage}
            className="btn-danger"
            style={{ marginLeft: "5px" }}
          >
            Reset
          </CButton>
          <CForm
            encType="multipart/form-data"
            onSubmit={updateAgent}
            style={{ marginTop: "15px" }}
            noValidate
          >
            <CRow className="g-3">
              <CCol xs>
                <CFormInput
                  placeholder="First Name"
                  aria-label="First name"
                  label="First Name :"
                  onChange={handleChange("firstname")}
                  value={formFields.firstname || ""}
                  invalid={formFields.firstname === ""}
                  valid={formFields.firstname !== ""}
                />
              </CCol>
              <CCol xs>
                <CFormInput
                  placeholder="Last Name"
                  aria-label="Last name"
                  type="text"
                  label="Last Name :"
                  name="lastname"
                  onChange={handleChange("lastname")}
                  value={formFields.lastname || ""}
                  invalid={formFields.lastname === ""}
                  valid={formFields.lastname !== ""}
                />
              </CCol>
            </CRow>
            <CRow className="mt-1 g-3">
              <CCol xs>
                <CFormInput
                  placeholder="Email"
                  aria-label="Email"
                  label="Email :"
                  name="email"
                  type="email"
                  onChange={handleChange("email")}
                  value={formFields.email || ""}
                  invalid={!isValidEmail(formFields.email)}
                  valid={isValidEmail(formFields.email)}
                />
              </CCol>
              <CCol xs>
                <CFormInput
                  placeholder="Brand Name"
                  aria-label="Ref22222"
                  label="Brand Name :"
                  name="brandname"
                  onChange={handleChange("brandname")}
                  value={formFields.brandname || ""}
                  invalid={formFields.brandname === ""}
                  valid={formFields.brandname !== ""}
                />
              </CCol>
            </CRow>
            <CButton type="submit" className="mt-3 mb-3">
              Save Changes
            </CButton>
          </CForm>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="security-tab"
          visible={activeKey === 2}
        >
          {showSuccessAlert && (
            <CAlert color="success" className="d-flex align-items-center">
              <CIcon
                icon={cilCheckCircle}
                className="flex-shrink-0 me-2"
                width={24}
                height={24}
              />
              <div>Password Changed Successfully !</div>
            </CAlert>
          )}
          {DangerAlert.show && (
            <CAlert color="danger" className="d-flex align-items-center">
              <CIcon
                icon={cilWarning}
                className="flex-shrink-0 me-2"
                width={24}
                height={24}
              />
              <div>{DangerAlert.msg}</div>
            </CAlert>
          )}
          <CForm className="row g-3">
            <CCol md={10}>
              <CFormLabel>Current Password :</CFormLabel>
              <CInputGroup
                className="mb-3"
                onClick={handleToggleCurrentPassword}
              >
                <CInputGroupText>
                  <CIcon
                    icon={showCurrentPassword ? cilLockUnlocked : cilLockLocked}
                    style={{ cursor: "pointer" }}
                  />
                </CInputGroupText>
                <CFormInput
                  type={showCurrentPassword ? "text" : "password"}
                  onChange={handlePasswordChangeFiels("currentPassword")}
                  value={passwordChangeFields.currentPassword || ""}
                  id="crrentPassword"
                  placeholder="Current Password"
                  size="lg"
                  feedbackInvalid="Please Enter Your Current Password !"
                  feedbackValid="Looks Good."
                  valid={
                    passwordChangeFields.currentPassword !== "" &&
                    passwordChangeFields.currentPassword.length >= 8
                  }
                  invalid={
                    passwordChangeFields.currentPassword === "" ||
                    passwordChangeFields.currentPassword.length < 8
                  }
                />
                {/* <i
                className="fa fa-eye"
                id="togglePassword"
                style={{
                  position: "absolute",
                  transform: "translate3d(985px, -30px, 10px)",
                  cursor: "pointer",
                }}
                onClick={handleToggleCurrentPassword}
              ></i> */}
              </CInputGroup>
            </CCol>
            <CCol md={5}>
              <CFormLabel>New Password :</CFormLabel>
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
                  onChange={handlePasswordChangeFiels("newPassword")}
                  value={passwordChangeFields.newPassword || ""}
                  id="newPassword"
                  // label="New Password :"
                  placeholder="New Password"
                  size="lg"
                  feedbackInvalid={
                    validatePassword(passwordChangeFields.newPassword)
                      .validationMesssage
                  }
                  feedbackValid="Looks Good."
                  valid={
                    validatePassword(passwordChangeFields.newPassword).isValid
                  }
                  invalid={
                    !validatePassword(passwordChangeFields.newPassword).isValid
                  }
                />
              </CInputGroup>
              {/* <i
                className="fa fa-eye"
                id="togglePassword"
                style={{
                  position: "absolute",
                  transform: "translate3d(467px, -30px, 10px)",
                  cursor: "pointer",
                }}
                onClick={handleTogglePassword}
              ></i> */}
            </CCol>
            <CCol xs={5}>
              <CFormLabel>Confirm Password :</CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon
                    icon={showConfirmPassword ? cilLockUnlocked : cilLockLocked}
                    onClick={handleToggleConfirmPassword}
                    style={{ cursor: "pointer" }}
                  />
                </CInputGroupText>
                <CFormInput
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  size="lg"
                  feedbackInvalid="Please Confirm Your New Password"
                  feedbackValid="Looks Good."
                  valid={
                    confirmPassword === passwordChangeFields.newPassword &&
                    confirmPassword !== ""
                  }
                  invalid={
                    confirmPassword !== passwordChangeFields.newPassword ||
                    confirmPassword === ""
                  }
                />
                {/* <i
                className="fa fa-eye"
                id="togglePassword"
                style={{
                  position: "absolute",
                  transform: "translate3d(467px, -30px, 10px)",
                  cursor: "pointer",
                }}
                onClick={handleToggleConfirmPassword}
              ></i> */}
              </CInputGroup>
            </CCol>
            <CCol xs={12}>
              <CButton
                color="primary"
                type="submit"
                disabled={
                  confirmPassword !== passwordChangeFields.newPassword ||
                  passwordChangeFields.newPassword === "" ||
                  passwordChangeFields.currentPassword === "" ||
                  !validatePassword(passwordChangeFields.newPassword).isValid
                }
                onClick={changePassword}
              >
                Change Password
              </CButton>
            </CCol>
          </CForm>
        </CTabPane>
      </CTabContent>
    </>
  );
}

export default MyProfileAgent;
