import React, { useState } from "react";
import { CButton, CCol, CForm, CFormInput, CRow } from "@coreui/react";
import { adminController } from "../services/Api";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
    const navigate = useNavigate();
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
    const handleSubmit = async () => {
      const res = await adminController.addAdmin(formData);
      if (res.status === 201) navigate("/admin");
    //   else {
    //     setError(true);
    //     setAlertMessage(res.data.msg);
    //     setTimeout(() => {
    //       setError((prev) => !prev);
    //     }, 2000);
    //   }
    };
  return (
    <CForm>
      <CRow>
        <CCol xs>
          <CFormInput
            type="email"
            id="email"
            label="Email address"
            placeholder="name@example.com"
            text="Must be valid Email."
            size="lg"
            onChange={handleChange("email")}
            value={email}
          />
        </CCol>
        <CCol xs>
          <CFormInput
            type="password"
            id="password"
            label="Password"
            placeholder="Password Here"
            text="Must be longer than 6 characters"
            size="lg"
            onChange={handleChange("password")}
            value={password}
          />
        </CCol>
      </CRow>
      <CRow>
        <div className="row justify-content-md-center">
          <CButton color="info"  style={{width:"10em",margin:"auto", marginTop:"10px"}} shape="rounded-pill" size="lg" onClick={handleSubmit}>
            Add Admin
          </CButton>
        </div>
      </CRow>
    </CForm>
  );
}

export default AddAdmin;
