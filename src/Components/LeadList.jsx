import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaSearch, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../css/Lead.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedFields, setSelectedFields] = useState(["companyName", "fullName", "email", "phone", "industry", "leadSource", "status", "priority", "lastContacted", "nextActionDate", "notes"]);
  const [exportFileName, setExportFileName] = useState("Leads");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("User not authenticated");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/lead/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
        toast.error("Error fetching leads. Please try again.");
      }
    };

    fetchLeads();
  }, []);

  const handleDetails = (id) => {
    navigate(`/dashboard/lead/${id}`);
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

  const filteredLeads = [...leads]
    .filter((lead) =>
      lead.fullName.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      b.fullName.toLowerCase().startsWith(searchTerm.toLowerCase()) -
      a.fullName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleExportToExcel = () => {
      const hasSelected = selectedLeads.length > 0;
      const exportData = (hasSelected ? filteredLeads.filter((lead) => 
        selectedLeads.includes(lead._id)) : filteredLeads);
  
      if (exportData.length === 0) {
        toast.warn("No Leads to export.");
        return;
      }
  
      if (selectedFields.length === 0) {
        toast.warn("Please select at least one field.");
        return;
      }
  
      const dataToExport = exportData.map((lead) => {
        const filtered = {};
        selectedFields.forEach((field) => {
          filtered[field] = lead[field] ?? "";
        });
        return filtered;
      });
  
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
  
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  
      saveAs(blob, `${exportFileName || "Leads"}.xlsx`);
      setShowExportModal(false);
      setSelectedLeads([]); // Reset selection after export
      setSelectedFields(["companyName", "fullName", "email", "phone", "industry", "leadSource", "status", "priority", "lastContacted", "nextActionDate", "notes"]); // Reset selected fields
      setExportFileName("Leads"); // Reset file name
      toast.success("Leads exported successfully.");
  };

  return (
    <Container className="lead-list position-relative">
      <ToastContainer autoClose={2000} />

      {/* Title and search bar */}
      <div className="title-wrapper text-center position-relative mb-4" style={{ marginTop: "-100px" }}>
        <h2 className="board-title m-0">📋 Lead List</h2>
        <Button variant="success" className="mt-3" onClick={() => setShowExportModal(true)}> 📤 Export to Excel </Button>
        
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
        <Table bordered hover responsive className="custom-table">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLeads(filteredLeads.map((c) => c._id));
                    } else {
                      setSelectedLeads([]);
                    }
                  }}
                  checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
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
            {filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLeads([...selectedLeads, lead._id]);
                      } else {
                        setSelectedLeads(selectedLeads.filter((id) => id !== lead._id));
                      }
                    }}
                  />
                </td>
                <td>{lead.fullName}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.companyName}</td>
                <td>
                  <Button className="btn-show-details" onClick={() => handleDetails(lead._id)}>
                    Show Details
                  </Button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

    {/* Modal for exporting leads */}
      <Modal show={showExportModal} onHide={() => setShowExportModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📤 Export Leads to Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select fields to export:</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {["companyName", "fullName", "email", "phone", "industry", "leadSource", "status", "priority", "lastContacted", "nextActionDate", "notes"].map((field) => (
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
                placeholder="e.g. my_Leads"
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
    </Container>
  );
};

export default LeadList;
