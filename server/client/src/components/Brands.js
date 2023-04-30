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
import { agentController } from "../Services/Api";

function BrandsList() {
  const [agents, setAgents] = useState([]);
  const [alert, setAlert] = useState(false);

  const getAgents = async () => {
    const res = await agentController.getAgents();
    if (res.status === 200) setAgents(res.data);
  };
  useEffect(() => {
    getAgents();
  }, []);
  const banAgent = async (agentId) => {
    const result = await agentController.banAgent({ agentId: agentId });
    if (result.status === 200) {
      setAlert(true);
      setTimeout(() => {
        setAlert((prev) => !prev);
      }, 2000);
      const updatedAgentList = agents.map((agent) =>
        agent._id === agentId ? { ...agent, banned: true } : agent
      );
      setAgents(updatedAgentList);
    }
  };
  const approveAgent = async (agentId) => {
    const result = await agentController.approveAgent({ agentId: agentId });
    if (result.status === 200) {
      // setAlert(true);
      // setTimeout(() => {
      //   setAlert((prev) => !prev);
      // }, 2000);
      const updatedAgentList = agents.map((agent) =>
        agent._id === agentId ? { ...agent, approved: true } : agent
      );
      setAgents(updatedAgentList);
    }
  };
  return (
    <>
      {alert && <CAlert color="success">Brand Banned</CAlert>}
      <CTable color="primary" striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
            <CTableHeaderCell scope="col">Agent : Firstname</CTableHeaderCell>
            <CTableHeaderCell scope="col">Agent : Lastname</CTableHeaderCell>
            <CTableHeaderCell scope="col">Agent : Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ban</CTableHeaderCell>
            <CTableHeaderCell scope="col">Approval</CTableHeaderCell>
            <CTableHeaderCell scope="col">Approve</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {agents.map((agent) => {
            return (
              <CTableRow key={agent._id}>
                <CTableDataCell>{agent.brand.brandname}</CTableDataCell>
                <CTableDataCell>{agent.firstname}</CTableDataCell>
                <CTableDataCell>{agent.lastname}</CTableDataCell>
                <CTableDataCell>{agent.email}</CTableDataCell>
                <CTableDataCell>
                  {agent.banned ? (
                    <CBadge color="danger">banned</CBadge>
                  ) : (
                    <CBadge color="success">active</CBadge>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => banAgent(agent._id)}
                    disabled={agent.banned === true}
                  >
                    Ban Brand
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  {agent.approved ? (
                    <CBadge color="success">Approved</CBadge>
                  ) : (
                    <CBadge color="warning">Pending</CBadge>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="success"
                    variant="outline"
                    onClick={() => approveAgent(agent._id)}
                    disabled={agent.approved === true}
                  >
                    Approve Brand
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

export default BrandsList;
