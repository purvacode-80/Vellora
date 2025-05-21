import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../css/Taskbord.css';

const statuses = ['Not Started', 'Deferred', 'In Progress', 'Completed'];

const CRMTaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:8000/task/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(res.data);
      } catch (err) {
        console.error('❌ Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const handleSearchToggle = () => {
    setSearchVisible((prev) => {
      if (prev) {
        setSearchTerm('');
        return false;
      }
      return true;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchVisible(false); // optional: close on Enter
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.taskname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="task-board position-relative">
      {/* Title and Search Toggle */}
      <div className="title-wrapper position-relative mb-3">
        <h2 className="board-title text-center m-0 contact-list-title" >
          📋 TASK BOARD
        </h2>

        <div 
          className="search-toggle d-flex align-items-center" 
          style={{ position: 'absolute', top: '5px', right: '0' }}
        >
          {searchVisible && (
            <div className="search-box me-2 slide-in">
              <Form.Control
                type="text"
                placeholder="Search by task name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              {searchTerm && (
                <Button
                  variant="light"
                  onClick={() => setSearchTerm('')}
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
            // You can remove inline styles here because your CSS already handles it
            // style={{ border: 'none', boxShadow: 'none' }}
          >
            <FaSearch />
          </Button>
        </div>
      </div>

      {/* Task Columns */}
      <Row className="gx-4 gy-4 d-flex flex-nowrap overflow-auto">
        {statuses.map(status => (
          <Col key={status} className="column-container" style={{ minWidth: '250px' }}>
            <div className="column-header fw-bold text mb-2">
              {status}
              <span className="count ms-2">
                {filteredTasks.filter(t => t.status === status).length}
              </span>
            </div>
            <div className="task-column d-flex flex-column gap-0">
              {filteredTasks.filter(t => t.status === status).map(task => (
                <Card
                  key={task._id}
                  className="task-card shadow-sm"
                  onClick={() => navigate(`/dashboard/tasks/${task._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="task-data">
                    <div className="task-title fw-bold">{task.taskname}</div>
                    <div><strong>Due Date:</strong> {new Date(task.duedate).toLocaleDateString()}</div>
                    <div><strong>Assigned To:</strong> {task.assignedto}</div>
                  </Card.Body>
                </Card>
              ))}
              {filteredTasks.filter(t => t.status === status).length === 0 && (
                <div className="no-task">No tasks</div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CRMTaskBoard;
