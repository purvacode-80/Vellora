import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RequiredLabel from './RequiredLabel';
import '../css/Forms.css';

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
          headers: { Authorization: `Bearer ${token}` },
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
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8000/task/addtask', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

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
        onClose: () => navigate('/dashboard/tasks')
      });
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add task.');
    }
  };

  const handleReset = () => {
    setFormData({
      taskname: '',
      description: '',
      duedate: '',
      contact: '',
      assignedto: '',
      status: '',
      priority: ''
    });
  };

  return (
    <Container className="p-4">
      <ToastContainer autoClose={2000} />
      <h3 className="board-title text-center mb-4">📋 Add New Task</h3>
      <Form onSubmit={handleSubmit} className="card1">
        <div className="form-container1">
          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Task Name" required /></Form.Label>
            <Form.Control
              type="text"
              name="taskname"
              value={formData.taskname}
              onChange={handleChange}
              placeholder="Enter task name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Description" required /></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Due Date" required /></Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              value={formData.duedate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Contact Name" required /></Form.Label>
            <Form.Select
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Contact --</option>
              {contacts.map(contact => (
                <option key={contact._id} value={contact.fullName}>
                  {contact.fullName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Status" required /></Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option>Not Started</option>
              <option>Deferred</option>
              <option>In Progress</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>

          {formData.status !== 'Not Started' && (
            <Form.Group className="mb-3">
              <Form.Label><RequiredLabel label="Assigned To" required /></Form.Label>
              <Form.Control
                type="text"
                name="assignedto"
                value={formData.assignedto}
                onChange={handleChange}
                placeholder="Enter assignee name"
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label><RequiredLabel label="Priority" required /></Form.Label>
            <Form.Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Priority --</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-4 button-group-row">
            <Button type="button" onClick={handleReset} className="button-reset">🔄 Reset</Button>
            <Button type="submit" className="button-save">💾 Add Task</Button>
            <Button type="button" onClick={() => navigate(-1)} className="button-back">🔙 Back</Button>
          </Form.Group>
        </div>
      </Form>
    </Container>
  );
};

export default AddTask;