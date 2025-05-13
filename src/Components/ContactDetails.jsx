import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/contact/${id}`)
      .then(response => setContact(response.data))
      .catch(error => console.error("Error fetching contact details:", error));
  }, [id]);

  if (!contact) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow-sm">
        <Card.Body>
          <Card.Title>{contact.name}</Card.Title>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Position:</strong> {contact.position}</p>
          <p><strong>Company:</strong> {contact.company}</p>
          <p><strong>Address:</strong> {contact.address}</p>
          <p><strong>Notes:</strong> {contact.notes}</p>
          <p><strong>Status:</strong> {contact.status}</p>
          {contact.linkedin && (
            <p><strong>LinkedIn:</strong> <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>
          )}
        </Card.Body>
        <div className="text-end px-3 pb-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </Card>
    </Container>
  );
};

export default ContactDetails;
