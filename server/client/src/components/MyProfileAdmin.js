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
import { useAdmin } from "../AdminContext";
import { useNavigate } from "react-router-dom";
import { adminController } from "../Services/adminApi";
import { authAdmin } from "../Services/authAdminApi";
// import avatar from "../assets/images/avatars/2.jpg";
import {
  cilCheckCircle,
  cilWarning,
  cilLockLocked,
  cilLockUnlocked,
} from "@coreui/icons";
function MyProfileAdmin() {
  const { admin } = useAdmin();
  const navigate = useNavigate();
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
  const [updateAdminAlert, setUpdateAdminAlert] = useState({
    show: false,
    color: "",
    msg: "",
    icon: null,
  });
  useEffect(() => {
    console.log(admin);
    if (admin != null && admin.status >= 400) {
      navigate("/adminlogin");
    } else {
      //   const fetchImage = async () => {
      //     const response = await fetch(
      //       `http://localhost:8000/images/${admin?.data?.profileimg}`
      //     );
      //     const blob = await response.blob();
      //     const url = URL.createObjectURL(blob);
      //     setprofileImage((prevState) => ({
      //       new: url,
      //       old: url,
      //     }));
      //   };
      //   fetchImage();
      setformFields((prevState) => ({
        ...prevState,
        email: admin?.data.email,
      }));
    }
  }, [admin]);
  const [formFields, setformFields] = useState({
    email: "",
    newPassword: "",
    currentPassword: "",
    // profileimg: null,
  });
  const handleChange = (text) => (e) => {
    setformFields({ ...formFields, [text]: e.target.value });
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
  const updateAdmin = async (event) => {
    event.preventDefault();
    // const result = formIsValid();
    // if (result) {
    let data = {
      currentPassword: formFields.currentPassword,
      newPassword: formFields.newPassword,
      email: formFields.email,
    };
    // if (profileImage.file) {
    //   data = { ...data, profileimg: profileImage.file };
    // }
    console.log(data);
    const res = await adminController.updateAdmin(data);
    console.log(res);
    if (res.status === 201) {
      // navigate("/admin");
      setUpdateAdminAlert({
        show: true,
        msg: "Profile Details Updated Successfully",
        color: "success",
        icon: cilCheckCircle,
      });
      setTimeout(() => {
        navigate("/admin");
      }, 3000);
    } else {
      setUpdateAdminAlert({
        show: true,
        msg: res.data.msg,
        color: "danger",
        icon: cilWarning,
      });
      setTimeout(() => {
        setUpdateAdminAlert({
          show: false,
          msg: "",
          color: "danger",
          icon: cilWarning,
        });
      }, 3000);
    }
  };
  //   };
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
    const res = await authAdmin.changePassword(passwordChangeFields);
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
        navigate("/admin");
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
    <>
      {updateAdminAlert.show && (
        <CAlert
          color={updateAdminAlert.color}
          className="d-flex align-items-center"
        >
          <CIcon
            icon={updateAdminAlert.icon}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          <div>{updateAdminAlert.msg}</div>
        </CAlert>
      )}
      {/* <img
        // src={agentAvatar}
        src={profileImage.new}
        alt="Agent Profile"
        style={{
          width: "120px",
          height: "120px",
          marginRight: " 1.5625rem",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      />
      <CButton onClick={handleClick}>Upload New Image</CButton>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <CButton
        onClick={resetProfileImage}
        className="btn-danger"
        style={{ marginLeft: "5px" }}
      >
        Reset
      </CButton> */}
      <CForm className="row g-3" noValidate>
        <CCol md={10}>
          <CFormLabel>Current Password :</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon
                onClick={handleToggleCurrentPassword}
                icon={showCurrentPassword ? cilLockUnlocked : cilLockLocked}
                style={{ cursor: "pointer" }}
              />
            </CInputGroupText>
            <CFormInput
              type={showCurrentPassword ? "text" : "password"}
              onChange={handleChange("currentPassword")}
              value={formFields.currentPassword || ""}
              id="crrentPassword"
              placeholder="Current Password"
              size="lg"
              feedbackInvalid="Please Enter Your Current Password !"
              feedbackValid="Looks Good."
              valid={
                formFields.currentPassword !== "" &&
                formFields.currentPassword.length >= 5
              }
              invalid={
                formFields.currentPassword === "" ||
                formFields.currentPassword.length < 5
              }
            />
          </CInputGroup>
        </CCol>
        <CCol md={10}>
          <CFormLabel>New Email :</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText>@</CInputGroupText>
            <CFormInput
              type="email"
              onChange={handleChange("email")}
              value={formFields.email || ""}
              id="email"
              placeholder="New Email Address"
              size="lg"
              feedbackInvalid="Please Enter a New Email Address If Yu wish To Update it !"
              feedbackValid="Looks Good."
              valid={isValidEmail(formFields.email)}
              invalid={!isValidEmail(formFields.email)}
            />
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
              onChange={handleChange("newPassword")}
              value={formFields.newPassword || ""}
              id="newPassword"
              placeholder="New Password"
              size="lg"
              feedbackInvalid={
                validatePassword(formFields.newPassword).validationMesssage
              }
              feedbackValid="Looks Good."
              valid={validatePassword(formFields.newPassword).isValid}
              invalid={!validatePassword(formFields.newPassword).isValid}
            />
          </CInputGroup>
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
                confirmPassword === formFields.newPassword &&
                confirmPassword !== ""
              }
              invalid={
                confirmPassword !== formFields.newPassword ||
                confirmPassword === ""
              }
            />
          </CInputGroup>
        </CCol>
        <CCol xs={12}>
          <CButton
            color="primary"
            type="submit"
            disabled={
              confirmPassword !== formFields.newPassword ||
              formFields.newPassword === "" ||
              formFields.currentPassword === "" ||
              !validatePassword(formFields.newPassword).isValid
            }
            onClick={updateAdmin}
          >
            Save Changes
          </CButton>
        </CCol>
      </CForm>
    </>
  );
}

export default MyProfileAdmin;
