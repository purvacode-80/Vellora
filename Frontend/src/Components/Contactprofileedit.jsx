import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import RequiredLabel from "./RequiredLabel";
import "../css/Forms.css";

const ContactProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    address: "",
    notes: "",
    linkedin: "",
    status: "Active",
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
        toast.error("Failed to load contact.");
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
      toast.success("Contact updated successfully!", {
        onClose: () => navigate("/dashboard/contacts"),
      });
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update contact.");
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">✏️ Edit Contact Profile</h3>

      <Form className="card1" onSubmit={handleSubmit}>
        <div className="form-container1">

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Full Name" required /></Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={contact.fullName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Email" required /></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={contact.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Phone" required /></Form.Label>
            <Form.Control
              type="tel"
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
              as="textarea"
              rows={2}
              name="address"
              value={contact.address}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              type="url"
              name="linkedin"
              value={contact.linkedin}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
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
              <option>Active</option>
              <option>Inactive</option>
              <option>Prospect</option>
              <option>Closed</option>
            </Form.Select>
          </Form.Group>

          <div className="button-group-row mt-4">
            <Button className="button-save" type="submit">
              💾 Update Contact
            </Button>
            <Button
              className="button-back ms-3"
              variant="secondary"
              type="button"
              onClick={() => navigate(-1)}
            >
              🔙 Cancel
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default ContactProfileEdit;