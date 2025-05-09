// src/DashboardLayoutBasic.jsx
import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Routes, Route , useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import TaskIcon from '@mui/icons-material/Task';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EventIcon from '@mui/icons-material/Event';

import logo from '../Assets/logo-removebg-preview.png';

import ContactList from './ContactList';
import AddContact from './AddContact';
import LeadList from './LeadList';
import AddLead from './AddLead';
import Taskboard from './CRMTaskBoard'
// import other components as needed

const NAVIGATION = [
  {
    title: 'Dashboards',
    icon: <DashboardIcon />,
    segment : 'dashboard',
  },
  {
    title: 'Clients',
    icon: <PermContactCalendarIcon />,
    children: [
      { title: 'Contacts List', segment : 'dashboard/contacts', icon: <ContactsIcon /> },
      { title: 'Add Contact', segment : 'dashboard/add-contact', icon: <AddIcCallIcon /> },
    ],
  },
  {
    title: 'Leads',
    icon: <PermIdentityIcon />,
    children: [
      { title: 'Leads List', segment : 'dashboard/leads', icon: <PeopleOutlineIcon /> },
      { title: 'Add Lead', segment : 'dashboard/add-lead', icon: <PersonAddIcon /> },
    ],
  },
  {
    title: 'Tasks',
    icon: <TaskIcon />,
    children: [
      { title: 'Tasks List', segment : 'dashboard/tasks', icon: <PlaylistAddCheckIcon /> },
      { title: 'Add Task', segment : 'dashboard/add-task', icon: <AddTaskIcon /> },
    ],
  },
  {
    title: 'Calendar',
    icon: <EventIcon />,
    segment : 'dashboard/calendar',
  },
];

const demoTheme = createTheme({
  colorSchemes: { light: true, dark: true },
});

function PageContent() {
  const location = useLocation();

  return (
    <Box sx={{ py: 4 }}>
      <Routes>
        <Route path="/dashboard" element={<Typography>Welcome to the Dashboard</Typography>} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/leads" element={<LeadList />} />
        <Route path="/add-lead" element={<AddLead />} />
        <Route path="/tasks" element={<Taskboard />} />
        {/* Add more routes here */}
        <Route path="*" element={<Typography>Page not found: {location.pathname}</Typography>} />
      </Routes>
    </Box>
  );
}

function DashboardLayoutBasic(props) {
  const { window } = props;
  const demoWindow = window !== undefined ? window() : undefined;
  const navigate = useNavigate(); // ✅ get react-router's navigation function
  return (
    <AppProvider
      navigation={NAVIGATION}
      // onNavigate={(path) => navigate(path)}  // ✅ Tell Toolpad to use React Router navigation
      branding={{
        logo: <img src={logo} alt="vellora logo" style={{ height: 32 }} />,
        title: 'Vellora',
        homeUrl: '/dashboard',
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout sidebarExpandedWidth={220}>
        <PageContent />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

const App = DashboardLayoutBasic;
export default App;