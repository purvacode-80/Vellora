import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./Components/Navigation";
import Home from "./Components/Home";
import Testimonials from "./Components/testimonials";
import Faqquestion from "./Components/faqquestion";
import Footer from "./Components/footer";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ContactList from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import LeadList from "./Components/LeadList";
import AddLead from "./Components/AddLead";

import ProtectedRoutes from "./Security/ProtectedRoute";
import { AuthProvider } from "./Security/AuthContext";
import { ThemeProvider } from "./Components/ThemeContext";
import { useEffect } from "react";

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
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route 
              path="/home" 
              element={
                <ProtectedRoutes>
                  <>
                    <Home />
                    <Testimonials />
                    <Faqquestion />
                    <Footer />
                  </>
                </ProtectedRoutes>
              } 
            />
            <Route path="/" element={<> <Home /> <Testimonials /> <Faqquestion /> <Footer /> </>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<ProtectedRoutes> <ContactList /> </ProtectedRoutes>} />
            <Route path="/add-contact" element={<ProtectedRoutes> <AddContact /> </ProtectedRoutes>} />
            <Route path="/leads" element={<ProtectedRoutes> <LeadList /> </ProtectedRoutes>} />
            <Route path="/add-lead" element={<ProtectedRoutes> <AddLead /> </ProtectedRoutes>} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
