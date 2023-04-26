import React from "react";
import AddProduct from "./components/AddProduct";
import BrandProducts from "./components/BrandProducts";
import UpdateProduct from "./components/UpdateProduct";
import Claim from "./pages/other/Claim";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const MyProfileAgent = React.lazy(() => import("./components/MyProfileAgent"));


const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/myprofile", name: "Profile", element: MyProfileAgent },
  // { path: "/details", element: ClientDetails, name: "ClientDetails" },
  { path: '/products', name: 'Products', element: BrandProducts },
  { path: "/addProduct", name: "Add Products", element: AddProduct },
  { path: "/updateProduct/:id", name: "Update Product", element: UpdateProduct },

];

export default routes;
