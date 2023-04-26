import React, { useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
} from "@coreui/react";
import { productsController } from "../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateProduct() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    ref: "",
    size: 0,
    images: [],
    description: "",
    quantity: 0,
    category: "",
    colors: "#000000",
  });
  useEffect(() => {
    axios
      .post(
        `http://localhost:8000/products/getById`,
        { productId: id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const product = response.data[0];
        console.log(product);
        setFormData((prevState) => ({
          ...prevState,
          name: product.name,
          price: product.price,
          description: product.description,
          ref: product.ref,
          size: product.size,
          quantity: product.quantity,
          category: product.category,
          colors: product.colors,
          images: product.images,
        }));
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }, [id]);
  const { name, price, ref, size, description, quantity, category, colors } =
    formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleMaterialsChange = (event) => {
    const options = event.target.selectedOptions;
    const values = [];
    if (options) {
      for (let i = 0; i < options.length; i++) {
        values.push(options.item(i).value);
      }
      setSelectedMaterials(values);
    }
  };
  const handleFileInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files,
    });
  };
  const handleSubmit = async (event) => {
    console.log(id);
    event.preventDefault();
    const data = {
      ...formData,
      materials: selectedMaterials,
      id: id,
    };
    console.log(data);
    const res = await productsController.updateProduct(data);
    console.log(res);
    // if (res.status === 201) navigate("/agent");
    // else {
    //   setError(true);
    //   setAlertMessage(res.data.msg);
    //   setTimeout(() => {
    //     setError((prev) => !prev);
    //   }, 2000);
    // }
  };
  const options = [
    { isDisabled: true, label: "Category" },
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "children", label: "Children" },
  ];
  return (
    <>
      {error && <CAlert color="danger">{alertMessage}</CAlert>}
      <CForm onSubmit={handleSubmit} encType="multipart/form-data">
        <CRow className="g-3">
          <CCol xs>
            <CFormInput
              placeholder="Name"
              aria-label="First name"
              label="Name :"
              onChange={handleChange("name")}
              value={formData.name || ""}
            />
          </CCol>
          <CCol xs>
            <CFormInput
              placeholder="Price"
              aria-label="Last name"
              type="number"
              label="Price :"
              name="price"
              onChange={handleChange("price")}
              value={price}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            <CFormInput
              placeholder="Ref"
              aria-label="Ref"
              label="Ref :"
              name="ref"
              onChange={handleChange("ref")}
              value={ref}
            />
          </CCol>
          <CCol xs>
            {/* <CFormInput placeholder="Category" aria-label="Category" type="text" label="Category :" name="category"/> */}
            <CFormSelect
              aria-label="Category"
              label="Category"
              name="category"
              onChange={handleChange("category")}
              value={category}
              options={options}
            >
              {/* <option disabled selected>Open this select menu</option> */}
              {/* <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="children">Children</option> */}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            <CFormInput
              placeholder="Desc"
              aria-label="Desc"
              label="Desc :"
              name="description"
              onChange={handleChange("description")}
              value={description}
            />
          </CCol>
          <CCol xs>
            <CFormInput
              placeholder="Quantity"
              aria-label="Quantity"
              type="number"
              label="Quantity :"
              name="quantity"
              onChange={handleChange("quantity")}
              value={quantity}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            <CFormInput
              placeholder="Size"
              aria-label="Size"
              label="Size :"
              name="size"
              type="number"
              onChange={handleChange("size")}
              value={size}
            />
          </CCol>
          <CCol xs>
            <CFormInput
              type="file"
              multiple
              name="images"
              onChange={handleFileInput}
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            {/* <CFormSelect aria-label="Default select example" onChange={handleChange("materials")} value={materials}> */}
            <CFormSelect
              aria-label="Default select example"
              name="materials"
              multiple
              onChange={handleMaterialsChange}
            >
              <option disabled>Materials</option>
              <option value="Cotton">Cotton</option>
              <option value="Wool">Wool</option>
              <option value="Hemp">Hemp</option>
            </CFormSelect>
          </CCol>
          <CCol xs>
            <CFormInput
              type="color"
              id="exampleColorInput"
              // defaultValue="#563d7c"
              label="Dominant Color"
              title="Choose your color"
              name="colors"
              onChange={handleChange("colors")}
              value={colors}
            />
          </CCol>
        </CRow>
        <CButton color="success" type="submit">
          Update Product
        </CButton>
      </CForm>
    </>
  );
}

export default UpdateProduct;
