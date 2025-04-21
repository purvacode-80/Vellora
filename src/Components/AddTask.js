import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/Task', formData);
      alert('✅ Task added successfully!');
      setFormData({
        taskname: '',
        description: '',
        duedate: '',
        contact: '',
        assignedto: '',
        status: '',
        priority: ''
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add task.');
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow-lg border-0 rounded-4 bg-white dark:bg-dark text-dark dark:text-white">
        <h2 className="text-center mb-4 text-purple-600 dark:text-purple-400">Add New Task</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskname">
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

          <Form.Group className="mb-3" controlId="description">
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

          <Form.Group className="mb-3" controlId="duedate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="duedate"
              value={formData.duedate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contact">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option>Not Started</option>
              <option>Started</option>
              <option>In Progress</option>
              <option>Pending</option>
              <option>Completed</option>
            </Form.Select>
          </Form.Group>

          {formData.status !== "Not Started" && (
            <Form.Group className="mb-3" controlId="assignedto">
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

          <Form.Group className="mb-4" controlId="priority">
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
            className="w-100 bg-purple-600 border-0 hover:bg-purple-700"
          >
            Add Task
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddTask;
