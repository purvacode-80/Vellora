import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaSearch, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../css/Lead.css";


const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
      lead.companyName.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      b.companyName.toLowerCase().startsWith(searchTerm.toLowerCase()) -
      a.companyName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

  return (
    <Container className="lead-list position-relative">
      <ToastContainer autoClose={2000} />

      {/* Title and search bar */}
      <div className="title-wrapper text-center position-relative mb-4" style={{ marginTop: "-100px" }}>
        <h2 className="board-title m-0">📋 Lead List</h2>

        <div className="search-toggle d-flex align-items-center position-absolute top-0 end-0">
          {searchVisible && (
            <div className="search-box me-2 slide-in">
              <Form.Control
                type="text"
                placeholder="Search by company..."
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
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>#</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Company</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Contact Person</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Email</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Phone</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Status</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Priority</th>
              <th style={{ backgroundColor: "#9b6ada", color: "white" }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => (
              <tr key={lead._id}>
                <td>{index + 1}</td>
                <td>{lead.companyName}</td>
                <td>{lead.contactPerson}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.status}</td>
                <td>{lead.priority}</td>
                <td>
                  <Button
                    className="btn-details"
                    onClick={() => navigate(`/dashboard/lead/${lead._id}`)}
                  >
                    Show
                  </Button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default LeadList;
