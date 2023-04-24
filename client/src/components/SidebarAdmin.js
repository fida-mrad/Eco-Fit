import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "../assets/brand/logo-negative";
import { sygnet } from "../assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import adminNav from "../adminNav";

const SidebarAdmin = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
          <path d="M272 96c-78.6 0-145.1 51.5-167.7 122.5 33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16h-88c-16.6 0-32.7 1.9-48.3 5.4-25.9 5.9-49.9 16.4-71.4 30.7C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24v-16c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448h1c132.1-.7 239-130.9 239-291.4 0-42.6-7.5-83.1-21.1-119.6-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96H272z" />
        </svg>
        Eco-Fit
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={adminNav} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default SidebarAdmin;
