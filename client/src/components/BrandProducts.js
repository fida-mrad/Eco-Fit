import React, { useEffect, useState } from "react";
import {
  CAlert,
  CBadge,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { productsController } from "../services/Api";
import { useAgent } from "../AgentContext";
import { useNavigate } from "react-router-dom";

function BrandProducts({ agent }) {
  const navigate = useNavigate();
  // const { agent } = useAgent();
  // console.log("agent.data : ");
  // console.log(agent?.data);
  useEffect(() => {
    console.log("Agent : ");
    console.log(agent);
    // if (agent!=null && agent.status>400) {
    //   console.log("not logged in");
    // }
    getProducts();
  }, [agent]);

  const [products, setProducts] = useState([]);
  //   const [alert, setAlert] = useState(false);

  const getProducts = async () => {
      const res = await productsController.getProductsByBrand(
        {brandId : agent?.data.brand._id}
      );
      if (res.status === 200) setProducts(res.data);
  };
  const goToUpdateForm = (id)=>{
    navigate(`/agent/updateProduct/${id}`)
  }
  return (
    <>
      <h1>Agent : {agent?.data.email}</h1>
      {/* {alert && <CAlert color="success">Brand Banned</CAlert>} */}
      <CTable color="primary" striped hover className="align-items-center" >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Ref</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
            <CTableHeaderCell scope="col">Size</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Update</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products.map((product) => {
            return (
              <CTableRow key={product._id}>
                <CTableDataCell>{product.ref}</CTableDataCell>
                <CTableDataCell>{product.name}</CTableDataCell>
                <CTableDataCell>{product.price}</CTableDataCell>
                <CTableDataCell>{product.size}</CTableDataCell>
                <CTableDataCell>{product.description}</CTableDataCell>
                <CTableDataCell>
                  {product.quantity === 0 ? (
                    <CBadge color="danger">Out Of Stock</CBadge>
                  ) : (
                    product.quantity
                  )}
                </CTableDataCell>
                <CTableDataCell>{product.category}</CTableDataCell>
                <CTableDataCell><CButton color="warning" onClick={()=>goToUpdateForm(product._id)}>Update</CButton></CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>
    </>
  );
}

export default BrandProducts;
