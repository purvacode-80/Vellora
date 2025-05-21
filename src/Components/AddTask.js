import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import '../css/Forms.css'; // Custom styles
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [formData, setFormData] = useState({
    taskname: '',
    description: '',
    duedate: '',
    contact: '',
    assignedto: '',
    status: '',
    priority: ''
  });

  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchContacts = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:8000/contact/all", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      };
      fetchContacts();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // 🔐 Get token from local storage

    try {
      await axios.post('http://localhost:8000/task/addtask', formData, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ Send token in header
        }
      });
      // Clear form
      setFormData({
        taskname: '',
        description: '',
        duedate: '',
        contact: '',
        assignedto: '',
        status: '',
        priority: ''
      });
      toast.success('✅ Task added successfully!', {
        onClose: () => {
          navigate('/dashboard/tasks'); // Redirect to tasks page
        }
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add task.');
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">📋 Add New Task</h3>
      <Form onSubmit={handleSubmit} className="card1">
        <div className="form-container1">
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="taskname"
              placeholder="Enter task name"
              value={formData.taskname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              value={formData.duedate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Label> Contact Name </Form.Label>
          <Form.Select name="contact" value={formData.contact} onChange={handleChange}>
            <option value="">-- Select Contact --</option>
            {contacts.map(contact => (
              <option key={contact._id} value={contact.name}>{contact.name}</option>
            ))}
        </Form.Select>
        </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option>Not Started</option>
              <option>Deferred</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>

          {formData.status !== 'Not Started' && (
            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assignedto"
                placeholder="Enter assignee name"
                value={formData.assignedto}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-4">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="button-save w-100"
          >
            💾 Add Task
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddTask;
