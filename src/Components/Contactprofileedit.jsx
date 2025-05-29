import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Forms.css"; // Make sure this file contains your custom styles

const ContactProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
        const response = await axios.get(`http://localhost:8000/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setContact(response.data);
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
      await axios.put(`http://localhost:8000/contact/editcontact/${id}`, contact, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Profile updated successfully!");
      navigate("/dashboard/contacts");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Container className="p-4">
      <h3 className="board-title text-center mb-4">✏️ Edit Contact Profile</h3>
      <Form className="card1" onSubmit={handleSubmit}>
        <div className="form-container1">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={contact.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={contact.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={contact.company}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={contact.position}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={contact.address}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="notes"
              value={contact.notes}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={contact.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Prospect">Prospect</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>

          <Button className="update" type="submit">
            💾 Update Contact
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ContactProfileEdit;
