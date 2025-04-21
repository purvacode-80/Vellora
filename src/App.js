import Navbar from "./Components/Navigation"
import Home from "../src/Home";
import Testimonials from "./Components/testimonials";
import Faqquestion from "./Components/faqquestion";
import Footer from "./Components/footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from "./Security/ProtectedRoute";
import { AuthProvider } from "./Security/AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { ThemeProvider } from "./Components/ThemeContext";
import { useEffect } from "react";
import ContactList from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import LeadList from "./Components/LeadList";
import AddLead from "./Components/AddLead";

function App() {

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      console.log("Token exists:", token);
    } else {
      console.log("No token found in localStorage.");
    }
  }, [token]);

  return (
    <>
    <BrowserRouter>
    <ThemeProvider>
      
    <AuthProvider>
     {/* <Testimonials/>
     <Faqquestion/>
     <Footer/> */}
      <Navbar />
      <Routes>
          <Route path="/" element={<> <Home /> <Testimonials /> <Faqquestion /> <Footer /> </> }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/contacts" element={<ProtectedRoutes> <ContactList /> </ProtectedRoutes> } />
          <Route path="/add-contact" element={<ProtectedRoutes> <AddContact /> </ProtectedRoutes> } />
          <Route path="/leads" element={<ProtectedRoutes> <LeadList /> </ProtectedRoutes> } />
          <Route path="/add-lead" element={<ProtectedRoutes> <AddLead /> </ProtectedRoutes> } />
      </Routes>
    </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
