import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Button,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ContactList.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/contact/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  const handleSearchToggle = () => {
    setSearchVisible((prev) => {
      if (prev) {
        setSearchTerm("");
        return false;
      } else {
        return true;
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchVisible(false);
    }
  };

  const filteredContacts = [...contacts]
    .filter((c) => c.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .sort((a, b) =>
      b.name.toLowerCase().startsWith(searchTerm.toLowerCase()) -
      a.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

  return (
    <Container className="contact-list mt-4 position-relative">
      <div className="title-wrapper text-center position-relative mb-4" style={{ marginTop: "-120px" }}>
        <h2 className="contact-list-title m-0">📋 Contact List</h2>

        {/* Search Toggle Section */}
        <div className="search-toggle d-flex align-items-center position-absolute top-0 end-0">
          {searchVisible && (
            <div className="search-box me-2 slide-in">
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchTerm && (
                <Button
                  variant="light"
                  onClick={() => setSearchTerm("")}
                  className="clear-btn"
                  tabIndex={-1}
                >
                  <FaTimes />
                </Button>
              )}
            </div>
          )}
          <Button
            variant="outline-secondary"
            onClick={handleSearchToggle}
            style={{ border: "none", boxShadow: "none" }}
          >
            <FaSearch />
          </Button>
        </div>
      </div>

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
            {filteredContacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.company}</td>
                <td>
                  <Button className="btn-show-details" onClick={() => handleDetails(contact._id)}>
                    Show Details
                  </Button>
                </td>
              </tr>
            ))}
            {filteredContacts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default ContactList;
