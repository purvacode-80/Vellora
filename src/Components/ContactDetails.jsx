import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/contact/${id}`)
      .then(response => setContact(response.data))
      .catch(error => console.error("Error fetching contact details:", error));
  }, [id]);

  if (!contact) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{contact.name}</Card.Title>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Position:</strong> {contact.position}</p>
          <p><strong>Company:</strong> {contact.company}</p>
          <p><strong>Address:</strong> {contact.address}</p>
          <p><strong>Notes:</strong> {contact.notes}</p>
          <p><strong>Status:</strong> {contact.status}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactDetails;