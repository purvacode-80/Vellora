import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    <Container className="mt-4">
      <h2>Lead List</h2>
      <Button variant="primary" onClick={() => navigate("/add-lead")}>Add Lead</Button>
      <Table striped bordered hover responsive>
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
              <td><Button onClick={() => handleDetails(lead._id)}>Show Details</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
};

export default LeadList;