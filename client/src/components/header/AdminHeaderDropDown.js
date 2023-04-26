import React, { useEffect, useState } from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import avatar from "./../../assets/images/avatars/user.jpg";
import { authAdmin } from "../../Services/authAdminApi";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../AdminContext";

const AdminHeaderDropDown = () => {
  const [adminAvatar, setAdminAvatar] = useState(avatar);
  const { admin } = useAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (admin != null && admin.status >= 400) {
      navigate("/adminlogin");
    } else {
      const fetchImage = async () => {
        // const response = await fetch(
        //   `http://localhost:8000/images/${admin.data?.profileimg}`
        // );
        // const blob = await response.blob();
        // const url = URL.createObjectURL(blob);
        // setAdminAvatar(url);

        fetch(`http://localhost:8000/images/${admin.data?.profileimg}`).then(
          (response) => {
            if (response.ok) {
              const blob = response.blob();
              const url = URL.createObjectURL(blob);
              setAdminAvatar(url);
            } else {
              setAdminAvatar(avatar);
            }
          }
        );
      };
      fetchImage();
    }
  }, [admin]);

  let logoutAdmin = async () => {
    await authAdmin.logout();
    navigate("/adminlogin");
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={adminAvatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account : {admin?.data.email}
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="/admin/myprofile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={logoutAdmin}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AdminHeaderDropDown;
