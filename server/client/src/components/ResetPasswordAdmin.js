import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { authAdmin } from "../Services/authAdminApi";

function ResetPasswordAdmin() {
  let { token } = useParams();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (event) => {
    setPass(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const sendPassword = async (event) => {
    event.preventDefault();
    const data = {
      token: token,
      password: pass,
    };
    const res = await authAdmin.reset(data);
    if (res.status === 200) navigate("/adminlogin");
  };
  return (
    <>
      <div className="container">
        <div className=" row m-4 d-flex justify-content-center">
          <div className="col-6 align-self-center">
            <div className="login-card-light p-3 shadow-lg rounded">
              <div className="pt-3">
                <h2 className="text-danger">Reset Password</h2>
              </div>

              <form className="mt-5">
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="New Password"
                    name="password"
                    value={pass}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-3 form-group">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="ConfirmPassword"
                    name="Confirmpassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
                <div className="mt-5">
                  <button
                    onClick={sendPassword}
                    className="btn btn-sm btn-danger col"
                    disabled={pass !== confirmPassword}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordAdmin;
