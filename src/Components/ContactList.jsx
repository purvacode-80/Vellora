import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../css/ContactList.css"; // This imports the shared CSS

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/contact/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts: ", error.response?.data || error.message);
        toast.error("Failed to fetch contacts.");
      }
    };

    fetchContacts();
  }, []);

  const handleDetails = (id) => {
    navigate(`/dashboard/contact/${id}`);
  };

  return (
    <Container className="contact-list mt-4">
      <h2 className="contact-list-title text-center">📋 Contact List</h2>
      <div className="table-wrapper">
        <Table striped bordered hover responsive className="custom-table">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Name</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Email</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Phone</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Company</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.company}</td>
                <td>
                  <Button
                    className="btn-show-details"
                    onClick={() => handleDetails(contact._id)}
                  >
                    Show Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default ContactList;
