import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ContactList.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedFields, setSelectedFields] = useState([
    "fullName", "email", "phone", "position", "company", "address", "notes", "status"
  ]);
  const [exportFileName, setExportFileName] = useState("Contacts");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    .filter((c) =>
      (c.fullName || "").toLowerCase().includes((searchTerm || "").toLowerCase())
    )
    .sort((a, b) =>
      ((b.fullName || "").toLowerCase().startsWith((searchTerm || "").toLowerCase()) ? 1 : 0) -
      ((a.fullName || "").toLowerCase().startsWith((searchTerm || "").toLowerCase()) ? 1 : 0)
    );

  const handleExportToExcel = () => {
    const hasSelected = selectedContacts.length > 0;
    const exportData = hasSelected
      ? filteredContacts.filter((contact) => selectedContacts.includes(contact._id))
      : filteredContacts;

    if (exportData.length === 0) {
      toast.warn("No contacts to export.");
      return;
    }

    if (selectedFields.length === 0) {
      toast.warn("Please select at least one field.");
      return;
    }

    const dataToExport = exportData.map((contact) => {
      const filtered = {};
      selectedFields.forEach((field) => {
        filtered[field] = contact[field] ?? "";
      });
      return filtered;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, `${exportFileName || "Contacts"}.xlsx`);
    setShowExportModal(false);
    setSelectedContacts([]);
    setSelectedFields(["fullName", "email", "phone", "position", "company", "address", "notes", "status"]);
    setExportFileName("Contacts");
    toast.success("Contacts exported successfully.");
  };

  const handleDelete = async (contactIdsToDelete) => {
    const token = localStorage.getItem('token');

    if (contactIdsToDelete.length === 0) {
      toast.warn("Please select at least one contact to delete.");
      return;
    }
    
    try {
      const deletePromises = contactIdsToDelete.map(id =>
        axios.delete(`http://localhost:8000/contact/delete-contact/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      const results = await Promise.allSettled(deletePromises);

      const success = results.filter(r => r.status === 'fulfilled');
      const failed = results.filter(r => r.status === 'rejected');

      toast.success(`${success.length} contact(s) deleted successfully.`);
      if (failed.length > 0) {
        toast.warn(`${failed.length} contact(s) failed to delete.`);
      }

      setContacts(prev => prev.filter(contact => !contactIdsToDelete.includes(contact._id)));
      setSelectedContacts([]);
    } catch (err) {
      console.error('❌ Bulk Delete error:', err);
      toast.error('Bulk delete failed.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const sendBulkMail = async (contactsIds) => {
    if (contactsIds.length === 0) {
      toast.warn("Please select at least one contact to send email.");
      return;
    }
      //Extract emails array from selected contacts
      const contacts = filteredContacts.filter((c) => contactsIds.includes(c._id));
      const contactEmails = contacts.map((c) => c.email);
      console.log("Sending bulk email to: ", contactEmails);
      navigate("/dashboard/send-email", {
        state: { recipients: contactEmails }
      });
  };

  if (!contacts.length) {
    return (
      <Container className="text-center text-dark mt-5">
        <h4>No contacts found. Please add some contacts.</h4>
      </Container>
    );
  }

  return (
    <Container className="contact-list mt-4 position-relative">
      <ToastContainer autoClose={2000} />
      <div className="title-wrapper text-center position-relative mb-4" style={{ marginTop: "-120px" }}>
        <h2 className="contact-list-title m-0">📋 Contact List</h2>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <Button variant="success" className="mt-3" onClick={() => setShowExportModal(true)}> 📤 Export to Excel </Button>
          <Button variant="warning" className="mt-3" onClick={() => sendBulkMail(selectedContacts)}> 📧 Send Bulk Email </Button>
          <Button variant="danger" className="mt-3" onClick={() => setShowDeleteModal(true)}> 🗑️ Delete Contacts </Button>
          <Button variant="dark" className="mt-3" onClick={() => navigate("/dashboard/add-contact")}> ➕ Add New Contact </Button>
        </div>

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
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedContacts(filteredContacts.map((c) => c._id));
                    } else {
                      setSelectedContacts([]);
                    }
                  }}
                  checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                />
              </th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Full Name</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Email</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Phone</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Company</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedContacts.includes(contact._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContacts([...selectedContacts, contact._id]);
                      } else {
                        setSelectedContacts(selectedContacts.filter((id) => id !== contact._id));
                      }
                    }}
                  />
                </td>
                <td>{contact.fullName}</td>
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
                <td colSpan="6" className="text-center">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showExportModal} onHide={() => setShowExportModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📤 Export Contacts to Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select fields to export:</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {["fullName", "email", "phone", "position", "company", "address", "notes", "status"].map((field) => (
                  <Form.Check
                    key={field}
                    type="checkbox"
                    id={`field-${field}`}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    checked={selectedFields.includes(field)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFields([...selectedFields, field]);
                      } else {
                        setSelectedFields(selectedFields.filter((f) => f !== field));
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>File Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. my_contacts"
                value={exportFileName}
                onChange={(e) => setExportFileName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExportModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleExportToExcel}>
            Download Excel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => handleDelete(selectedContacts)}>Yes, Delete</Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ContactList;
