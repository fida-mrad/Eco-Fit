import React from "react";
import AdminContent from "../components/AdminContent";
import HeaderAdmin from "../components/HeaderAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import { AppFooter } from "../components/index";
import { ProvideAdmin } from "../AdminContext";

const AdminLayout = () => {
  return (
    <ProvideAdmin>
      <div>
        <SidebarAdmin />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <HeaderAdmin />
          <div className="body flex-grow-1 px-3">
            <AdminContent />
          </div>
          <AppFooter />
        </div>
      </div>
    </ProvideAdmin>
  );
};

export default AdminLayout;
