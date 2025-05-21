import React, { useEffect, useState } from 'react';
import { Offcanvas, Button, Form } from 'react-bootstrap';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../css/UserProfile.css'
import Avatar from '@mui/material/Avatar';
import { deepPurple, purple } from '@mui/material/colors';

const UserProfile = ({ show }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone_no: '',
  });
  const [view,setView] = useState(show);
  const handleClose = () => { setView(false); setEditMode(false); };
  const navigate = useNavigate();

  useEffect(() => {
    if (view) fetchProfile();
  }, [view]);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:8000/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setForm(res.data);
    } catch (err) {
      console.error('❌ Error fetching profile:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:8000/users/update', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditMode(false);
      fetchProfile();
      toast.success('Profile updated successfully..!', {
        onClose : () => {
          navigate('/profile');
        }
      });
    } catch (err) {
      console.error('❌ Error updating profile:', err);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  function getInitials() {
    const fullName = user?.fullName;
    if (!fullName) return '';
    const words = fullName.trim().split(/\s+/); // split on spaces
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase());
    return initials.join('');
  }

  const initials = getInitials();

  return (
    <>
    <ToastContainer autoClose={2000} position="top-center" />
    <Offcanvas show={view} onHide={handleClose} placement="end" className="mt-5">
      <Offcanvas.Header closeButton className='mt-2'>
        <Offcanvas.Title>Profile Info</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="text-center">
        {/* <FaUserCircle size={100} className="mb-3" /> */}
        <Avatar sx={{ bgcolor: '#ad58f3', color: '#fff', mx: 'auto', my: 2, fontSize: 25, padding: 4}}> 
          {initials} 
        </Avatar>
        {!editMode ? (
          <>
            <h4>{user?.fullName}</h4>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone_no}</p>
            <div className="d-flex justify-content-center gap-2">
              <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                <FaEdit className="me-2" /> Edit Profile
              </Button>
              <Button variant="outline-danger" className="ms-2" onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}>
                Logout
              </Button>
            </div>
          </>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone No </Form.Label>
              <Form.Control
                type="number"
                name="phone_no"
                value={form.phone_no}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-4 mx-3">
              <Button variant="success" onClick={handleSave}>Save</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
            </div>
          </Form>
        )}
      </Offcanvas.Body>
    </Offcanvas>
    </>
  );
};

export default UserProfile;