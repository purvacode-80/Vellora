import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { ThemeContext } from './ThemeContext'; // Update path as needed

function CRMNavbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleLogout = () => {
    // Perform logout logic here, such as clearing tokens or redirecting
    localStorage.removeItem('token'); // Example: remove token from local storage
    window.location.href = '/login'; // Redirect to login page
  }
  
  return (
    <Navbar expand="lg" className={`shadow-sm ${isDark ? 'bg-black navbar-dark' : 'bg-white navbar-light'}`}>
      <Container className='p-0'>
        <Navbar.Brand as={Link} to="/" style={{ color: '#9c27b0' }}>
          VELLORA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="crm-navbar-nav" />
        <Navbar.Collapse id="crm-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/leads">Leads</Nav.Link>
            <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
            <Nav.Link as={Link} to="/deals">Deals</Nav.Link>
            <Nav.Link as={Link} to="/add-task">Add task</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="account-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Button
              variant={isDark ? 'outline-light' : 'outline-dark'}
              onClick={toggleTheme}
              className="ms-3"
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CRMNavbar;
