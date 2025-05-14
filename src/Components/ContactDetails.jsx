import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

const ContactDetails = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/contact/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => setContact(response.data))
    .catch(error => console.error("Error fetching contact details:", error));
  }, [id]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios.delete(`http://localhost:8000/delete-contact/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        alert("Contact deleted successfully");
        navigate("/dashboard/contacts");
      })
      .catch(error => {
        console.error("Error deleting contact:", error);
        alert("Failed to delete contact");
      });
    }
  };

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
          <Button variant="primary" onClick={() => navigate(`/dashboard/contact/update/${contact._id}`)}> Update </Button>
          <Button variant="danger" onClick={() => {handleDelete(contact._id)}}> Delete </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </Card>
    </Container>
  );
};

export default ContactDetails;
