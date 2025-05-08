import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./ContactList.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [show, setShow] = useState(false);
  const [editStatusMode, setEditStatusMode] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const navigate = useNavigate(); // ✅ initialize useNavigate

  useEffect(() => {
    try {
      const fetchContacts = async () => {
        const response = await axios.get("http://localhost:8000/contact/all");
        setContacts(response.data);
      };
      fetchContacts();
    } catch (error) {
      console.error("Error fetching contacts: ", error);
    }
  }, []);

  const handleShow = (contact) => {
    setSelectedContact(contact);
    setNewStatus(contact.status);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEditStatusMode(false);
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/contact/editcontact/${selectedContact._id}`, {
        status: newStatus,
      });

      const updatedContacts = contacts.map((contact) =>
        contact._id === selectedContact._id ? { ...contact, status: newStatus } : contact
      );
      setContacts(updatedContacts);
      setSelectedContact((prev) => ({ ...prev, status: newStatus }));
      setEditStatusMode(false);
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status: ", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleUpdateNavigate = () => {
    navigate(`/contactprofileedit/${selectedContact._id}`); // ✅ navigate to update page
  };

  return (
    <Container className="contact-list mt-4">
      <h2 className="contact-list-title">Contact List</h2>
      <Table striped bordered hover responsive className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.company}</td>
              <td>
                <Button className="btn-show-details" onClick={() => handleShow(contact)}>
                  Show Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered className="contact-modal">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <>
              <p><strong>Name:</strong> {selectedContact.name}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Phone:</strong> {selectedContact.phone}</p>
              <p><strong>Position:</strong> {selectedContact.position}</p>
              <p><strong>Company:</strong> {selectedContact.company}</p>
              <p><strong>Address:</strong> {selectedContact.address}</p>
              <p><strong>Notes:</strong> {selectedContact.notes}</p>
              <p><strong>LinkedIn:</strong> <a href={selectedContact.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></p>

              <p>
                <strong>Status:</strong>{" "}
                {editStatusMode ? (
                  <>
                    <Form.Control
                      as="select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      size="sm"
                      className="status-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Prospect">Prospect</option>
                      <option value="Closed">Closed</option>
                    </Form.Control>
                    <Button size="sm" variant="success" onClick={handleStatusUpdate} className="btn-save-status">
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    {selectedContact.status}{" "}
                    <FaEdit className="edit-status-icon" onClick={() => setEditStatusMode(true)} />
                  </>
                )}
              </p>

              <div className="text-end">
                <Button className="update-contact-btn" onClick={handleUpdateNavigate}>
                  Update Contact Details
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </Container>
  );
};

export default ContactList;
