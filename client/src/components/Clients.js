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
import { clientController } from "../Services/Api";

function ClientsList() {
  const [clients, setClients] = useState([]);
  const [alert, setAlert] = useState(false);

  const getClients = async () => {
    const res = await clientController.getClients();
    if (res.status === 200) setClients(res.data);
  };
  useEffect(() => {
    getClients();
  }, []);
  const banClient = async (clientId) => {
    const result = await clientController.banClient({ clientId: clientId });
    if (result.status === 200){ 
      setAlert(true);
      setTimeout(() => {
        setAlert((prev) => !prev);
      }, 2000);
      const updatedClientList = clients.map(client =>
        client._id === clientId ? { ...client, banned: true } : client
      );
      setClients(updatedClientList);
    }
  };

  return (
    <>
      {alert && <CAlert color="success">Client Banned</CAlert>}
      <CTable color="primary" striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Firstname</CTableHeaderCell>
            <CTableHeaderCell scope="col">Lastname</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
            <CTableHeaderCell scope="col">BirthDate</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ban</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {clients.map((client) => {
            const date = new Date(client.birthdate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0"); // add leading zero
            const day = String(date.getDate()).padStart(2, "0"); // add leading zero
            const formattedDate = `${year}/${month}/${day}`;
            return (
              <CTableRow key={client._id}>
                <CTableDataCell>{client.firstname}</CTableDataCell>
                <CTableDataCell>{client.lastname}</CTableDataCell>
                <CTableDataCell>{client.email}</CTableDataCell>
                <CTableDataCell>{client.phone}</CTableDataCell>
                <CTableDataCell>{formattedDate}</CTableDataCell>
                <CTableDataCell>
                  {client.banned ? (
                    <CBadge color="danger">banned</CBadge>
                  ) : (
                    <CBadge color="success">active</CBadge>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => banClient(client._id)}
                    disabled={client.banned===true}
                  >
                    Ban Client
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            );
          })}
        </CTableBody>
      </CTable>
    </>
  );
}

export default ClientsList;
