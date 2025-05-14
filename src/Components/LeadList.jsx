import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Lead.css";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("User not authenticated");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/lead/all", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token for authentication
          },
        });

        setLeads(response.data); // ✅ Set leads returned by backend
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <Container className="lead-list">
      <h2 className="board-title text-center">📋 Lead List</h2>
      <div className="table-wrapper">
        <Table bordered hover responsive className="custom-table">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>#</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Company</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Contact Person</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Email</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Phone</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Status</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Priority</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead._id}>
                <td>{index + 1}</td>
                <td>{lead.companyName}</td>
                <td>{lead.contactPerson}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.status}</td>
                <td>{lead.priority}</td>
                <td>
                  <Button
                    className="btn-details"
                    onClick={() => navigate(`/dashboard/lead/${lead._id}`)}
                  >
                    Show
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default LeadList;
