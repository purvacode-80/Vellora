import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal } from "react-bootstrap";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [show, setShow] = useState(false);

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

  const handleShow = (lead) => {
    setSelectedLead(lead);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="mt-4">
      <h2>Lead List</h2>
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
              <td><Button onClick={() => handleShow(lead)}>Show Details</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Lead Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLead && (
            <>
              <p><strong>Company Name:</strong> {selectedLead.companyName}</p>
              <p><strong>Contact Person:</strong> {selectedLead.contactPerson}</p>
              <p><strong>Email:</strong> {selectedLead.email}</p>
              <p><strong>Phone:</strong> {selectedLead.phone}</p>
              <p><strong>Industry:</strong> {selectedLead.industry}</p>
              <p><strong>Lead Source:</strong> {selectedLead.leadSource}</p>
              <p><strong>Status:</strong> {selectedLead.status}</p>
              <p><strong>Priority:</strong> {selectedLead.priority}</p>
              <p><strong>Last Contacted:</strong> {selectedLead.lastContacted}</p>
              <p><strong>Next Action Date:</strong> {selectedLead.nextActionDate}</p>
              <p><strong>Notes:</strong> {selectedLead.notes}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LeadList;