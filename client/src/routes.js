import React from "react";
import AddProduct from "./components/AddProduct";
import BrandProducts from "./components/BrandProducts";
import UpdateProduct from "./components/UpdateProduct";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  // { path: "/details", element: ClientDetails, name: "ClientDetails" },
  { path: '/products', name: 'Products', element: BrandProducts },
  { path: "/addProduct", name: "Add Products", element: AddProduct },
  { path: "/updateProduct/:id", name: "Update Product", element: UpdateProduct },
];

export default routes;
