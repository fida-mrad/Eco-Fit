import React from "react";
import AddAdmin from "./components/AddAdmin";
import AddProduct from "./components/AddProduct";
import BrandsList from "./components/Brands";
import ClientsList from "./components/Clients";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const adminRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/clients", name: "Clients", element: ClientsList },
  { path: "/brands", name: "Brands", element: BrandsList },
  { path: "/add", name: "Add Admin", element: AddAdmin },
];

export default adminRoutes;
