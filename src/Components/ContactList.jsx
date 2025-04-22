import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

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

  const handleDetails = (id) => navigate(`/contact/${id}`);

  return (
    <Container className="mt-4">
      <h2>Contact List</h2>
      <Button variant="primary" onClick={() => navigate("/add-contact")}>Add Contact</Button>
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
              <td><Button onClick={() => handleDetails(contact._id)}>Show Details</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
};

export default ContactList;