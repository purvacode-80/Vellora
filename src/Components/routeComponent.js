import { Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Testimonials from "./testimonials";
import Faqquestion from "./faqquestion";
import Footer from "./footer";
import Login from "./Login";
import Register from "./Register";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import AddContact from "./AddContact";
import LeadList from "./LeadList";
import LeadDetails from "./LeadDetails";
import AddLead from "./AddLead";
import ContactProfileEdit from "./Contactprofileedit";
import TaskBoard from "./CRMTaskBoard";
import AddTask from "./AddTask";
import TaskDetail from "./TaskDetailPage";
import TaskUpdateForm from "./TaskUpdateForm";

const routeComponent = {
    '/dashboard': () => <div>Dashboard Coming Soon</div>,
    '/clients/contacts': () => <ContactList />,
    '/clients/add-contact': () => <AddContact />,
    '/leads/leads': () => <LeadList />,
    '/leads/add-lead': () => <AddLead />,
    '/tasks/tasks': () => <TaskBoard />,
  };

export default routeComponent;