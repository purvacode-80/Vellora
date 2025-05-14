import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../css/Taskbord.css';


const statuses = ['Not Started', 'Deferred', 'In Progress', 'Completed'];

const CRMTaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:8000/task/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <Container fluid className="task-board">
      <h2 className="board-title text-center mb-4">📋TASK BOARD</h2>
      <Row className="gx-4 gy-4 d-flex flex-nowrap overflow-auto">
        {statuses.map(status => (
          <Col key={status} className="column-container" style={{ minWidth: '250px' }}>
            <div className="column-header fw-bold text mb-2">
              {status}
              <span className="count  ms-2">
                {tasks.filter(t => t.status === status).length}
              </span>
            </div>
            <div className="task-column d-flex flex-column gap-0">
              {tasks.filter(t => t.status === status).map(task => (
                <Card
                  key={task._id}
                  className="task-card shadow-sm"
                  onClick={() => navigate(`/dashboard/tasks/${task._id}`)} 
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className='task-data'>
                    <div className="task-title fw-bold">{task.taskname}</div>
                    <div><strong>Due Date:</strong> {new Date(task.duedate).toLocaleDateString()}</div>
                    <div><strong>Assigned To:</strong> {task.assignedto}</div>
                  </Card.Body>
                </Card>
              ))}
              {tasks.filter(t => t.status === status).length === 0 && (
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
