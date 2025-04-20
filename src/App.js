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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
