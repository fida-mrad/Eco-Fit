import React, { useState } from "react";
import axios from 'axios';
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
import { useNavigate } from "react-router-dom";
import { useAgent } from "../AgentContext";
import { useAccordionButton } from "react-bootstrap";
import { object } from "prop-types";

function AddProduct() {
  const url = "http://localhost:8000";
  const { agent } = useAgent();
  const brandId = agent?.data.brand._id;
  const navigate = useNavigate();
  // Input values by the user
  const [nameValue, setNameValue] = useState('');

  const [categoryValue, setCategoryValue] = useState('');
  const [priceValue, setPriceValue] = useState(0);
  const [offerEndDateValue, setOfferEndDateValue] = useState('2023-01-01');
  const [sizeValue, setSizeValue] = useState('');
  const [images, setImages] = useState(false)
  const [quantityValue, setQuantityValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  


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
  const handleFileInput = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return alert("File does not exist.");
  
      if (file.size > 1024 * 1024) return alert("Size is too large!");
  
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      )
        return alert("File format is incorrect.");
  
      let formData = new FormData();
      formData.append("file", file);
  
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {}
      );
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  

    // Helper function for the POST request
    const handlePost = async () => {

      const item = {
        name: nameValue,
        price: priceValue,
        offerEnd: offerEndDateValue,
        discount: discountValue,
         category:categoryValue,
        shortDescription:shortDescriptionValue,
         size:sizeValue,
         quantity:quantityValue,
         image:images
         
        
      }

      console.log("this is the item");
      console.log(item);
      
      await axios.post(`${url}/products/addProduct`,{...item, images})
                  .then(console.log('Item was created successfully! \n You can create a new Item or you can "Go Back"'))
                  .catch(err => console.log(err));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      
      materials: selectedMaterials,
      brand : brandId
    };
    console.log("Data : ");
    const res = await productsController.addProduct(data);
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
  {isDisabled :true, label: 'Category' },
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'children', label: 'Children' },
];
  return (
    <>
      {error && <CAlert color="danger">{alertMessage}</CAlert>}
      <CForm  encType="multipart/form-data">
        <CRow className="g-3">
          <CCol xs>
            <CFormInput
              placeholder="Name"
              aria-label="name"
              label="Name :"
              onChange={(e) => setNameValue(e.target.value)} 
              
            />
          </CCol>
          <CCol xs>
            <CFormInput
              placeholder="Price"
              aria-label="price"
              type="number"
              label="Price :"
              name="price"
              onChange={(e) => setPriceValue(e.target.value)}
              
            />
          </CCol>
        </CRow>
        <CRow className="mt-1 g-3">
          <CCol xs>
            <CFormInput
              placeholder="Discount"
              aria-label="discount"
              label="Discount :"
              onChange={(e) => setDiscountValue(e.target.value)}
              
            />
          </CCol>
          <CCol xs>
            
            <CFormSelect
              aria-label="Category"
              label="Category"
              name="category"
              onChange={(e) => setCategoryValue(e.target.value)}
              
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
              placeholder="shortDesc"
              aria-label="Desc"
              label="ShortDescription :"
              name="shortDescription"
              onChange={(e) => setShortDescriptionValue(e.target.value)}
            />
          </CCol>
          <CCol xs>
            <CFormInput
              placeholder="Quantity"
              aria-label="Quantity"
              type="number"
              label="Quantity :"
              name="quantity"
              onChange={(e) => setQuantityValue(e.target.value)}
              
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
              onChange={(e) => setSizeValue(e.target.value)}
            />
          </CCol>
          <CCol xs>
          <CFormInput type="file" multiple name="images" onChange={(e)=>handleFileInput(e)} />
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
         
          </CCol>
        </CRow>
        <CButton color="success" type="submit">
          Add
        </CButton>
        <button onClick={handlePost}>Submit</button>
      </CForm>
    </>
  );
}

export default AddProduct;
