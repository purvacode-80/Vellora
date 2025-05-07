import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "./Contactprofileedit.css";

const ContactProfileEdit = () => {
  const { id } = useParams();  // Get contact id from the URL
  const navigate = useNavigate();  // To navigate after updating the contact

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    address: "",
    notes: "",
    linkedin: "",
    status: "",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/contact/${id}`);
        setContact(response.data);  // Set the fetched contact data to the state
      } catch (error) {
        console.error("Error fetching contact: ", error);
      }
    };
    fetchContact();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the contact using PUT request
      await axios.put(`http://localhost:8000/contact/editcontact/${id}`, contact);
      alert("Profile updated successfully!");
      navigate("/contacts");  // Redirect back to the contact list after updating
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Contact Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCompany" className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={contact.company}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPosition" className="mb-3">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            name="position"
            value={contact.position}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formAddress" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={contact.address}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formNotes" className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            value={contact.notes}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLinkedIn" className="mb-3">
          <Form.Label>LinkedIn</Form.Label>
          <Form.Control
            type="url"
            name="linkedin"
            value={contact.linkedin}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formStatus" className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={contact.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Prospect">Prospect</option>
            <option value="Closed">Closed</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default ContactProfileEdit;
