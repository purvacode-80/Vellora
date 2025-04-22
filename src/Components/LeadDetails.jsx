import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/lead/${id}`)
      .then(response => setLead(response.data))
      .catch(error => console.error("Error fetching lead details:", error));
  }, [id]);

  if (!lead) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{lead.companyName}</Card.Title>
          <p><strong>Contact Person:</strong> {lead.contactPerson}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone}</p>
          <p><strong>Industry:</strong> {lead.industry}</p>
          <p><strong>Lead Source:</strong> {lead.leadSource}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Priority:</strong> {lead.priority}</p>
          <p><strong>Last Contacted:</strong> {lead.lastContacted}</p>
          <p><strong>Next Action Date:</strong> {lead.nextActionDate}</p>
          <p><strong>Notes:</strong> {lead.notes}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeadDetails;