import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../css/Lead.css'

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchLeads = async () => {
        const response = await axios.get("http://localhost:8000/lead/all");
        setLeads(response.data);
      };
      fetchLeads();
    }
    catch (error) {
      console.error("Error fetching leads : ", error);
    }
  }, []);

  const handleDetails = (id) => navigate(`/lead/${id}`);

  return (
    <Container className="mt-4 lead-list">
      <Container className="lead-list-container d-flex justify-content-between mb-4 pt-0">
      <h2>Lead List</h2>
      <Button variant="primary" onClick={() => navigate("/add-lead")} className="btn-show-details">Add Lead</Button>
      </Container>
      <Table striped bordered hover responsive className="lead-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Contact Person</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td>{lead.companyName}</td>
              <td>{lead.contactPerson}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.status}</td>
              <td>{lead.priority}</td>
              <td><Button className="btn-show-details" onClick={() => handleDetails(lead._id)}>Show Details</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
};

export default LeadList;