import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal } from "react-bootstrap";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const fetchContacts = async () => {
        const response = await axios.get("http://localhost:8000/contact/all");
        setContacts(response.data);
      };
      fetchContacts();
    }
    catch (error) {
      console.error("Error fetching contacts : ", error);
    }
  }, []);

  const handleShow = (contact) => {
    setSelectedContact(contact);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="mt-4">
      <h2>Contact List</h2>
      <Table striped bordered hover responsive>
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
              <td><Button onClick={() => handleShow(contact)}>Show Details</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} centered>
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
              <p><strong>Status:</strong> {selectedContact.status}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ContactList;